import { Schema, model, Types } from 'mongoose';


const energySchema = new Schema({
    name: {
        type: String,
        lowercase: true
    },
    characteristics: {
        type: Array
    },
    definition: {
        type: String
    },
    examples: {
        type: Array
    },
    children_IDs: {
        type: Array
    },
    parent_ID: {
        type: Types.ObjectId,
        ref: 'energy',
    },
    domain: {
        type: String,
        lowercase: true
    },
    subDomain: {
        type: String,
        lowercase: true
    },
    concept: {
        type: String,
        lowercase: true
    },
    level: {
        type: Number,
    },
    
});
const energyModel = model('energy', energySchema);
export default energyModel;


