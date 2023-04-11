const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, (error) =>
{ 
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("connected to database");
    }
})

module.exports = mongoose.connection; 
