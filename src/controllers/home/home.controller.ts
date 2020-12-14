import { Request, Response } from 'express';
import { Inject } from 'typedi';

import { ApiController, Get, Post } from '../decorators';
import Logger from '../../utils/logger/logger.util';

import * as ControllerConfig from './home.config';


@ApiController('/')
class HomeController {

    @Inject()
    private logger: Logger;

    @Get('/', ControllerConfig.index())
    index = (req: Request, res: Response) => {
        this.logger.log('info', 'HomeCntrl', 'Take me home, country roads!');
        res.json({
            message: 'Hello Home!'
        });
    }

    @Post('/', ControllerConfig.store())
    store = (req: Request, res: Response) => {
        this.logger.log('info', 'HomeCntrl', 'Bombanatics');
        res.json({
            ...req.body
        });
    }

    @Get('/item/:itemId', ControllerConfig.get())
    get = (req: Request, res: Response) => {
        this.logger.log('info', 'HomeCntrl', 'Item!');
        res.json({
            itemId: req.params.itemId,
            ...req.query
        });
    }

}


export default HomeController;