const express = require('express')
const app = express()
const mongoose = require("mongoose")
const {User} =  require("./model/User.js")
const dotenv = require("dotenv")
dotenv.config()
//prose


// let result = mongoose.connect(MONGO_URL); //promise

// mongoose.connect(MONGO_URL).then(function(result){
//   return console.log(result);
// });

const server = async function(){ //async를 붙혀서 promise로 만들어주지만 성공 값만 출력됨 -> try catch문으로 성공과 실패를 구분지어 나눠준다
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected")
    app.use(express.json()); //json 언어로 변경하기
  
    app.get("/user",async function(req,res){
      //1
      // return  res.send({user:users});

      //2
      try{
        const users = await User.find({});
        return res.send({users});
      }catch(error){
        return res.status(500).send({error:error.message});
      }

    });
    
    app.post("/user",async function(req,res){
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
      let {username, name} = req.body;
      if(!username) {
        return res.status(400).send({error:"이름이 없네요!!!"});
      }
      if(!name || !name.first || !name.last){
        return res.status(400).send({error:"성/이름이 없네요!!!"});
      }
  
      const user = new User(req.body);
      await user.save();
      res.send({user});
    } catch (error){
      return res.status(500).send({error:error.message});
    }
    

    });
    app.listen(3000);
  } catch(error) {
    console.log("잘못 연결");
  }
}
server();