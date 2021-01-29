

export interface ConfigInterface {
    token: {
        algorithm: string;
        secretKey: string;
        expiration: number;
    };
}

export interface UserInterface {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface LoginInputInterface {
    email: string;
    password: string;
}

export interface LoginOutputInterface {
    user: UserInterface;
    jwt: string;
}

export interface ValidateTokenOutputInterface {
    sub: string;
    data: UserInterface;
    iat: number;
    exp: number;
}