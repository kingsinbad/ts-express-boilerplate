import { Service } from 'typedi';
import BaseModel from '../base.model';


@Service('session.model')
export default class Session extends BaseModel {
    
    constructor() {
        super();
        this.collectionName = 'sessions';
    }

    get schema(): any {
        return {
            user_id: {
                type: String
            },
            auth_key: {
                type: String
            },
            created_at: {
                type: Date,
                default: Date.now
            },
            updated_at: {
                type: Date
            }
        }
    }
}