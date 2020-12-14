import BaseClass from './base';


export default class Query extends BaseClass {
    constructor(options: any={}) {
        super(options);
        this.requestConfig = 'path';
    }
}