
import { Request, Response } from 'express';
import { Inject } from 'typedi';

import { ApiController, Post } from '../decorators';
import UserService from '../../services/user/user.service';
import Logger from '../../utils/logger/logger.util';
import * as controllerConfig from './registration.config';


@ApiController('/registration', controllerConfig)
class RegistrationController {
    @Inject()
    private userService: UserService;

    @Inject()
    private logger: Logger;


    @Post('/')
    store = async (req: Request, res: Response) => {
        await this.userService.register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email
        });
        return res.json({ success: true });
    }

}

export default RegistrationController;