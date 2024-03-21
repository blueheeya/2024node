const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const {userRouter} = require("./routers/userRouter")
// const {User} = require("./models/User") //userRouter로 뺄때 옮겨줘야함

dotenv.config();
//process.env.MONGO-URL

const server = async function(){
    // const users =[]
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connect")
        app.use(express.json()); //json 파일로 볼수 있게 처리
        app.use("/user",userRouter)

       

        app.listen(3000) //localhost:3000번으로 연결

    } catch(error) {
        console.log("!!!!!db connect error!!!!!")
    }
}
server();