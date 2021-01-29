import { MongoClient } from 'mongodb';
import { Container, Service, Inject } from 'typedi';
import Logger from '../../utils/logger/logger.util';


@Service('MongoDB')
export default class MongoDB {
    private config: any;
    private database: any;
    private $client: any;

    @Inject()
    private logger: Logger;

    constructor() {
        this.config = Container.get<any>('config').database.mongodb;
    }

    get client() {
        return this.$client;
    }

    get db() {
        return this.database;
    }

    connect(): Promise<any> {
        return new Promise(resolve => {
            MongoClient.connect(this.config.url, this.config.options, (err, client) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                this.logger.log('info', 'MongoDB', 'Client Connected', { url: this.config.url });
                this.$client = client;
                this.database = this.$client.db(this.config.dbName);

                resolve(this.database);
            });
        });
    }
    
    disconnect() {
        if (this.$client) {
            this.$client.close();
        }
    }
}