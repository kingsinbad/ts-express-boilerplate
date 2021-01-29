
import { Container, Inject } from 'typedi';
import Logger from '../utils/logger/logger.util';


export default class BaseModel {
    public collectionName: string = 'defaultCollection';
    private db: any;
    
    @Inject()
    public logger: Logger;
    
    constructor() {
        this.db = Container.get<any>('database').db;
    }

    get collection(): any {
        return this.db.collection(this.collectionName);
    }

    get schema(): any {
        return {};
    }

    async delete() {
        try {
            return await this.collection.delete(...arguments);
        } catch (error) {
            this.logger.log('error', `${this.collectionName} delete error`, error.message);
            throw error; 
        }
    }

    async deleteOne() {
        try {
            return await this.collection.deleteOne(...arguments);
        } catch (error) {
            this.logger.log('error', `${this.collectionName} deleteOne error`, error.message);
            throw error; 
        }
    }

    async find(filter: any={}, options: any={}) {
        try {
            const list = await this.collection.find(filter, options).toArray();
            return list.map((item: any) => this.serialize(item));
        } catch (error) {
            this.logger.log('error', `${this.collectionName} find error`, error.message);
            throw error; 
        }
    }

    async findOne(filter: any, options:any={}) {
        try {
            const item = await this.collection.findOne(filter, options);
            return this.serialize(item);
        } catch (error) {
            this.logger.log('error', `${this.collectionName} findOne error`, error.message);
            throw error; 
        }
    }

    async insertOne(params: any, options:any={}) {
        try {
            params = this.preInsert(params);
            params = this.preSave(params);
            const item = await this.collection.insertOne(params, options);
            this.postSave(item);
            return item;
        } catch (error) {
            this.logger.log('error', `${this.collectionName} insertOne error`, error.message);
            throw error; 
        }
    }

    async insertMany() {
        try {
            return await this.collection.insertMany(...arguments);
        } catch (error) {
            this.logger.log('error', `${this.collectionName} insertMany error`, error.message);
            throw error; 
        }
    }

    async updateOne(filter:any, update: any={}, options:any={}) {
        try {
            return await this.collection.updateOne(filter, update, options);
        } catch (error) {
            this.logger.log('error', `${this.collectionName} updateOne error`, error.message);
            throw error; 
        }
    }

    async updateMany() {
        try {
            return await this.collection.updateMany(...arguments);
        } catch (error) {
            this.logger.log('error', `${this.collectionName} updateMany error`, error.message);
            throw error; 
        }
    }

    preInsert(params: any) {
        const properties = Object.keys(this.schema);
        for (const propertyKey of properties) {
            if (!params.hasOwnProperty(propertyKey)) {
                const property = this.schema[propertyKey];
                if (property.hasOwnProperty('default')) {
                    if (property.default.constructor === Function) {
                        params[propertyKey] = property.default();
                    } else {
                        params[propertyKey] = property.default;
                    }
                }
            }
        }

        return params;
    }

    preSave(params: any) {
        return params;
    }

    postSave(item: any) {}

    serialize(item: any) {
        item = this.preSerialize(item);

        if (item._id) {
            item.id = item._id;
            delete item._id;
        }

        const properties = Object.keys(this.schema);
        for (const propertyKey of properties) {
            const property = this.schema[propertyKey];
            
            if (!item.hasOwnProperty(propertyKey) 
             && property.hasOwnProperty('default')) {
                item[propertyKey] = property.default;
            
            } else if (item.hasOwnProperty(property) 
                    && item[property].constructor !== property.type) {
            
                if (property.hasOwnProperty('default')) {
                    item[propertyKey] = property.default;
                } else {
                    item[propertyKey] = null;
                }
            
            }
        }

        return this.postSerialize(item);
    }

    preSerialize(item: any) {
        return item;
    }

    postSerialize(item: any) {
        return item
    }

}