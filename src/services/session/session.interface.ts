

interface TokenInterface {
    algorithm: string;
    secretKey: string;
    expiration: number;
};


export interface ConfigInterface {
    token: TokenInterface;
    refresh: ;

}


export interface CreateInputInterface {
    id: string;

}