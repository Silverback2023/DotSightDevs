const AuthorModel=require('../Models/Author');

const ceateAuthor=async(req,res)=>{
    const AuthorData=req.body;
    const now_AuthorData=await AuthorModel.findOne({name:AuthorData.name});
    if(now_AuthorData!=null){
        return res.status(500).json({
            message: "This Author already exists!",
        })
    }else{
        const newAuthor=new AuthorModel({
            name:AuthorData.name,
        });
    
        try{
            const response=await newAuthor.save();
            return res.status(201).json({
                message:"Add Author successfully",
                data:response
            })
        }catch(error){
            return res.status(500).json({
                message: "There was an error",
                error
            })
        }
    }
}


const findAuthorName=async(req,res)=>{
    const name=req.body.name;
    try{
        const now_AuthorData=await AuthorModel.findOne({name:name});
        return now_AuthorData;
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const findAll=async(req,res)=>{
    try{
        let now_AuthorData=await AuthorModel.find();
        return res.status(201).json({
            message:'Get all Author ',
            data:now_AuthorData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const findId=async(req,res)=>{
    const id=req.params.id;
    try{
        let now_AuthorData=await AuthorModel.findById(id);
        return res.status(201).json({
            message:'Get Author',
            data:now_AuthorData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}



const updateAuthor=async(req,res)=>{
    const id=req.params.id;
    const AuthorData=req.body;
    try{
        const now_AuthorData=await AuthorModel.findByIdAndUpdate(id,AuthorData);
        return res.status(201).json({
            message:`succesfully Update `,
            data:now_AuthorData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const deleteAuthor=async(req,res)=>{
    const id=req.params.id;
    try{
        await AuthorModel.findByIdAndDelete(id);
        return res.status(201).json({
            message:"succesfully Deleted Author",
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

module.exports = {
    findAll,
    findId,
    findAuthorName,
    ceateAuthor,
    updateAuthor,
    deleteAuthor,
}
