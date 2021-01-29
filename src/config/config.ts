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
    },
    database: {
        client: 'MongoDB',
        mongodb: {
            url: process.env.MONGO_DB_URL || 'mongodb://localhost:27017',
            dbName: process.env.MONGO_DB_NAME || 'gostudyph',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    },
    authentication: {
        token: {
            algorithm: 'HS256',
            secretKey: process.env.TOKEN_SECRET_KEY || 'gostysad',
            expiration: 3600
        }
    },
    session: {
        token: {
            algorithm: 'HS256',
            secretKey: process.env.TOKEN_SECRET_KEY || 'gostysad',
            expiration: 3600
        }
    },
    channel: {
        slug: {
            enabled: true,
            options: {
                replacement: '-',
                remove: undefined, 
                lower: false,
                strict: false,
                locale: 'en'
            }
        }
    }
};