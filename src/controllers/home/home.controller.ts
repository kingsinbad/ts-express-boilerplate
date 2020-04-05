import { Request, Response } from 'express';
import { Inject } from 'typedi';

import { ApiController, Get } from '../decorators';
import Logger from '../../utils/logger/logger.util';

@ApiController('/')
class HomeController {


    @Inject()
    private logger: Logger;

    @Get('/')
    index = (req: Request, res: Response) => {
        this.logger.log('info', 'HomeCntrl', 'Take me home, country roads!');
        res.json({
            message: 'Hello Home!'
        });
    }
}


export default HomeController;