import { Container } from 'typedi';
import MongoDB from './mongodb/mongodb';


export default {
    /**
     * Register Databases
     */
    register: function(): void {
        const databases = [
            Container.get<any>(MongoDB)
        ];
        for (const database of databases) {
            Container.set(database.constructor.name, database);
        }
    },
    connect: function(): Promise<any> {
        const dbClientName = Container.get<any>('config').database.client;
        const dbCllient = Container.get<any>(dbClientName);
        Container.set('database', dbCllient);
        
        if (dbCllient) {
            return dbCllient.connect();
        } else {
            return Promise.resolve(false);
        }
    }
};