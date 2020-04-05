export default {
    app: {
        port: process.env.PORT || 7000,
        basePath: '/api'
    },
    logger: {
        colors: { 
            error: 'red',
            success: 'green', 
            warn: 'yellow',
            debug: 'cyan', 
            info: 'blue'
        },
        enabled: true,
        levels: {
            error: 0, 
            warn: 1, 
            info: 2, 
            http: 3,
            verbose: 4, 
            debug: 5, 
            silly: 6
        },
        silent: false
    }
};