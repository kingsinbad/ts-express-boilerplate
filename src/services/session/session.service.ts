import { Service, Inject, Container } from 'typedi';
import * as jwt from 'jsonwebtoken';
import SessionModel from '../../models/sessions/sessions.model';

@Service('session.service')
export default class SessionService {

    @Inject()
    private sessionModel: SessionModel;

    private config: ;

    constructor() {
        this.config = Container.get<any>('config').session;
    }
    


    async create(params) {


    }

    private generateToken(): string {
        const { 
            secretKey, 
            algorithm, 
            expiration 
        } = this.config.token;
        return jwt.sign({ sub: user.id, data: user }, secretKey, { algorithm, expiresIn: expiration });
    }



}