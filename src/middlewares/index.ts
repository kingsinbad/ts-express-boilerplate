import * as bodyParser from 'body-parser';
import { Container } from 'typedi';

const middlewares = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
];

export default {
    /**
     * Register Middlewares
     */
    register: function(): void {
        Container.set('middlewares', middlewares);
    }
}