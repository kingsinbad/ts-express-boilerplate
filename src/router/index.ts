


class Router {

    private registered: boolean=false;
    private routes: any=[];
    private groups: any=[];
    private basePath: string= '';
    private app: any;
    private activeGroup: any=null;

    constructor(options: any={}) {
        this.basePath = options.basePath || '';
        this.app = options.app;
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
            this.compileRoutes();
            console.log(this.routes)
        }
    }
}


const Route = new Router();

const callback = () => {}

Route
    .group(() => {
        Route.get('/subscriptions', callback);
        Route.post('/subscriptions', callback);
        Route.put('/subscriptions', callback);
        Route.delete('/subscriptions', callback);
    })
    .middleware(['auth', 'hostname'])
    .prefix('/api');

Route.get('/me', () => {}).middleware('auth').prefix('yo');
Route.get('/channels/:channelCode', () => {});

Route.group(() => {
    Route.get('/keme', callback);
});
Route.post('/feed', () => {});

export default Route;