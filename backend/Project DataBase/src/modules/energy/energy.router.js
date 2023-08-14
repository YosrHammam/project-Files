import {Router} from 'express';
import * as energy from './controller/energy.js';
const router=Router();



router.get('/getalldata',energy.getEnergy);
router.post('/addenergy',energy.addEnergy);
router.patch('/updateenergy/:part',energy.updateEnergy)
router.put('/updateMany',energy.updateMany)
router.delete('/deleteenergy/:part',energy.deleteEnergy)
/////////////////////////////////////////////////////////////////////
router.get('/getchildren/:part',energy.getChildren);
router.get('/getParent/:part',energy.getParent);
router.get('/getexamples/:part',energy.getExamples);
router.get('/getcharacteristics/:part',energy.getCharacteristics);
router.get('/getlevel/:part',energy.getLevel);
router.get('/getdomain/:part',energy.getdomain);
router.get('/getsubdomain/:part',energy.getsubDomain);
router.get('/getconcept/:part',energy.getConcept);




export default router;