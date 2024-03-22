const {Router} = require("express");
const { default: mongoose } = require("mongoose");
const {User} = require("../model/User");
const userRouter = Router();

userRouter.get("/", async function (req, res) {
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
userRouter.post("/", async function (req, res) {
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

  userRouter.delete("/:userId", async function(req,res){
    try{
    // let userId =  req.params.userId;
    let {userId} =  req.params;
    
    if(!mongoose.isValidObjectId(userId)){
      return res.status(400).send({ error: "유저가 없네요" })
    }

    const user = await User.findByIdAndDelete({_id:userId})
    return res.send({user});
    } catch(error){
      return res.status(500).send({ error: error.message })
    }
  })

  // userRouter.put("",function(){})
  userRouter.put("/:userId",async function(req,res){
    try {
      let {userId} = req.params;
      if(!mongoose.isValidObjectId(userId)){
        return res.status(400).send({ error: "유저가 없네요" })
      }

      let {age} = req.body;
      //age velue 확인
      if(!age){
        return res.status(400).send({ error: "나이가 없네요" })
      } 
      if(typeof age !== "number"){
        return res.status(400).send({ error: "숫자를 입력해 주세요"})
      }
      const user = await User.findByIdAndUpdate(
        userId,
        {$set : {age}},
        {new:true}
      );

      //여러개 
      // let{username,email} = req.body;
      // const user = await User.findByIdAndUpdate(
      //   userId,
      //   {$set : {username,email}},
      //   {new:true}// 화면에서 바로 반영
      // );


        return res.send({user})
    } catch(error){
      return res.status(500).send({ error: error.message })
    }
  })

  module.exports = {userRouter};