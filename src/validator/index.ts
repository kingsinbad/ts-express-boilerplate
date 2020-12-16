import { Request } from 'express';
import serializer from './validator.serializer';
import { ValidatorInterface } from './validator.interface';


export default function(req: Request, parameters: any[]):ValidatorInterface {    
    const issues = [];

    return {
        get issues() {
            return issues;
        },
        validate(): Promise<any> {
            return new Promise((resolve, reject) => {
                if (parameters.length) {
                    for (const param of parameters) {
                        const paramSerializer = serializer({
                            param,
                            req
                        });
                        
                        const issue = paramSerializer.execute();
                        if (issue) {
                            issues.push(issue);
                        }
                        req = paramSerializer.req;
                    }
                }

                if (issues.length) {
                    reject(issues);
                } else {
                    resolve(req);
                }
            });
        }
    }
}