const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name : String,
    age : Number,
    email : String,
    role : {type:String , enum : ["seller","customer"] , default : "customer"},
    password : String
},{
    versionKey : false
})


const userModel = mongoose.model("user", userSchema)


module.exports  =  {userModel}