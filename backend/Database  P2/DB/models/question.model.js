import { Schema, model } from 'mongoose';


const questionSchema = new Schema({
    questionStyle: {
        type: String,
    },
    domain: {
        type: String,
    },
    subDomain: {
        type: String,
    },
    concept: {
        type: String,
    },
    activityCategories: {
        type: String,
    },
    complexity: {
        type: Number,
    },
    answer:{
        type:String
    },
    node1:{
        type:String,
    },
    node2:{
        type:String,
    }
},{
timestamps:true
    }
);
const questionModel = model('question', questionSchema);
export default questionModel;


