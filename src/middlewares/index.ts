import * as bodyParser from 'body-parser';
import { Container } from 'typedi';

import AuthMiddleware from './auth/auth.middleware';


const defaultMiddlewares = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
];

export default {
    /**
     * Register Middlewares
     */
    register: function(): void {
        Container.set('defaultMiddlewares', defaultMiddlewares);
        const middlewares = [
            Container.get<any>(AuthMiddleware)
        ];
        const namedMiddlewares = {};
        for (const middleare of middlewares) {
            namedMiddlewares[middleare.ID] = middleare;
        }
        
        Container.set('namedMiddlewares', namedMiddlewares);
    }
}