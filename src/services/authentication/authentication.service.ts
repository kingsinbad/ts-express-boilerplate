import { Service, Inject, Container } from 'typedi';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import Logger from '../../utils/logger/logger.util';
import UserModel from '../../models/users/users.model';
import { 
    LoginInputInterface, 
    LoginOutputInterface, 
    ValidateTokenOutputInterface,
    UserInterface, 
    ConfigInterface 
} from './authentication.interface';


@Service('auth.service')
class AuthenticationService {

    @Inject()
    private userModel: UserModel;

    @Inject()
    logger: Logger;
    
    private config: ConfigInterface;

    constructor() {
        this.config = Container.get<any>('config').authentication;
    }

    private generateToken(user: UserInterface): string {
        const { 
            secretKey, 
            algorithm, 
            expiration 
        } = this.config.token;
        return jwt.sign({ sub: user.id, data: user }, secretKey, { algorithm, expiresIn: expiration });
    }

    async login(params: LoginInputInterface): Promise<LoginOutputInterface> {
        try {
            params.email = String(params.email)
                            .replace(/ /g, '')
                            .trim()
                            .toLowerCase();
            const user = await this.userModel.findOne({ email: params.email });
            if (user) {
                const passwordMatched = bcrypt.compareSync(params.password, user.password);
                if (passwordMatched) {
                    const userInfo = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        id: user._id
                    }
                    
                    return {
                        jwt: this.generateToken(userInfo),
                        user: userInfo
                    };
                } else {
                    const error = new Error('Incorrect password');
                    throw error;
                }
            } else {
                const error = new Error('Email not found');
                throw error;
            }
        } catch (error) {
            throw error;            
        }
    }

    validateToken(token: string): Promise<ValidateTokenOutputInterface> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.config.token.secretKey, (error: Error, decoded: any) => {
                if (error) {
                    this.logger.log('warn', 'Authorization Attempt', error.message, decoded);
                    reject(error);
                }
                resolve(decoded);
            });
        });
    }

}

export default AuthenticationService;