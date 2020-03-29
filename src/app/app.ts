import * as express from 'express';
import { Container, Inject, Service } from 'typedi';

import { AppConfigInterface } from './app.interface';
import Logger from '../utils/logger/logger.util';


@Service()
class App {
    public app: express.Application;
    private config: AppConfigInterface;
    
    @Inject()
    private logger: Logger; 

    constructor() {
        this.app = express();
        this.config = Container.get<any>('config').app;
        
        this.middlewares = Container.get('middlewares');
        this.controllers = Container.get('controllers');

        this.assets()
        this.template()
    }

    set middlewares(middlewares: [any]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    set controllers(controllers: [any]) {
        controllers.forEach(controller => {
            this.app.use('/', Container.get<any>(controller).router);
        });
    }

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }

    private template() {
        this.app.set('view engine', 'pug');
    }

    public listen() {
        this.app.listen(this.config.port, () => {
            this.logger.log('info', 'App Started', `http://localhost:${this.config.port}`);
        });
    }
}

export default App;