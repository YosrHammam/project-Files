import questionModel from "../../../../DB/models/question.model.js"



// GET ALL QUESTION
export const getQuestion = async (req, res, next) => {
    const questions = await questionModel.find();
    res.json({ message: "Done", questions })
}
//  ADD QUESTION
export const addQuestion = async (req, res, next) => {
    try {
        const { questionStyle,activityCategories,domain,subDomain,concept,complexity,answer,node1,node2 } = req.body;
        const question = await questionModel.create({ questionStyle,activityCategories,domain,subDomain,concept,complexity,answer,node1,node2 })
        return res.json({ message: "Done", question })
    } catch (error) {
        res.json({ message: `Catch Error ${error}` })
    }

}
//  GET QUESTIONS
export const getQuestions = async (req, res, next) => {
    try {
      //  nodes----->as array
        const {nodes,domain,subDomain,concept,complexity,activityCategories}=req.body;
        const question = await questionModel.find({node1:{$in:nodes},node2:{$in:nodes},domain,subDomain,concept,complexity,activityCategories}).select('questionStyle answer')
       return res.json({ message: "Done", question })
    } catch (error) {
        res.json({ message: `Catch Error ${error}` })
    }
}