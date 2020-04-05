
import { Request, Response } from 'express';
import { Inject } from 'typedi';

import { ApiController, Get } from '../decorators';
import UserService from '../../services/user/user.service';
import Logger from '../../utils/logger/logger.util';


@ApiController('/users')
class UserController {
    @Inject()
    private userService: UserService;

    @Inject()
    private logger: Logger;


    @Get('/')
    public index = async (req: Request, res: Response) => {
        const users = await this.userService.getAll();
        this.logger.log('info', 'UserCntrl', 'get users', users);
        return res.json(users);
    }

}

export default UserController;