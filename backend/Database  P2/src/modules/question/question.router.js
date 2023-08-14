import {Router} from 'express';
import * as question from './controller/question.js';
const router=Router();



router.get('/getallquestion',question.getQuestion);
router.post('/addquestion',question.addQuestion);
router.post('/getquestions',question.getQuestions)



export default router;