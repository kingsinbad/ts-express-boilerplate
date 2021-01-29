import { Service } from 'typedi';
import BaseModel from '../base.model';


@Service('user.model')
export default class UserModel extends BaseModel {
    
    constructor() {
        super();
        this.collectionName = 'users';
    }

    get schema(): any {
        return {
            firstname: {
                type: String
            },
            lastname: {
                type: String
            },
            email: {
                type: String
            },
            password: {
                type: String
            },
            is_verified: {
                type: Boolean
            },
            verified_at: {
                type: Date
            },
            last_login_at: {
                type: Date
            },
            created_at: {
                type: Date
            },
            updated_at: {
                type: Date
            }
        }
    }
}