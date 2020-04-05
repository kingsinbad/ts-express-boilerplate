import { Container } from 'typedi';

import AuthenticationService from './authentication/authentication.service';
import UserService from './user/user.service';


export default {
    register: function() {
        const services = [
            AuthenticationService,
            UserService
        ];

        for (const service of services) {
            Container.set(service.name, services)
        }
    }
}