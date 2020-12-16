
export interface SerializedInterface {
    type: string; 
    value: any;
};


export interface ValidatorInterface {
    issues: any[];
    validate: Function;
}