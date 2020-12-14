
import { Query } from '../request.config';


export const index = () => {
    const pageQuery = Query({
        name: 'page',
        description: 'Page number',
        required: true,
        type: 'integer'
    });
    const offsetQuery = Query({
        name: 'offset',
        description: 'Page offset',
        required: false,
        type: 'integer'
    });
    const sizeQuery = Query({
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