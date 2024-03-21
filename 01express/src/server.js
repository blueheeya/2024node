const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { userRouter } = require('./routes/userRouter.js');

dotenv.config();
//process.env.MONGO_URL


// let result = mongoose.connect(MONGO_URL); //promise

// mongoose.connect(MONGO_URL).then(function(result){
//   return console.log(result);
// });

async function server() {
  try {
    await mongoose.connect(process.env.MONGO_URL); //promise
    console.log("db connected")
    app.use(express.json()) //json 언어로 변경하기

    app.use("/user",userRouter)
    

    app.listen(3000)
  } catch (error) {
    console.log("잘못 연결")
  }
}
server();