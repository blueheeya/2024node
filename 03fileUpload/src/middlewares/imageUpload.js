const multer = require("multer");
const {v4:uuid} = require("uuid");
const mime = require("mime-types");

//1st
// const upload = multer({dest:"uploads"});

// 2nd
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(rea,file,cb){
        cb(null,uuid() +"."+mime.extension(file.mimetype));
    }
}) 
const upload = multer({
    storage:storage,
    fileFilter: function(req,file,cb){
        // if(file.mimetype === "image/png" || file.mimetype ==="image/jpeg"){
        //     cb(null,true)
        // }else{
        //     cb(new Error("png/jpg만 업로드 가능"),false)
        // }
        if(["image/png","image/jpg"].includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("png/jpg만 업로드 가능"),false)
        }
    },
    limits:{
        fileSize : 1024 * 1024 *3
    }
})

module.exports = {upload}