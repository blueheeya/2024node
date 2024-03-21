const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const {User} = require("./models/User")

const MONGO_URL = "mongodb+srv://blueheeya12:iuGrxChEcp9f2Nel@jojunghee.rpjni1f.mongodb.net/3ndUser?retryWrites=true&w=majority&appName=jojunghee"

const server = async function(){
    // const users =[]
    try {
        await mongoose.connect(MONGO_URL);
        console.log("db connect")
        app.use(express.json()); //json 파일로 볼수 있게 처리

        app.get("/user", async function(req,res){
            try {
                const users = await User.find({})
                return res.send({users})
            } catch(error) {
                return res.status(500).send("유저값이 없습니다.")
            }

        });

        app.get("/user/:userId",async function(req,res){
            try{
                const {userId} = req.params
                const user = await User.findOne({_id:userId});
                return res.send({user});
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
        });

        app.post("/user", async function(req,res){
            try {
                const user = new User(req.body);
                await user.save();
                return res.send({user});
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
        });

        app.delete("/user/:userId", async function(req,res){
            try{
                const {userId} = req.params;
                const user = await User.findByIdAndDelet({_id:userId});
                return res.send({user});
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
        })

        app.listen(3000) //localhost:3000번으로 연결

    } catch(error) {
        console.log("!!!!!db connect error!!!!!")
    }
}
server();