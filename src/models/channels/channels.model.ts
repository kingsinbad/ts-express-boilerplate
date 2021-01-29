import * as uuid from 'uuid';
import { Service } from 'typedi';
import BaseModel from '../base.model';


@Service('channel.model')
export default class Channel extends BaseModel {
    
    constructor() {
        super();
        this.collectionName = 'channels';
    }

    get schema(): any {
        return {
            owner_id: {
                type: String
            },
            name: {
                type: String
            },
            about: {
                type: String
            },
            slug: {
                type: String
            },
            code: {
                type: String
            },
            share_on_profile: {
                type: Boolean,
                default: false
            },
            share_owner_profile: {
                type: Boolean,
                default: false
            },
            published: {
                type: Boolean
            },
            published_at: {
                type: Date
            },
            deleted: {
                type: Boolean
            },
            deleted_at: {
                type: Date
            },
            banned: {
                type: Boolean
            },
            banned_at: {
                type: Date
            },
            deactivated: {
                type: Boolean
            },
            deactivated_at: {
                type: Date
            },
            created_at: {
                type: Date,
                default: Date.now
            },
            updated_at: {
                type: Date
            }
        }
    }

    preSave(params: any) {
        params.code = uuid.v4();
        return params;
    }

    postSerialize(item: any) {
        const linkSegments = [
            '/',
            'channel',
            '/',
            item.slug,
            '-',
            item.code.split('-')[0]
        ];

        item.permaLink = linkSegments.join('');
        return item;
    }
}