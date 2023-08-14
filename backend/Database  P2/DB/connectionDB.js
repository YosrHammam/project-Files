import mongoose from 'mongoose';

const connectDB =async()=>{
    return await mongoose.connect('mongodb+srv://sist14642:FA6UwgjJnmpkuhAH@cluster0.2qrv4bk.mongodb.net/?retryWrites=true&w=majority')
    .then(result=>{
                  console.log("DB connected successfully")
    }).catch(error=>{console.log(`Fail to connect DB ${error}`)})
}
export default connectDB;