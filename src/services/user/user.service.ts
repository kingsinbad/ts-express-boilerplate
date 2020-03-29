import { Service } from 'typedi';
import { UserInterface } from './user.interface';


@Service('user.service')
class UserService {
    constructor() {}

    /**
     * Get All Users
     * @returns {Array} List of Users
     *  */ 
    getAll = (): UserInterface[] => {
        const users = [
            {
                id: 1,
                name: 'Ali'
            },
            {
                id: 2,
                name: 'Can'
            },
            {
                id: 3,
                name: 'Ahmet'
            }
        ];

        return users;
    }

};

export default UserService;