const express = require('express')
const app = express()
const mongoose = require("mongoose")
const {User} = require("./model/User.js")
const dotenv = require("dotenv");

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
    app.get("/user", async function (req, res) {
      //1
      // return  res.send({user:users});
      //2
      try {
        const users = await User.find({})
        return res.send({ users })
      } catch (error) {
        return res.status(500).send({ error: error.message })
      }

    })

    app.post("/user", async function (req, res) {
      //  users.push({name:"홍길동",age:30})
      //01
      // users.push({
      //   name:req.body.name,
      //   age:req.body.age,
      // })
      //  return res.send({success: true});
      // 02
      // let username = req.body.username
      // let name = req.body.name
      //=>한 줄로 let{username,name} = req.body
      try {
        let { username, name } = req.body
        if (!username) {
          return res.status(400).send({ error: "이름이 없네요!!!" })
        }
        if (!name || !name.first || !name.last) {
          return res.status(400).send({ error: "성/이름이 없네요!!!" })
        }

        const user = new User(req.body)
        await user.save()
        res.send({ user })
      } catch (error) {
        return res.status(500).send({ error: error.message })
      }


    })

    app.delete("/user/:userID", async function(req,res){
      try{
      // let userID =  req.params.userID;
      let {userID} =  req.params;
      
      if(!mongoose.isValidObjectId(userID)){
        return res.status(400).send({ error: "유저가 없네요" })
      }

      const user = await User.findByIdAndDelete({_id:userID})
      return res.send({user});
      } catch(error){
        return res.status(500).send({ error: error.message })
      }
    })

    app.listen(3000)
  } catch (error) {
    console.log("잘못 연결")
  }
}
server();