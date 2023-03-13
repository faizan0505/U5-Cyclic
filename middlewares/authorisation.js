
const authorisation =(role)=>{

    return (req,res,next)=>{

        const userrole = req.body.role

        if(role.includes(userrole)){
            next()
        }else{
            res.status(401).send({
                "message":"You are not Authorised"
            })
        }
    }
}


module.exports = { authorisation }