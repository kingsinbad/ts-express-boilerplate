import { Container } from 'typedi';

import HomeController from './home/home.controller';
import UserController from './user/user.controller';


export default {
    /**
     * Register Controllers
     */
    register: function(): void {
        const controllers = [
            Container.get<any>(HomeController),
            Container.get<any>(UserController)
        ];
        for (const controller of controllers) {
            Container.set(controller.constructor.name, controller);
        }
    }
};