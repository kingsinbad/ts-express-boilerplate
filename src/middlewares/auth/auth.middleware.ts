import { Inject, Service } from 'typedi';
import { Response, NextFunction } from 'express';

import AuthenticationService from '../../services/authentication/authentication.service';


@Service('auth.middleware')
export default class AuthMiddleware {

    @Inject()
    private authService: AuthenticationService;
    constructor() {}

    /**
     * Middleware Identifier
     */
    public get ID(): string {
        return 'auth';
    }

    /**
     * Authentication Middleware handler
     * @param req {Request} - Express request 
     * @param res {Response} - Express response
     * @param next {NextFunction} - Express next function
     */
    handler = async (req: any, res: Response, next: NextFunction): Promise<any> => {
        const authorizationToken = req.headers.authorization;
        if (authorizationToken) {
            try {
                const decoded = await this.authService.validateToken(authorizationToken);
                req.userId = decoded.sub;
                req.user = decoded.data;
                req.tokenExpiration = decoded.iat;
                next();
                    
            } catch (error) {
                return res.status(403).json({
                    code: 400403,
                    name: 'Authorization',
                    issues: [
                        'Authorization Invalid'
                    ]
                });
            }
        } else {
            return res.status(401).json({
                code: 400401,
                name: 'Authorization',
                issues: [
                    'Authorization Required'
                ]
            });
        }

    }

}