import connectDB from '../DB/connectionDB.js';
import questionRouter from './modules/question/question.router.js'
import cors from "cors";
const initApp=(app,express)=>{
    app.use(cors())
    app.use(express.json({}));
    app.use('/question',questionRouter);
    app.get('*',(req,res,next)=>{
        res.send('<h1>404 NOT FOUND PAGE </h1>')
    });
    connectDB();
}
export default initApp ;