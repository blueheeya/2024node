const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { userRouter } = require('./routers/userRouter.js');
const { blogRouter } = require('./routers/blogRouter.js');
const { commentRouter } = require('./routers/commentRouter.js');

dotenv.config();
//process.env.MONGO_URL


// let result = mongoose.connect(MONGO_URL); //promise

// mongoose.connect(MONGO_URL).then(function(result){
//   return console.log(result);
// });

async function server() {
  try {
    await mongoose.connect(process.env.MONGO_URL); //promise
    console.log("db connected");
    mongoose.set("debug",true); //2024.03.21 추가 사항
    app.use(express.json()) //json 언어로 변경하기
    app.use("/user",userRouter)
    app.use("/blog",blogRouter)
    app.use("/blog/:blogId/comment",commentRouter)
    

    app.listen(3000)
  } catch (error) {
    console.log("잘못 연결")
  }
}
server();