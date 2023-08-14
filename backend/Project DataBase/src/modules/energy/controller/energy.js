import energyModel from "../../../../DB/models/energy.model.js"



// GET ALL ENERGIES
export const getEnergy = async (req, res, next) => {
    const energy = await energyModel.find().select('-lessonNumber');
    res.json({ message: "Done", energy })
}
//  ADD ENERGY
export const addEnergy = async (req, res, next) => {
    try {
        const { name, definition, examples, characteristics, parentName,domain,subDomain,concept,level} = req.body;
        const getParentID = await energyModel.find({ name: parentName }).select("parent_ID");
        const energy = await energyModel.create({ name, definition, examples, characteristics, parent_ID: getParentID[0]._id,domain,subDomain,level,concept})
        return res.json({ message: "Done", energy })
    } catch (error) {
        res.json({ message: `Catch Error ${error}` })
    }

}
// UPDATE ENERGY
export const updateEnergy = async (req, res, next) => {
    try {
        const { part } = req.params   
        const pattern = new RegExp(`^${part}`, "i")
        const energy = await energyModel.findOneAndUpdate({ name: { $regex: pattern } }, req.body, { new: true })
        console.log(req.body);
        return res.json({ message: "Done", energy })
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}// UPDATE MANY
export const updateMany = async (req, res, next) => {
    try {
        const { domain, subDomain, context } = req.body;
        const energy = await energyModel.updateMany({ domain, subDomain, context })
        return res.json({ message: "Done", energy })
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// DELETE ENERGY
export const deleteEnergy = async (req, res, next) => {
    try {
        const { part } = req.params
        const pattern = new RegExp(`^${part}`, "i")
        const energy = await energyModel.findOneAndDelete({ name: { $regex: pattern } })
        return res.json({ message: "Done", energy })
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
///////////////////////////////////////////////////////////////
// GET CHILDREN 
export const getChildren = async (req, res, next) => {
    try {
        let childrenNames = [];
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i");
        const children = await energyModel.find({ name: { $regex: pattern } }).select("children_IDs name");
        if (children[0] == null) {
            res.json({ message: `Search word deosnot match any data` });
        }
        else {
            const { children_IDs } = children[0];
            if (!children_IDs.length) {
                res.json({ message: `Node ${children[0].name.toUpperCase()} DOESNOT HAVE CHILDREN` });
            }
            else {
                for (let i = 0; i < children_IDs.length; i++) {
                    let child = await energyModel.findById(children_IDs[i]).select("name level");
                    childrenNames[i] = child;
                }
                res.json({ message: "Done", childrenNames });
            }
        }
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` });
    }
}
// GET PARENT
export const getParent = async (req, res, next) => {
    try {
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i")
        const child = await energyModel.find({ name: { $regex: pattern } }).select("name parent_ID");

        if (child[0]?.name == 'energy') {
            return res.json({ message: "This Node is The root" })
        }
        if (child[0] == null) {
            return res.json({ message: "Search word deosnot match any data" })
        } else {
            const parentName = await energyModel.findById(child[0].parent_ID).select("name level");

            return res.json({ message: "Done", parentName })

        }

    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET Examples
export const getExamples = async (req, res, next) => {
    try {
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i");
        const examples = await energyModel.find({ name: { $regex: pattern } }).select("name examples");
        if (examples[0] == null) {
            res.json({ message: "Search word deosnot match any data" })
        } else {
            res.json({ message: "Done", examples })
        }
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET CHARACTERISTICS
export const getCharacteristics = async (req, res, next) => {
    try {
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i")
        const characteristics = await energyModel.find({ name: { $regex: pattern } }).select("characteristics");
        if (characteristics[0] == null) {
            res.json({ message: "Search word deosnot match any data" })
        } else {
            res.json({ message: "Done", characteristics })
        }

    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET LEVEL
export const getLevel=async(req,res,next)=>{
    try {
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i");
        const level = await energyModel.find({ name: { $regex: pattern } }).select("name level");
            res.json({ message: "Done", level });
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET domain
export const getdomain=async(req,res,next)=>{
    try {
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i");
        const domain = await energyModel.find({ name: { $regex: pattern } }).select("name domain");
            res.json({ message: "Done", domain });
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET subDomain
export const getsubDomain=async(req,res,next)=>{
    try {
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i");
        const subDomain = await energyModel.find({ name: { $regex: pattern } }).select("name subDomain");
            res.json({ message: "Done", subDomain });
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}
// GET Concept
export const getConcept=async(req,res,next)=>{
    try {
        const { part } = req.params;
        const pattern = new RegExp(`^${part}`, "i");
        const concept = await energyModel.find({ name: { $regex: pattern } }).select("name concept");
            res.json({ message: "Done", concept });
    } catch (error) {
        return res.json({ message: `Catch Error ${error}` })
    }
}

