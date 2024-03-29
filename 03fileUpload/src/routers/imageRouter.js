const {Router} = require("express");
const imageRouter = Router();
const {Image} = require("../models/Image");
const {upload} = require("../middlewares/imageUpload");

//singfile upload
imageRouter.post("/",upload.single("image"),async function(req,res){
    try {
        console.log (req.file);
        const image = await new Image({
            filename:req.file.filename,
            originalFileName:req.file.originalname,
            title:req.body.title
        }).save();
        return res.send({image});
    } catch(error) {
        return res.status(500).send({error:error.message})
    }
})

//multy file
imageRouter.post("/",upload.array("images"),async function(req,res){
    try {
        const {title,content} = req.body;
        const images = [];
        req.file.forEach(function(item){
            images.push({
                originalFileName:req.file.originalname,
                filename:req.file.filename
            })
        });
        const image = await new Image({
            ...req.body.images
        }).save();
        console.log(images);
        return res.send({image});
    } catch(error) {
        return res.status(500).send({error:error.message})
    }
})

module.exports = {imageRouter};
