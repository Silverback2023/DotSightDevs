const mongoose = require( "mongoose");
const Authorschema = mongoose.Schema({
   name:{
    type:String,
    require:true
   },
});

const AuthorModel=mongoose.model('Author',Authorschema);
module.exports=AuthorModel;