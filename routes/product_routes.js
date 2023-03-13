const {proModel} = require("../models/product_model")
const {authorisation} = require("../middlewares/authorisation")
const express = require("express")

const proRouter = express.Router()


proRouter.get("/products",async(req,res)=>{
    try {
        let pro = await proModel.find()
        res.status(200).send(pro)
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message": "Error in Show Product",
            error
        })
    }
})


proRouter.post("/addproducts",authorisation(["seller"]), async (req, res)=> {

    const payload = req.body

    try {
        const Pro_data = new proModel(payload)
        await Pro_data.save();

        res.status(200).send({
            "message":"Product added Successfully",
            Pro_data
        })

    } catch (error) {

        console.log(error)
        res.status(401).send({
            "message": "Error in add Product",
            error
        })
    }
})



proRouter.delete("/deleteproducts/:id",authorisation(["seller"]), async (req, res)=> {
    const par=req.params.id;
    try {
        await proModel.findByIdAndDelete({ "_id": par })
        res.status(200).send({
            "message": "Product Deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message": "Error in delete Product",
            error
        })
    }
})



module.exports = {proRouter}