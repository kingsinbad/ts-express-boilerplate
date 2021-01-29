import Body from '../../request-config/body';


export const login = () => {
    const email = new Body({
        name: 'email',
        description: 'Account email',
        required: true,
        type: 'string'
    });
    
    const password = new Body({
        name: 'password',
        description: 'Account password',
        required: true,
        type: 'string'
    });


    const parameters = [
        email,
        password
    ];

    const description = 'Login User'

    return {
        parameters,
        description
    };
}