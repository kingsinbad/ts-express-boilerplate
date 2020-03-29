import { Container } from 'typedi';

import HomeController from './home/home.controller';

const controllers = [
    HomeController
];

export default {
    /**
     * Register Controllers
     */
    register: function(): void {
        Container.set('controllers', controllers);
    }
};