import * as express from 'express';
import { Container, Inject, Service } from 'typedi';

import { AppConfigInterface } from './app.interface';
import Validator from '../validator';
import Logger from '../utils/logger/logger.util';

import { routes } from '../controllers/decorators';


@Service()
class App {
    public app: express.Application;
    private config: AppConfigInterface;
    private router: express.Router;
    private namedMiddlewares: any;
    
    @Inject()
    private logger: Logger; 

    constructor() {
        this.app = express();
        this.router = express.Router();

        this.config = Container.get<any>('config').app;
        this.defaultMiddlewares = Container.get('defaultMiddlewares');
        this.namedMiddlewares = Container.get('namedMiddlewares');
        
        this.assets();
        this.template();
        this.registerRoutes();
    }

    set defaultMiddlewares(middlewares: [any]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }

    private getRouteMiddlewares(routeMiddlewares: string[]): Function[] {
        let middlewares = routeMiddlewares.map((middlewareName) => {
            const middleware = this.namedMiddlewares[middlewareName];
            return middleware ? middleware.handler : middleware;
        });

        middlewares = middlewares.filter((middleware) => typeof middleware === 'function');
        
        return middlewares.map((middleware) => {
            return function(req: express.Request, res: express.Response, next: express.NextFunction) {
                return middleware(req, res, next);
            }
        });
    }

    private registerRoutes() {
        for (const name of Object.keys(routes)) {
            const router = express.Router();
            const controller = Container.get(name);
            const config = routes[name];
            const routeConfig = routes[name].config;
            
            for (const route of config.paths) {
                const { parameters=[] } = routeConfig[route.callback] ? routeConfig[route.callback]() : {};
                const routeMiddlewares = this.getRouteMiddlewares(route.middlewares);
                router[route.method](
                    route.path, 
                    ...routeMiddlewares,
                    this.validatorMiddleware(parameters), 
                    function(req: express.Request, res: express.Response, next: express.NextFunction
                ) { 
                    controller[route.callback](req, res, next); 
                });
            }

            this.router.use(config.basePath, router);
        }

        this.app.use(this.config.basePath, this.router);
        this.app.use(this.errorHandler());
    }

    private template() {
        this.app.set('view engine', 'pug');
    }

    private validatorMiddleware(parameters: any[]) {
        parameters = parameters.map((parameter: any) => parameter.value)

        return function(req: express.Request, res: express.Response, next: express.NextFunction) {
            Validator(req, parameters)
                .validate()
                .then((serializedRequest: any) => {
                    req = serializedRequest;
                    next();
                })
                .catch((issues: any[]) => {
                    return res.status(400).json({
                        code: 400406,
                        name: 'Bad Request',
                        issues
                    });
                })
        }
    }
    
    private errorHandler() {
        return function(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
            return res.status(500).json({
                code: 500503,
                name: 'Internal Server Error',
                issues: [
                    {
                        error: error.message || 'lol'
                    }
                ]
            });
        }
    }

    public listen() {
        this.app.listen(this.config.port, () => {
            this.logger.log('info', 'App Started', `http://localhost:${this.config.port}`);
        });
    }
}

export default App;