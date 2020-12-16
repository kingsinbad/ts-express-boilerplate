import { SerializedInterface } from './validator.interface';
import { SERIALIZABLES, TYPE_MAP, BOOLEANS } from './validator.map';


const typeSerializer = (param: any): SerializedInterface[] => {
    const lowerCaseParam = String(param).toLowerCase();
    const types = [];

    const numberValue = Number(param);
    if (!isNaN(numberValue)) {
        types.push({
            type: 'number',
            value: numberValue
        });
    }
    
    if (BOOLEANS.includes(lowerCaseParam)) {
        const booleanValue = (lowerCaseParam === BOOLEANS[0] || lowerCaseParam === BOOLEANS[1]);
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

export default (options: any) => {
    const {
        param,
        req
    } = options;
    const baseMessage = `Parameter [${param.name}] in ${param.in}`;
    const type = TYPE_MAP[param.in];
    const serializeType = SERIALIZABLES.includes(type);

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
