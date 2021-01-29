import { Container } from 'typedi';

import HomeController from './home/home.controller';
import UserController from './user/user.controller';
import RegistrationController from './registration/registration.controller';
import AuthController from './auth/auth.controller';
import ChannelController from './channel/channel.controller';


export default {
    /**
     * Register Controllers
     */
    register: function(): void {
        const controllers = [
            Container.get<any>(HomeController),
            Container.get<any>(UserController),
            Container.get<any>(RegistrationController),
            Container.get<any>(AuthController),
            Container.get<any>(ChannelController),
        ];
        for (const controller of controllers) {
            Container.set(controller.constructor.name, controller);
        }
    }
};