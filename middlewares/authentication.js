const fs = require("fs")

const jwt = require("jsonwebtoken")


const authentication = (req,res,next)=>{
    const token = req.headers.authorization;

    try {
        if(token){
            const blackData = JSON.parse(fs.readFileSync("./Blacklisted_Token.json","utf-8"))
            if(blackData.includes(token)){
                res.status(401).send({
                    "message":"Please Log-In first"
                })
            }
            const decoded = jwt.verify(token,"normal");
            if(decoded){
                req.body.role = decoded.role;
                next()
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
            "message":"Please Log-In First",
            error
        })
    }
}


module.exports = {authentication}