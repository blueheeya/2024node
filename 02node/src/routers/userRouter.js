const {Router} = require("express");
const { default: mongoose } = require("mongoose");
const {User} = require("../models/User");
const userRouter = Router();


userRouter.get("/", async function(req,res){
    try {
        const users = await User.find({})
        return res.send({users})
    } catch(error) {
        return res.status(500).send("유저값이 없습니다.")
    }

});

userRouter.get("/:userId",async function(req,res){
    try{
        const {userId} = req.params
        const user = await User.findOne({_id:userId});
        return res.send({user});
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});

userRouter.post("/", async function(req,res){
    try {
        const user = new User(req.body);
        await user.save();
        return res.send({user});
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});

userRouter.delete("/:userId", async function(req,res){
    try{
        let {userId} = req.params;

        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).send({error:"유저가 없습니다."})
        }
        const user = await User.findByIdAndDelete({_id:userId});
        return res.send({user});
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
})

userRouter.put("/:userId", async function(req,res){
    try {
        let{userId} = req.params;
        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).send({error: "유저가 없습니다."});
        }

        let {username,name,email} = req.body;
        

        //나이값 변경 숫자체크
        let {age} = req.body;
        if(!age) {
            return res.status(400).send({error:"나이가 없네요"});
        }
        if(typeof age !== "number"){
            return res.status(400).send({error:"숫자로만 입력해 주세요!"});
        }
        const user = await User.findByIdAndUpdate(userId,{$set :{username,name,email,age}},{new:true})
        // const user = await User.findByIdAndUpdate(userId,{$set : {age}},{new:true})

        return res.send({user})
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
})

module.exports = {userRouter};