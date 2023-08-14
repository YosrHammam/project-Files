import { Schema, model, Types } from 'mongoose';


const lessonSchema = new Schema({
    lessonName: {
        type: String,
        lowercase: true,
        required:true,
        unique:true,
    },
    lessonNumber: {
        type: Number,
        unique:true,
        required:true
    },
    listOfNodes: {
        type: [Types.ObjectId],
        ref: 'energy',
    }
});
const lessonModel = model('lesson', lessonSchema);
export default lessonModel;