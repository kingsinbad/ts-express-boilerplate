
export interface ConfigInterface {
    slug: {
        enabled: boolean;
        options: {
            replacement: string;
            remove: any;
            lower: boolean;
            strict: boolean;
            locale: string;
        }
    }
}

export interface ChannelInterface {
    id: number;
    owner_id: string;
    name: string;
    about: string;
    slug: string;
    code: string;
    created_at: string;
};

export interface CreateInputInterface {
    owner_id: string;
    name: string;
    about: string;
}

export interface PublishInputInterface {
    owner_id: string;
    channel_id: string;
}

export interface PrivateInputInterface {
    owner_id: string;
}