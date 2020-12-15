import Query from '../../request-config/query';
import Body from '../../request-config/body';
import Path from '../../request-config/path';


export const index = () => {
    const pageQuery = new Query({
        name: 'page',
        description: 'Page number',
        required: true,
        type: 'integer'
    });
    const offsetQuery = new Query({
        name: 'offset',
        description: 'Page offset',
        required: false,
        type: 'integer'
    });
    const sizeQuery = new Query({
        name: 'offset',
        description: 'Page offset',
        required: false,
        type: 'integer'
    });
   
    const parameters = [
        pageQuery,
        offsetQuery,
        sizeQuery
    ];

    const description = 'Hello world'

    return {
        parameters,
        description
    };
}

export const store = () => {
    const sampleBody = new Body({
        name: 'sample',
        description: 'Sample Param',
        required: true,
        type: 'string'
    });

    const defaultBody = new Body({
        name: 'def',
        description: 'Sample def',
        required: false,
        type: 'string',
        default: 'Bombaya'
    });


    const parameters = [
        sampleBody,
        defaultBody
    ];

    const description = 'Hello Store!!'

    return {
        parameters,
        description
    };
}


export const get = () => {
    const itemIdQuery = new Path({
        name: 'itemId',
        description: 'Item ID',
        required: true,
        type: 'number'
    });
    const verifyQuery = new Query({
        name: 'verify',
        description: 'Verify Flag',
        required: true,
        type: 'boolean'
    });
    const notRequiredQuery = new Query({
        name: 'notRequired',
        description: 'NotRequired Flag',
        required: false,
        type: 'boolean',
        default: true
    });


    const parameters = [
        itemIdQuery,
        verifyQuery,
        notRequiredQuery
    ];

    const description = 'Get item';

    return {
        parameters,
        description
    };
}