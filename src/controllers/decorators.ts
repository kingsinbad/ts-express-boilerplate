export const routes = {};

const getRoute = function(constructor: Function): any {
    routes[constructor.name] = routes[constructor.name] || {};
    routes[constructor.name].paths = routes[constructor.name].paths || [];
    return routes[constructor.name];
}

const setCallback = function(constructor: Function, method: string, path: string, key: string, middlewares: string[]) {
    const route = getRoute(constructor);
    route.paths.push({
        path,
        method,
        middlewares: middlewares || [],
        description: '',
        parameters: [],
        callback: key
    });
}

export const ApiController = function(basePath: string, config={}): Function {
    return function(constructor: Function) {
        const route = getRoute(constructor);
        route.basePath = basePath;
        route.config = config;
    }
}

export const Get = function(path: string, middlewares?: string[]): Function {
    return function (target: any, key: string): void {
        setCallback(target.constructor, 'get', path, key, middlewares);
    }
}

export const Post = function(path: string, middlewares?: string[]): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'post', path, key, middlewares);
    }
}


export const Put = function(path: string, middlewares?: string[]): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'put', path, key, middlewares);
    }
}

export const Delete = function(path: string, middlewares?: string[]): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'delete', path, key, middlewares);
    }
}

