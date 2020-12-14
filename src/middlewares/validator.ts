import { Request, Response, NextFunction } from 'express';



export default function(req: Request, res: Response, next: NextFunction, parameters: any[]) {    
    const params = parameters.map((param: any) => param.value);
    const issues = [];

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

    for (const param of params) {
        switch(param.in) {
            case 'query': 
                serializeQuery(param, req);
                break;
            case 'body':
                break;
            default:
                break;
        }
    }


    if (issues.length) {
        return res.status(400).json({
            code: 400406,
            name: 'Bad Request',
            issues
        });
    } else {
        next();
    }
}