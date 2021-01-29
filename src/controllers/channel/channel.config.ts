import Body from '../../request-config/body';


export const create = () => {
    const name = new Body({
        name: 'name',
        description: 'Channel name',
        required: true,
        type: 'string'
    });

    const about = new Body({
        name: 'about',
        description: 'Channel about',
        required: true,
        type: 'string'
    });

    const parameters = [
        name,
        about
    ];
    const description = 'Create Channel';

    return {
        description,
        parameters
    };
};


export const publish = () => {
    const channel_id = new Body({
        name: 'channel_id',
        description: 'Channel ID',
        required: true,
        type: 'string'
    });

    const parameters = [
        channel_id
    ];
    const description = 'Publish Channel';

    return {
        description,
        parameters
    };
};
