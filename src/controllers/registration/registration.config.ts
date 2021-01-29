import Body from '../../request-config/body';


export const store = () => {
    const firstname = new Body({
        name: 'firstname',
        description: 'User first name',
        required: true,
        type: 'string'
    });

    const lastname = new Body({
        name: 'lastname',
        description: 'User last name',
        required: true,
        type: 'string'
    });

    const email = new Body({
        name: 'email',
        description: 'User email',
        required: true,
        type: 'string'
    });

    
    const password = new Body({
        name: 'password',
        description: 'User password',
        required: true,
        type: 'string'
    });


    const parameters = [
        firstname,
        lastname,
        email,
        password
    ];

    const description = 'Register User'

    return {
        parameters,
        description
    };
}