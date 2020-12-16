import { Request, Response } from 'express';
import { Inject } from 'typedi';

import { ApiController, Get, Post } from '../decorators';
import Logger from '../../utils/logger/logger.util';

import * as controllerConfig from './home.config';


@ApiController('/', controllerConfig)
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

    @Post('/item')
    store = (req: Request, res: Response) => {
        this.logger.log('info', 'HomeCntrl', 'Bombanatics');
        res.json({
            ...req.body
        });
    }

    @Get('/item/:itemId')
    get = (req: Request, res: Response) => {
        this.logger.log('info', 'HomeCntrl', 'Item!');
        res.json({
            itemId: req.params.itemId,
            ...req.query
        });
    }

}


export default HomeController;