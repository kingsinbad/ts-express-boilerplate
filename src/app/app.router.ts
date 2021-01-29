import * as express from 'express';
import { AppRouterOptionsInterface } from './app.interface';



export default class Router {

    private registered: boolean=false;
    private routes: any=[];
    private groups: any=[];
    private appRouter: express.Router;
    private basePath: string='';
    private activeGroup: any=null;

    constructor(options: AppRouterOptionsInterface) {
        this.appRouter = options.appRouter;
        this.basePath = options.basePath;
    }

    private get groupInstance() {
        const groupIndex = this.groups.length - 1;
        return this.getGroupInstance(groupIndex);
    }

    private get routeInstance() {
        const routeIndex = this.routes.length - 1;
        return this.getRouteIntance(routeIndex);
    }

    private set router({ path, method, callback }: any) {
        const route = {
            path,
            callback,
            method,
            prefix: '',
            middleware: []
        };

        if (this.activeGroup) {
            this.activeGroup.routes = this.activeGroup.routes || [];
            this.activeGroup.routes.push(route);
        } else {
            this.routes.push(route);
        }
    }

    private getRouteIntance(routeIndex: number) {
        const vm = this;
        return {
            instance: this,
            routeIndex: routeIndex,
            middleware(middlewares: string | string[]) {
                vm.routes[routeIndex].middleware = Array.isArray(middlewares) ? middlewares : [middlewares];
                return vm.getRouteIntance(routeIndex);
            },
            prefix(prefix: string) {
                vm.routes[routeIndex].prefix = prefix;
                return vm.getRouteIntance(routeIndex);
            }
        }
    }

    private getGroupInstance(groupIndex: number) {
        const vm = this;
        return {
            middleware(middlewares: string | string[]) {
                vm.groups[groupIndex].middleware = Array.isArray(middlewares) ? middlewares : [middlewares];
                return vm.getGroupInstance(groupIndex);
            },
            prefix(prefix: string) {
                vm.groups[groupIndex].prefix = prefix;
                return vm.getGroupInstance(groupIndex);
            }  
        }
    }

    private finalizeGroup() {
        this.groups.push(this.activeGroup);
        this.activeGroup = null;
    }

    private initializeGroup() {
        this.activeGroup = {
            routes: [],
            prefix: '',
            middleware: []
        };
    }

    public group(callback: Function) {
        this.initializeGroup();
        callback();
        this.finalizeGroup();
        return this.groupInstance;
    }

    public get(path: string, callback: Function) {
        this.router = {
            path,
            callback,
            method: 'get'
        };

        return this.routeInstance;
    }

    public post(path: string, callback: Function) {
        this.router = {
            path,
            callback,
            method: 'post'
        };

        return this.routeInstance;
    }

    public delete(path: string, callback: Function) {
        this.router = {
            path,
            callback,
            method: 'delete'
        };

        return this.routeInstance;
    }

    public put(path: string, callback: Function) {
        this.router = {
            path,
            callback,
            method: 'put'
        };

        return this.routeInstance;
    }

    public patch(path: string, callback: Function) {
        this.router = {
            path,
            callback,
            method: 'patch'
        };

        return this.routeInstance;
    }

    private compileRoutes() {
        const groupRoutes = [];
        this.groups.forEach((group: any) => {
            group.routes.forEach((route: any) => {
                let middleware = [...group.middleware, ...route.middleware];
                if (middleware.length) {
                    const mws = {};
                    middleware.forEach(mw => { mws[mw] = 1 });
                    middleware = Object.keys(mws);
                }

                groupRoutes.push({
                    path: `${group.prefix}${route.path}`,
                    middleware: middleware,
                    method: route.method,
                    callback: route.callback
                });
            });
        });
        this.routes = [...this.routes, ...groupRoutes];
    }

    register() {
        if (this.registered === false) {
            this.registered = true;
            // this.compileRoutes();


            if (this.groups.length) {
                for (const groupRoute of this.groups) {
                    const groupRouter = express.Router();

                    for (const route of groupRoute.routes) {

                        let middleware = [...groupRoute.middleware, ...route.middleware];
                        if (middleware.length) {
                            const mws = {};
                            middleware.forEach(mw => { mws[mw] = 1 });
                            middleware = Object.keys(mws);
                        }

                        groupRouter[route.method](
                            route.path, 
                            ...routeMiddlewares,
                            this.validatorMiddleware(parameters), 
                            function(req: express.Request, res: express.Response, next: express.NextFunction
                        ) { 
                            controller[route.callback](req, res, next); 
                        });
                        
                    }

                    // path,
                    // callback,
                    // method,
                    // prefix: '',
                    // middleware: []
                }
            }
            
            
        }
    }
}
