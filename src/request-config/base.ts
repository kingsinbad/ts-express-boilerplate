

export default class RequestConfig {
    private config: any = {};
    private in: string;

    constructor(options: any={}) {
        this.config = {
            name: options.name || '',
            description: options.description || '',
            required: typeof options.required === 'boolean' ? options.required : false,
            type: options.type || '',
            items: options.items || {},
            default: options.default || null
        };
    }
    
    set requestConfig(value: string) {
        this.in = value;
    }

    set default(value: string) {
        this.config.default = value;
    }

    set description(value: string) {
        this.config.description = value;
    }

    set items(value: string) {
        this.config.name = value;
    }

    set name(value: string) {
        this.config.name = value;
    }

    set required(value: string) {
        this.config.name = value;
    }

    set type(value: string) {
        this.config.type = value;
    }
    
    get value(): any {
        return {
            in: this.in,
            ...this.config
        };
    }
}   