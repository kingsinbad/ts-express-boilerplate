export const routes = {};

const getRoute = function(constructor: Function): any {
    routes[constructor.name] = routes[constructor.name] || {};
    routes[constructor.name].paths = routes[constructor.name].paths || [];
    return routes[constructor.name];
}

const setCallback = function(constructor: Function, method: string, path: string, key: string, config: any) {
    const route = getRoute(constructor);
    const { parameters=[], description='' } = config;
    route.paths.push({
        path,
        method,
        description,
        parameters: parameters.map((param: any) => param.value),
        callback: key
    });
}

export const ApiController = function(basePath: string): Function {
    return function(constructor: Function) {
        const route = getRoute(constructor);
        route.basePath = basePath;
    }
}

export const Get = function(path: string, config={}): Function {
    return function (target: any, key: string): void {
        setCallback(target.constructor, 'get', path, key, config);
    }
}

export const Post = function(path: string, config={}): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'post', path, key, config);
    }
}


export const Put = function(path: string, config={}): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'put', path, key, config);
    }
}

export const Delete = function(path: string, config={}): Function {
    return function (target: Function, key: string): void {
        setCallback(target.constructor, 'delete', path, key, config);
    }
}

