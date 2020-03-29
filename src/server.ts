
import 'reflect-metadata';
import { Container } from 'typedi';

import config from './config';
import controllers from './controllers';
import middlewares from './middlewares';

config.register();
controllers.register();
middlewares.register();

import App from './app/app';

// Retain Container usage for Dependency Injection
const app = Container.get(App);

app.listen();