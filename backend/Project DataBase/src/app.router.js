import connectDB from '../DB/connectionDB.js';
import energyRouter from './modules/energy/energy.router.js'
import lessonRouter from './modules/lesson/lesson.router.js'
import cors from "cors";
const initApp=(app,express)=>{
    app.use(cors())
    app.use(express.json({}));
    app.use('/energy',energyRouter);
    app.use('/lesson',lessonRouter);
    app.get('*',(req,res,next)=>{
        res.send('<h1>404 NOT FOUND PAGE </h1>')
    });
    connectDB();
}
export default initApp ;