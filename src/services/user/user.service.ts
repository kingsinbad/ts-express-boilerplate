import { Service, Inject } from 'typedi';
import * as bcrypt from 'bcrypt';
import { UserInterface, UserRegistrationInput } from './user.interface';
import UserModel from '../../models/users/users.model';


@Service('user.service')
class UserService {

    @Inject()
    private userModel: UserModel;

    constructor() {}

    /**
     * Get All Users
     * @returns {Array} List of Users
     */ 
    getAll = async (): Promise<UserInterface[]> => {
        try {
            const users = await this.userModel.find();
            return users;
        } catch (error) {
            return [];
        }
    }


    register = async (userDetails: UserRegistrationInput): Promise<any> => {
        try {
            userDetails.password = bcrypt.hashSync(userDetails.password, 10);
            userDetails.email = String(userDetails.email)
                                    .replace(/ /g, '')
                                    .trim()
                                    .toLowerCase();
            return await this.userModel.insertOne({
                ...userDetails,
                is_verified: false,
                last_login_at: null,
                created_at: new Date(),
                updated_at: null
            });
        } catch (error) {
            throw error;
        }
    }

};

export default UserService;