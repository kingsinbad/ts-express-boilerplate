import { Request } from 'express';



export default function(req: Request, parameters: any[]) {    
    const issues = [];

    if (parameters.length) {
        const serializeQuery = (param: any, req: Request): void => {
            if (param.required === true) {
                if (!req.query[param.name]) {
                    issues.push({
                        name: param.name,
                        type: 'query',
                        required: true,
                        message: `Query parameter "${param.name}" is required.`
                    })
                }
            } else if (param.default) {
                req.query[param.name] = param.default;
            }
        }

        const serializeBody = (param: any, req: Request): void => {
            if (param.required === true) {
                if (req.body[param.name] === undefined) {
                    issues.push({
                        name: param.name,
                        type: 'body',
                        required: true,
                        message: `Body parameter "${param.name}" is required.`
                    });
                } else if (typeof req.body[param.name] !== param.type) {
                    issues.push({
                        name: param.name,
                        type: 'body',
                        required: true,
                        message: `Body parameter "${param.name}" needs to be ${param.type}`
                    });
                }
            } else if (param.default) {
                req.body[param.name] = param.default;
            }
        }

        const serializePath = (param: any, req: Request): void => {
            if (param.required === true) {
                if (!req.params[param.name]) {
                    issues.push({
                        name: param.name,
                        type: 'params',
                        required: true,
                        message: `Routee params "${param.name}" is required.`
                    })
                }
            } else if (param.default) {
                req.params[param.name] = param.default;
            }
        }
    
        for (const param of parameters) {
            switch(param.in) {
                case 'query': 
                    serializeQuery(param, req);
                    break;
                case 'body':
                    serializeBody(param, req);
                    break;
                case 'path':
                    serializePath(param, req);
                    break;
                default:
                    break;
            }
        }
    }
    
    return issues;
}