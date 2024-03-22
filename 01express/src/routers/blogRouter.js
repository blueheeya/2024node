const {Router} = require("express");
const { default: mongoose } = require("mongoose");
const {Blog} = require("../model/Blog");
const { User } = require("../model/User");
const blogRouter = Router();

blogRouter.post("/",async function(req,res){
    try{
      const {title,content,islive,userId} = req.body;

      let user = await User.findById(userId);
      if(!user){
        return res.status(400).send({error:"유저가 없어요!!!"})
      }

      let blog = new Blog({...req.body,user}); //... 딥카피
      await blog.save();
      return res.send({blog});
    
    } catch (error) {
        return res.status(500).send({ error: error.message })
      }

})
blogRouter.get("/",async function(req,res){
    try{
      const blogs = await Blog.find({});
      return res.send({ blogs })
    
    } catch (error) {
        return res.status(500).send({ error: error.message })
      }

})
blogRouter.get("/:blogId",async function(req,res){
    try{
      const {blogId} = req.params;
      const blog = await Blog.findOne({_id:blogId})
      return res.send({ blog })
    } catch (error) {
        return res.status(500).send({ error: error.message })
      }

})
blogRouter.delete("/:blogId",async function(req,res){
    try{
      let {blogId} = req.params;

      if(!mongoose.isValidObjectId(blogId)){
        return res.status(400).send({error:"등록된 게시글이 없네요"})
      }

      const blog = await Blog.findByIdAndDelete({_id:blogId});
      return res.send({blog});
    } catch (error) {
        return res.status(500).send({ error: error.message })
      }
})
blogRouter.put("/:blogId",async function(req,res){
    try{
      let {blogId} = req.params;
      const {title,content} = req.body

      const blog =  await Blog.findByIdAndUpdate(
        blogId,
        {title,content},
        {new:true});
      return res.send({blog});

      // let {blogId} = req.params;
      // if(!mongoose.isValidObjectId(blogId)){
      //   return res.status(400).send({error : "등록된 게시글이 없네요!!"})
      // }

      // let {title} = req.body;
      // if (!title){
      //   return res.status(400).send({error : "제목이 없네요! 제목을 입력해주세요!"})
      // }
      // const blog = await Blog.findByIdAndUpdate(
      //   blogId,
      //   {$set : {title}},
      //   {new:true}
      // )
    
    } catch (error) {
        return res.status(500).send({ error: error.message })
      }
})
blogRouter.patch("/:blogId/live",async function(req,res){
  try{
    const {blogId} = req.params;
    const {islive} = req.body;

    const blog = await Blog.findByIdAndUpdate(blogId,{islive},{new:true})
    return res.send({blog})

  
  } catch (error) {
      return res.status(500).send({ error: error.message })
    }
})


module.exports = {blogRouter};