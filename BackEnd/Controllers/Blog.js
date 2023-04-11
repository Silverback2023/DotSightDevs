const BlogModel=require('../Models/Blog');

const ceateBlog=async(req,res)=>{
    const BlogData=req.body;
    const photoBuffer = req?.file?.buffer
    const base64Photo = Buffer.from(photoBuffer).toString('base64')
    const newBlog=new BlogModel({
        title:BlogData.title,
        image:base64Photo,
        description:BlogData.description,
        aid:BlogData.aid
    });
    try{
        const response=await newBlog.save();
        return res.status(201).json({
            message:"Blog add success",
            data:response
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}


const findTitle=async(req,res)=>{
    const title=req.params.title;
    try{
        var str=".*"+title+".*$"
        var reg = new RegExp(str)
        const now_BlogData=await BlogModel.find({"title":{$regex:reg,$options:'i'}});
        return res.status(201).json({
            message:'The fuzzy query title succeeded',
            data:now_BlogData
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
        let now_BlogData=await BlogModel.findById(id);
        return res.status(201).json({
            message:'Gets the blog information for the current id number',
            data:now_BlogData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const findAll=async(req,res)=>{
    try{
        let now_BlogData=await BlogModel.find();
        return res.status(201).json({
            message:'Get all Blog information',
            data:now_BlogData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}



const updateBlog=async(req,res)=>{
    const id=req.params.id;
    const BlogData=req.body;
    const photoBuffer = req?.file?.buffer
    const base64Photo = Buffer.from(photoBuffer).toString('base64');
    BlogData.image=base64Photo;
    try{
        const now_BlogData=await BlogModel.findByIdAndUpdate(id,BlogData);
        return res.status(201).json({
            message:`succesfully Update Blog Title: ${now_BlogData.title}`,
            data:now_BlogData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const deleteBlog=async(req,res)=>{
    const id=req.params.id;
    try{
        await BlogModel.findByIdAndDelete(id);
        return res.status(201).json({
            message:"succesfully Deleted Blog",
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
    findTitle,
    ceateBlog,
    updateBlog,
    deleteBlog,
}
