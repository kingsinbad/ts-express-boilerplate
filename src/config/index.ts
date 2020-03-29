import { Container } from 'typedi';

import config from './config';


export default {
    /**
     * Register App Configuration
     */
    register: function(): void {
        Container.set('config', config);
    }
}