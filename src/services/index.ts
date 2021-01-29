import { Container } from 'typedi';

import AuthenticationService from './authentication/authentication.service';
import UserService from './user/user.service';
import ChannelService from './channel/channel.service';


export default {
    register: function() {
        const services = [
            Container.get<any>(UserService),
            Container.get<any>(AuthenticationService),
            Container.get<any>(ChannelService),
        ];

        for (const service of services) {
            Container.set(service.constructor.name, services)
        }
    }
}