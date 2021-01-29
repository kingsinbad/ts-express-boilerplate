
import { NextFunction, Request, Response } from 'express';
import { Inject } from 'typedi';

import { ApiController, Post, Get } from '../decorators';
import ChannelService from '../../services/channel/channel.service';
import Logger from '../../utils/logger/logger.util';
import * as controllerConfig from './channel.config';


@ApiController('/channels', controllerConfig)
class ChannelController {
    @Inject()
    private channelService: ChannelService;

    @Inject()
    private logger: Logger;

    @Get('/')
    public index = async (req: any, res: Response, next: NextFunction) => {
        try {
            const channels = await this.channelService.getAllActive();
            return res.json(channels);            
        } catch (error) {
            next(error);            
        } 
    }

    @Post('/', ['auth'])
    public create = async (req: any, res: Response, next: NextFunction) => {
        try {
            await this.channelService.create({
                owner_id: req.userId,
                name: req.body.name,
                about: req.body.about
            });

            return res.status(201).json({
                code: 200201
            });
        } catch (error) {
            next(error);
        }
    }

    @Post('/publish', ['auth'])
    public publish = async (req: any, res: Response, next: NextFunction) => {
        try {
            await this.channelService.publish({
                owner_id: req.userId,
                channel_id: req.body.channel_id
            });

            return res.status(202).json({
                code: 200202
            });
        } catch (error) {
            next(error);
        }
    }
    

    @Get('/private', ['auth'])
    public private = async (req: any, res: Response, next: NextFunction) => {
        try {
            const channels = await this.channelService.getAllPrivate({
                owner_id: req.userId
            });
            return res.status(200).json(channels);
        } catch (error) {
            next(error);       
        }
    }
}

export default ChannelController;