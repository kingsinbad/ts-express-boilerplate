export const routes = {};

const getRoute = function(constructor: Function): any {
    routes[constructor.name] = routes[constructor.name] || {};
    routes[constructor.name].paths = routes[constructor.name].paths || [];
    return routes[constructor.name];
}

const setCallback = function(constructor: Function, method: string, path: string, key: string) {
    const route = getRoute(constructor);
    route.paths.push({
        path,
        method,
        callback: key
    });
}

export const ApiController = function(basePath: string): Function {
    return function(constructor: Function) {
        const route = getRoute(constructor);
        route.basePath = basePath;
    }
}

export const Get = function(path: string): Function {
    return function (target: any, key: string): void {
        setCallback(target.constructor, 'get', path, key);
    }
}

export const Post = function(path: string): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'post', path, key);
    }
}


export const Put = function(path: string): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'put', path, key);
    }
}

export const Delete = function(path: string): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'delete', path, key);
    }
}

