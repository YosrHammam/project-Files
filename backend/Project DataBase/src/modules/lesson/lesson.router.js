import {Router} from 'express';
import * as lesson from './controller/lesson.js';
const router=Router();




router.post('/addlesson',lesson.addLesson);
router.put('/updatelessonnameornumber/:part',lesson.updateLessonNameOrNumber);
router.patch('/addnodes/:name',lesson.addNodes);
router.patch('/deletenodefromlesson/:lessonName',lesson.deleteNodeFromLesson);
router.delete('/deletelesson/:part',lesson.deleteLesson);

////////////////////////////////////////////////////////////////////////////

router.get('/getalllesson',lesson.getAllLessons);
router.post('/getlessonbynumber',lesson.getLessonByNumber);
router.post('/getlessonbyid',lesson.getLessonByID);
router.post('/gettwolessonbynumber',lesson.getTwoLessonByNumber);
router.post('/gettwolessonbyid',lesson.getTwoLessonById);
router.post('/gettwolessonbyidandindicator',lesson.getTwoLessonByIdAndIndicator);


export default router;