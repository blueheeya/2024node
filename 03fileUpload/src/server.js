const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
//imageUpload로 이동
// const multer = require("multer");
// const {v4:uuid} = require("uuid");
// const mime = require("mime-types");
const {upload} = require("./middlewares/imageUpload");
const { User } = require("./routers/");
const { imageRouter } = require("./routers/imageRouter");
dotenv.config(); 

const server = async function(){
    try {
        console.log("DB 연결 성공");
        await mongoose.connect(process.env.MONGO_URL);
        app.use(express.json());
        app.use("/upload",imageRouter);
        app.listen(3000);
    } catch(error) {
        console.log("연결 실패");
    }
};
server();