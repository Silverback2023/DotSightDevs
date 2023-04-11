const mongoose = require( "mongoose");
const Blogschema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    image:{
        type:String,
    },
    description:{
        type:String,
        require:true
    },
    aid:{
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        required: true          
    }
});

const BlogModel=mongoose.model('Blog',Blogschema);
module.exports=BlogModel;