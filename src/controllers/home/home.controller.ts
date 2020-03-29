import * as express from 'express';
import { Inject, Service } from 'typedi';

import UserService from '../../services/user/user.service';
import Logger from '../../utils/logger/logger.util';


@Service()
class HomeController {
    public path = '/';
    public router = express.Router();

    @Inject()
    private userService: UserService;

    @Inject()
    private logger: Logger;

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/', this.index);
    }

    public index = (req: express.Request, res: express.Response) => {
        const users = this.userService.getAll();
        this.logger.log('debug', 'Get Users', 'Successful', users);
        res.json({ users });
    }
}


export default HomeController;