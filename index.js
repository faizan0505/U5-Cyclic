const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user_routes")
const{proRouter} = require("./routes/product_routes")
const {authentication} = require("./middlewares/authentication")


const app = express()
app.use(express.json())

app.use("/",userRouter)
app.use(authentication)
app.use("/",proRouter)


app.listen("3500",async()=>{
    try {
        await connection;
        console.log("DB connected, Server is Listening at Port 3500")
    } catch (error) {
        console.log("DB error in Connection")
    }
})