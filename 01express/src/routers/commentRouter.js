const { Router } =require("express");
const { Blog } = require("../model/Blog");
const { User } = require("../model/User");
const { Comment } = require("../model/Comment");
const { default: mongoose } = require("mongoose");
const commentRouter = Router({mergeParams:true});
commentRouter.post("/",async function(req,res){
    try {
        const {blogId} = req.params;
        const {content, userId} = req.body;
        
        const [blog,user] = await Promise.all([
            Blog.findOne({_id : blogId}),
            User.findOne({_id : userId})
        ]);
        // const blog = await Blog.findOne({_id : blogId});
        // const user = await User.findOne({_id : userId});
        if(!blog || !user){
            return res.status(400).send({error:"블로그와 유저를 찾을수가 없습니다.",blogId,userId,content});
        }
        const comment = new Comment({content,user,blog});
        await comment.save();
        
        return res.send({comment});
        // return res.send({blogId,userId,content});

    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});

commentRouter.get("/", async function(req,res){
    try{
        const {blogId} = req.params;
        const comment = await Comment.find({blog:blogId});
        return res.send({comment});
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});

commentRouter.get("/:commentId",async function(req,res){
    try{
        const {commentId} = req.params;
        const comment = await Comment.findOne({_id:commentId})
        return res.send({ comment })
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});

// commentRouter.delete("/:commentId",async function(req,res){
//     try {
//         let {commentId} = req.params;
//         if(!mongoose.isValidObjectId(commentId)){
//             return res.status(400).send({error:"등록된 코멘트가 없습니다."})
//         }
//         const comment = await Comment.findByIdAndDelete({_id:commentId});
//         return res.send({comment});
//     } catch(error) {
//         return res.status(500).send({error:error.message});
//     }
// });

// commentRouter.put("/:commentId",async function(req,res){
//     try {
//         let {commentId} = req.params;
//         const {content,user} = req.body

//         const comment =  await Comment.findByIdAndUpdate(
//             commentId,
//             {content,user},
//             {new:true});
//         return res.send({comment});
//     } catch(error) {
//         return res.status(500).send({error:error.message});
//     }
// });
module.exports = {commentRouter};