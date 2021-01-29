import { Container } from 'typedi';
import UserModel from './users/users.model';
import SessionModel from './sessions/sessions.model';
import ChannelModel from './channels/channels.model';


export default {

    /**
     * Register Models
     */
    register(): void {
        const models = [
            Container.get<any>(UserModel),
            Container.get<any>(SessionModel),
            Container.get<any>(ChannelModel)
        ];

        for (const model of models) {
            Container.set(model.constructor.name, model);
        }

        const model = Container.get<any>(ChannelModel);

        model.find().then(console.log)

    }

}