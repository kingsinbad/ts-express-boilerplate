import * as express from 'express';
import { Container, Inject, Service } from 'typedi';

import { AppConfigInterface } from './app.interface';
import Validator from './app.validator';
import Logger from '../utils/logger/logger.util';

import { routes } from '../controllers/decorators';


@Service()
class App {
    public app: express.Application;
    private config: AppConfigInterface;
    private router: express.Router;
    
    @Inject()
    private logger: Logger; 

    constructor() {
        this.app = express();
        this.router = express.Router();

        this.config = Container.get<any>('config').app;
        this.middlewares = Container.get('middlewares');
        this.registerRoutes();

        this.assets()
        this.template()
    }

    set middlewares(middlewares: [any]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

   


    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }

    private registerRoutes() {
        for (const name of Object.keys(routes)) {
            const router = express.Router();
            const controller = Container.get(name);
            const config = routes[name];

            for (const route of config.paths) {
                router[route.method](
                    route.path, 
                    this.validatorMiddleware(route.parameters || []), 
                    function(req: express.Request, res: express.Response, next: express.NextFunction
                ) { 
                    controller[route.callback](req, res, next); 
                });
            }

            this.router.use(config.basePath, router);
        }

        this.app.use(this.config.basePath, this.router);
    }

    private template() {
        this.app.set('view engine', 'pug');
    }

    private validatorMiddleware(parameters: any[]) {
        return function(req: express.Request, res: express.Response, next: express.NextFunction) {
            if (parameters.length) {
                const issues = Validator(req, parameters);
                if (issues.length) {
                    return res.status(400).json({
                        code: 400406,
                        name: 'Bad Request',
                        issues
                    });
                } 
            }
            next();
        }
    }
    
    public listen() {
        this.app.listen(this.config.port, () => {
            this.logger.log('info', 'App Started', `http://localhost:${this.config.port}`);
        });
    }
}

export default App;