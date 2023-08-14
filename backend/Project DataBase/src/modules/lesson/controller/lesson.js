import lessonModel from "../../../../DB/models/lesson.model.js";
import energyModel from "../../../../DB/models/energy.model.js";



//  ADD LESSON
export const addLesson = async (req, res, next) => { 
    try {
        const {lessonName,lessonNumber,nodes } = req.body;
        let listOfNodes=[]
       if(nodes){
        let nodesWithoutDuplication=[]
        nodes.forEach(value => {
            if (!nodesWithoutDuplication.includes(value)) {
                nodesWithoutDuplication.push(value);
            }
          })
           for(let i=0;i<nodesWithoutDuplication.length;i++){
                const getNodeID = await energyModel.find({ name:nodesWithoutDuplication[i] }).select("_id");
                if(getNodeID.length==0){
                    return res.json({ message: `Please Enter Correct Name .The ${nodesWithoutDuplication[i]} is not Correct Name for any of Our Nodes` })
                }else{
                    listOfNodes.push(getNodeID[0]._id);    
                } 
           }
       }  
        const isExistName=await lessonModel.findOne({ lessonName:req.body.lessonName })
        if(isExistName){
            return res.json({ message: "This lesson Name is alredy Exist , Please Enter Anthor Name" })    
        }
        const isExistNumber=await lessonModel.findOne({ lessonNumber:req.body.lessonNumber })
        if(isExistNumber){
            return res.json({ message: "This lesson Number is alredy Exist , Please Enter Anthor Number" })  
        }
        const lesson = await lessonModel.create({ lessonName,lessonNumber,listOfNodes })
         return res.json({ message: "Done",lesson })
    } catch (error) {
        res.json({ message: `Catch Error ${error}` })
    }
}
// UPDATE LESSON NAME OR NUMBER
export const updateLessonNameOrNumber = async (req, res, next) => {
    try {
        const { part } = req.params;   
        const pattern = new RegExp(`^${part}`, "i") 
        const lesson = await lessonModel.findOne({ lessonName: { $regex: pattern } })
        if(!lesson){
            return res.json({ message: "IN-Valid lesson Name" })
        }
        if(req.body.lessonName){
            const isExistName=await lessonModel.findOne({ lessonName:req.body.lessonName })
            if(!isExistName){
                lesson.lessonName=req.body.lessonName
            }else{
                return res.json({ message: "This lesson Name is alredy Exist , Please Enter Anthor Name" })
            }
        }    
        if(req.body.lessonNumber){
            const isExistNumber=await lessonModel.findOne({ lessonNumber:req.body.lessonNumber })
            if(!isExistNumber){
                lesson.lessonNumber=req.body.lessonNumber
            }else{
                return res.json({ message: "This lesson Number is alredy Exist , Please Enter Anthor Number" })
            }
        }
       await lesson.save()
        return res.json({ message: "Done" ,lesson})
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// ADD NODE OR NODES TO LESSON
export const addNodes= async (req, res, next) => {
    try {
        const {name}=req.params;
        const { nodes } = req.body;
        let listOfNodes=[];
        const lesson=await lessonModel.findOne({lessonName:name})
        if(!lesson){
            return res.json({ message: `Please Enter Correct Name .The ${name} is an IN-Valid Name for any of Our Lessons ` })
        }
        for(let i=0;i<nodes.length;i++){
            const getNodeID = await energyModel.find({ name:nodes[i] }).select("_id");
            if(getNodeID.length==0){
                return res.json({ message: `Please Enter Correct Name .The ${nodes[i]} is not Correct Name for any of Our Nodes` })
            }else{
                if(lesson.listOfNodes.includes(getNodeID[0]._id)){
                    return res.json({ message: `This Node ${nodes[i]} is already exist in this lesson` }) 
                }else{
                    listOfNodes.push(getNodeID[0]._id);  
                }
            } 
       }
      for(let i=0;i<listOfNodes.length;i++){
        lesson.listOfNodes.push(listOfNodes[i])
   }
   await lesson.save()
        return res.json({ message: "Done",lesson })
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// DELETE LESSON
export const deleteLesson = async (req, res, next) => {
    try {
        const { part } = req.params
        const pattern = new RegExp(`^${part}`, "i")
        const lesson = await lessonModel.findOneAndDelete({ lessonName: { $regex: pattern } })
        return res.json({ message: "Done", lesson })
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// DELETE NODE FROM LESSON
export const deleteNodeFromLesson = async (req, res, next) => {
    try {
        const { lessonName } = req.params;  
        const {NodeName}=req.body;
        const node = await energyModel.findOne({name:NodeName})
        if(!node){
            return res.json({ message: "IN-Valid Node Name" })
        }
        const lesson = await lessonModel.findOneAndUpdate({lessonName},{$pull:{listOfNodes:node._id}},{new:true})
        if(!lesson){
            return res.json({ message: "IN-Valid lesson Name" })
        } 
        return res.json({ message: "Done" ,lesson})
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
////////////////////////////////////////////      APIS     ///////////////////////////////////////////
// GET ALL LESSONS
export const getAllLessons = async (req, res, next) => {
    try {
        const lessons = await lessonModel.find().populate({
            path:'listOfNodes',
            select:'name'
        })
        res.json({ message: "Done", lessons })
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET NODE NAME IN LESSON BY NUMBER  
export const getLessonByNumber = async (req, res, next) => {
    try {
        let nodes=[]
        const {number}=req.body;
    const lesson = await lessonModel.find({lessonNumber:number}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson.length==0){
      return  res.json({ message: "IN-Valid Lesson Number"})
    }
    const {listOfNodes}=lesson[0]
    for (let i = 0; i < listOfNodes.length; i++) {
         nodes.push(listOfNodes[i].name)
    }
    return res.json({ message: "Done", nodes})
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET NODE NAME IN LESSON BY ID 
export const getLessonByID = async (req, res, next) => {
   try {
    let nodes=[]
    const {id}=req.body;
    const lesson = await lessonModel.find({_id:id}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson.length==0){
        return  res.json({ message: "IN-Valid Lesson ID"})
      }
    const {listOfNodes}=lesson[0]
    for (let i = 0; i < listOfNodes.length; i++) {
         nodes.push(listOfNodes[i].name)
    }
   return res.json({ message: "Done", nodes })
   } catch (error) {
    return res.json({ message: `Catch Error ${error}` })
   }
}
// GET NODE NAME IN TWO LESSON BY NUMBER
export const getTwoLessonByNumber = async (req, res, next) => {
   try {
    let nodes=[]
    const {number1,number2}=req.body;
    const lesson1 = await lessonModel.find({lessonNumber:number1}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson1.length==0){
      return  res.json({ message: `${number1} is IN-Valid Lesson Number`})
    }
    const lesson2 = await lessonModel.find({lessonNumber:number2}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson2.length==0){
      return  res.json({ message: `${number2} IN-Valid Lesson Number`})
    }
    const lesson = await lessonModel.find({lessonNumber:{$in:[number1,number2]}}).populate({
        path:'listOfNodes',
        select:'name'
    })
    for (let i = 0; i < lesson.length; i++) {
       let {listOfNodes}=lesson[i]
       for (let j = 0; j < listOfNodes.length; j++) {
        nodes.push(listOfNodes[j].name)
   }
    }
    res.json({ message: "Done", nodes })
   } catch (error) {
    return res.json({ message: `Catch Error ${error}` })
   }
}
// GET NODE NAME IN TWO LESSON BY ID
export const getTwoLessonById = async (req, res, next) => {
   try {
    let nodes=[]
    const {id1,id2}=req.body;
    const lesson1 = await lessonModel.find({_id:id1}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson1.length==0){
      return  res.json({ message: `${id1} is IN-Valid Lesson ID`})
    }
    const lesson2 = await lessonModel.find({_id:id2}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson2.length==0){
      return  res.json({ message: `${id2} IN-Valid Lesson ID`})
    }
    const lesson = await lessonModel.find({_id:{$in:[id1,id2]}}).populate({
        path:'listOfNodes',
        select:'name'
    })
    for (let i = 0; i < lesson.length; i++) {
       let {listOfNodes}=lesson[i]
       for (let j = 0; j < listOfNodes.length; j++) {
        nodes.push(listOfNodes[j].name)
   }
    }
    res.json({ message: "Done", nodes })
   } catch (error) {
    return res.json({ message: `Catch Error ${error}` })
   }
}
// GET NODE NAME IN TWO LESSON BY ID AND INDICATOR
export const getTwoLessonByIdAndIndicator = async (req, res, next) => {
   try {
    let nodes=[];
    let otherLessonNumber;
    const {currentLessonId,indicator}=req.body;
    const lesson1 = await lessonModel.find({_id:currentLessonId}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson1.length==0){
      return  res.json({ message: `${currentLessonId} Is IN-Valid Lesson ID`})
    }
    const currentLessonNumber=lesson1[0].lessonNumber;
    if(indicator==0){
        otherLessonNumber=currentLessonNumber;
     }else if(indicator==1){
        otherLessonNumber=currentLessonNumber+1;
     }else if(indicator==-1){
        otherLessonNumber=currentLessonNumber-1;
     }else{
        otherLessonNumber=currentLessonNumber;
     }
    const lesson2 = await lessonModel.find({lessonNumber:otherLessonNumber}).populate({
        path:'listOfNodes',
        select:'name'
    })
    if(lesson2.length==0){
      return  res.json({ message: `${otherLessonNumber} Is IN-Valid Lesson Number`});
    }
    const otherLessonID=lesson2[0]._id;
    const lesson = await lessonModel.find({_id:{$in:[currentLessonId,otherLessonID]}}).populate({
        path:'listOfNodes',
        select:'name'
    });
    for (let i = 0; i < lesson.length; i++) {
       let {listOfNodes}=lesson[i]
       for (let j = 0; j < listOfNodes.length; j++) {
        nodes.push(listOfNodes[j].name)
   }
    }
    res.json({ message: "Done",nodes})
   } catch (error) {
    return res.json({ message: `Catch Error ${error}` })
   }
}