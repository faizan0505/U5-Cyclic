const mongoose = require("mongoose")


const proSchema = mongoose.Schema({
    Product_Name : String,
    Qty : Number,
    Product_Details : String,
    Price : Number
},{
    versionKey : false
})


const proModel = mongoose.model("product", proSchema)


module.exports  =  {proModel}