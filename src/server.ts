
import 'reflect-metadata';
import { Container } from 'typedi';

import config from './config';
import database from './database';
import controllers from './controllers';
import middlewares from './middlewares';
import services from './services';
import models from './models';

import Router from './router';

Router.register();
console.log('done')
config.register();
database.register();

import App from './app/app';

// Retain Container usage for Dependency Injection

database
    .connect()
    .then(() => {
        models.register();
        services.register();
        controllers.register();
        middlewares.register();

        const app = Container.get(App);
        app.listen();
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
