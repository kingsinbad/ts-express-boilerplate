import { Service, Inject, Container } from 'typedi';
import slugify from 'slugify';
import Logger from '../../utils/logger/logger.util';
import ChannelModel from '../../models/channels/channels.model';
import { 
    ConfigInterface, 
    ChannelInterface, 
    CreateInputInterface,
    PublishInputInterface,
    PrivateInputInterface
} from './channel.interface';

@Service('channel.service')
class ChannelService {

    @Inject()
    private channelModel: ChannelModel;
    @Inject()
    private logger: Logger;
    private config: ConfigInterface;


    constructor() {
        this.config = Container.get<any>('config').channel;
    }

    get activeQuery(): any {
        return {
            published: true,
            deleted: false,
            banned: false,
            deactivated: false
        }
    }

    /**
     * Get all active channels
     * @returns {Array} List of Active channels
     */ 
    getAllActive = async (): Promise<ChannelInterface[]> => {
        /**
         * @TODO
         * application level caching
         */
        try {
            const channels = await this.channelModel.find(this.activeQuery);

            return channels.map((channel: any) => {
                return {
                    id: channel._id,
                    owner_id: channel.owner_id,
                    name: channel.name,
                    about: channel.about,
                    slug: channel.slug,
                    code: channel.code,
                    created_at: channel.created_at
                }
            });
        } catch (error) {
            return [];
        }
    }

    
    create = async (params: CreateInputInterface): Promise<any> => {
        try {
            const { slug : slugConfig } = this.config; 
            const slug = slugConfig.enabled ? slugify(params.name, slugConfig.options) : '';

            const channelData = {
                owner_id: params.owner_id,
                name: params.name,
                about: params.about,
                slug: slug,
                published: false,
                published_at: null,
                deleted: false,
                deleted_at: null,
                banned: false,
                banned_at: null,
                deactivated: false,
                deactivated_at: null,
                updated_at: null
            };

            return await this.channelModel.insertOne(channelData);
        } catch (error) {
            throw error;
        }
    }

    publish = async (params: PublishInputInterface): Promise<any> => {
        const filter = {
            _id: params.channel_id
        };
        console.log(filter);
        
        const channel = await this.channelModel.findOne(filter);
        
        return true;
        // if (!channel.published) {
        //     const update = {
        //         published: true,
        //         published_at: new Date(),
        //         updated_at: new Date()
        //     };
        //     return await this.channelModel.updateOne(
        //         filter,
        //         update
        //     );
        // } else {
        //     const error = new Error('Channel already published');
        //     throw error;
        // }

    }

    getAllPrivate = async (params: PrivateInputInterface): Promise<any> => {
        const filter = {
            owner_id: params.owner_id,
            deleted: false
        };
        return await this.channelModel.find(filter);
    }
};

export default ChannelService;