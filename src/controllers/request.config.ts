


export const Query = (options: any) => {
    const config: any = {
        in: 'query',
        name: options.name || '',
        description: options.description || '',
        required: typeof options.required === 'boolean' ? options.required : false,
        type: options.type || '',
        items: options.items || {},
        default: options.default || null
    };

    return {
        set default(value: string) {
            config.default = value;
        },

        set description(value: string) {
            config.description = value;
        },

        set items(value: string) {
            config.name = value;
        },

        set name(value: string) {
            config.name = value;
        },

        set required(value: string) {
            config.name = value;
        },

        set type(value: string) {
            config.type = value;
        },
        
        get value(): any {
            return config;
        }
    };
}