const mongoose = require( "mongoose");
const Userschema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum: ["User", "Admin"],
        require:true
    }
});
const UserModel=mongoose.model('User',Userschema);

module.exports=UserModel;