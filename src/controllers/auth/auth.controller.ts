
import { Request, Response } from 'express';
import { Inject } from 'typedi';

import { ApiController, Post } from '../decorators';
import AuthenticationService from '../../services/authentication/authentication.service';
import Logger from '../../utils/logger/logger.util';
import * as controllerConfig from './auth.config';


@ApiController('/auth', controllerConfig)
class RegistrationController {
    @Inject()
    private authService: AuthenticationService;

    @Inject()
    private logger: Logger;


    @Post('/login')
    login = async (req: Request, res: Response, next: any) => {
        try {
            const response = await this.authService.login({
                password: req.body.password,
                email: req.body.email
            });
            return res.json(response);    
        } catch (error) {
            next(error);
        }
    }

}

export default RegistrationController;