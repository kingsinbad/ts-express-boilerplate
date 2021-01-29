import { Router } from 'express';


export interface AppConfigInterface {
    port: number;
    basePath: string;
}

export interface AppRouterOptionsInterface {
    appRouter: Router;
    basePath: string;
}