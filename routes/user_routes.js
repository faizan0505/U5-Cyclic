const fs = require("fs")
const express = require("express")
const {userModel} = require("../models/user_model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const userRouter = express.Router()

userRouter.post("/signup", async(req,res)=>{
    const {name,age,email,role,password} = req.body;
    try {
        bcrypt.hash(password, 3 , async function(err,hashed){
            if(err){
                res.status(401).send({
                    "message":"Sign-Up Error",
                    err
                })
            }
            const New_User = new userModel({name,age,email,role,password:hashed})
            await New_User.save()
            res.status(200).send({
                "message":"Sign-Up Successfully",
                New_User
            })
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message":"Sign-Up Error",
            error
        })
    }
})



userRouter.post("/login",async(req,res)=>{
    const{email,password} =  req.body;
    try {
        const find_user =  await userModel.find({email})
        if(find_user.length>0){
            bcrypt.compare(password,find_user[0].password,  function(err,result){
                if(result){
                    const token = jwt.sign({"role":find_user[0].role}, "normal", {expiresIn:60})
                    const refreshToken = jwt.sign({"role":find_user[0].role}, "refresh", {expiresIn:300})
                    res.status(200).send({
                        "message":"Log-In Successfully",
                        token , refreshToken
                    })
                }else{
                    res.status(401).send({
                        "message":"Wrong Credentials - Incorrect Password"
                    })
                }
            })
        }else{
            res.status(401).send({
                "message":"Wrong Credentials - Incorrect E-Mail"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message":"Log-In Error",
            error
        })
    } 
})


userRouter.get("/newToken",(req,res)=>{
    const token = req.headers.authorization;
    try {
        if(token){
            const decoded = jwt.verify(token,"refresh");
            if(decoded){
                const New_token = jwt.sign({"role":decoded.role}, "normal", {expiresIn:60})
                    res.status(200).send({
                        "message":"Again Log-In Successfull",
                        New_token
                    })
            }else{
            res.status(401).send({
                "message":"Please Log-In first - Refresh JWT Expired"
            })
        }
        }else{
            res.status(401).send({
                "message":"Please Log-In first"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message":"Refresh Token Error",
            error
        })
    }
})



userRouter.get("/logout",(req,res)=>{
    const token = req.headers.authorization;
    try {
        if(token){
            const blackData = JSON.parse(fs.readFileSync("./Blacklisted_Token.json","utf-8"))
            blackData.push(token)

            fs.writeFileSync("./Blacklisted_Token.json",JSON.stringify(blackData))

            res.status(200).send({
                "message":"Log-Out Successfull"
            })
        }else{
            res.status(401).send({
                "message":"Please Log-In first"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message":"Logout Error",
            error
        })
    }
})


module.exports = {userRouter}