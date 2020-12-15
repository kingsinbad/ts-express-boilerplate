import { Request } from 'express';

const serializables = [
    'query',
    'params'
];

const typeMap = {
    path: 'params',
    body: 'body',
    query: 'query'
};

const typeSerializer = (param: any): { type: string, value: any }[] => {
    const booleans = ['true', '1', 'false', '0'];
    const lowerCaseParam = String(param).toLowerCase();
    const types = [];

    const numberValue = Number(param);
    if (!isNaN(numberValue)) {
        types.push({
            type: 'number',
            value: numberValue
        });
    }
    
    if (booleans.includes(lowerCaseParam)) {
        const booleanValue = (lowerCaseParam === booleans[0] || lowerCaseParam === booleans[1]);
        types.push({
            type: 'boolean',
            value: booleanValue
        });
    }

    if (param !== undefined) {
        types.push({
            type: 'string',
            value: String(param)
        });
    }

    return types;
};

const serializer = (options: any) => {
    const {
        type,
        param,
        req
    } = options;
    const baseMessage = `Parameter [${param.name}] in ${param.in}`;
    const serializeType = serializables.includes(type);

    return {
        get req() {
            return req;
        },
        execute() {
            const issue = {
                name: param.name,
                type,
                required: true,
                message: ''
            };
            let requestParam = req[type][param.name];
            let serializedParam: any;

            if (serializeType) {
                const types = typeSerializer(requestParam);
                serializedParam = types.find(paramMeta => paramMeta.type === param.type);
                if (serializedParam) {
                    requestParam = serializedParam.value;
                }
            }
            if (param.required === true) {
                if (requestParam === undefined) {
                    issue.message = `${baseMessage} is required.`
                    return issue;
                } else if (param.type !== undefined && typeof requestParam !== param.type)  {
                    issue.message = `${baseMessage} needs to be ${param.type}.`
                    return issue;
                }
            } else if (param.default !== undefined) {
                if (requestParam === undefined || (serializeType && !serializedParam)) {
                    requestParam = param.default;
                } else {
                    requestParam = serializedParam ? serializedParam.value : param.default;
                }
                
            }

            // Reassign value to request parameter
            req[type][param.name] = requestParam;

            return;
        }
    }
}

export default function(req: Request, parameters: any[]) {    
    const issues = [];

    return {
        get issues() {
            return issues;
        },
        validate() {
            if (parameters.length) {
                for (const param of parameters) {
                    const paramSerializer = serializer({
                        type: typeMap[param.in],
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

            return issues;
        }
    }
}