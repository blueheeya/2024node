const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
//imageUpload로 이동
// const multer = require("multer");
// const {v4:uuid} = require("uuid");
// const mime = require("mime-types");
const {upload} = require("./middlewares/imageUpload");

dotenv.config(); 

const server = async function(){
    try {
        console.log("DB 연결 성공");
        await mongoose.connect(process.env.MONGO_URL);
        app.use(express.json());

        app.post("/upload",upload.single("image"),function(req,res){
            try {
                console.log(req.file);
                return res.send(req.file);
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
        });
        app.listen(3000);
    } catch(error) {
        console.log("연결 실패");
    }
};
server();