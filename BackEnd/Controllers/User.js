const UserModel=require('../Models/User');

const ceateUser=async(req,res)=>{
    const userData=req.body;
    const newUser=new UserModel({
        username:userData.username,
        email:userData.email,
        password:userData.password,
        role:userData.role
    });
    try{
        const response=await newUser.save();
        return res.status(201).json({
            message:"Registered successfully",
            data:response
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const createAdmin=async()=>{
    const now_userData=await UserModel.findOne({email:"admin"});
    if(now_userData!=null){
        
    }else{
        const newUser=new UserModel({
            email:"admin@admin.com",
            username:"admin",
            password:"root",
            role:"Admin"
        });
        try{
            const response=await newUser.save();
            return "";
        }catch(error){
            return error;
        }
    }
   return null;
}



const Login=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    try{
        const now_userData=await UserModel.findOne({email:email,password:password});
        if(now_userData==null){
            return res.status(501).json({
                message:'The corresponding user name and password are not found',
            })
        }else{
            return res.status(201).json({
                message:'succesfully Login',
                data:now_userData
            })
        }
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const findEmail=async(req,res)=>{
    const email=req.body.email;
    try{
        const now_userData=await UserModel.findOne({email:email});
        return now_userData;
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const findAll=async(req,res)=>{
    try{
        let now_userData=await UserModel.find();
        return res.status(201).json({
            message:'Get all user information',
            data:now_userData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}


const Register=async(req,res)=>{
    const userData=req.body;
    const now_user=await findEmail(req,res);
    if(now_user!=null){
        return res.status(500).json({
            message: "This email has been registered!",
        })
    }
    const newUser=new UserModel({
        username:userData.username,
        email:userData.email,
        password:userData.password,
        role:"User"
    });

    try{
        const response=await newUser.save();
        return res.status(201).json({
            message:"Registered successfully",
            data:response
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}


const updateUser=async(req,res)=>{
    const id=req.params.id;
    const userData=req.body;
    try{
        const now_userData=await UserModel.findByIdAndUpdate(id,userData);
        return res.status(201).json({
            message:`succesfully Update userName: ${now_userData.username}`,
            data:now_userData
        })
    }catch(error){
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try{
        await UserModel.findByIdAndDelete(id);
        return res.status(201).json({
            message:"succesfully Deleted User",
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
    findEmail,
    createAdmin,
    Login,
    Register,
    ceateUser,
    updateUser,
    deleteUser,
}
