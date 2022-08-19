import mongoose from 'mongoose';
import Blog from '../modules/Blog'
import User from '../modules/User'

export const getAllblog=async(req,res,next)=>{

    let blog;
    try {
        blog=await Blog.find().populate('user');
        if(!blog)
        {
          return  res.status(400).json({message:"blog is not found"})
        }
        return res.status(200).json({blog})
        
    } catch (error) {
        console.log(error);
    }
}

export const addblog=async(req,res,next)=>{
    const {title,description,image,user}=req.body;

    let existinguser;
    try {
        existinguser=await User.findById(user);
        
    } catch (error) {
        console.log(error);
    }
    if(!existinguser)
    {
        return res.status(400).json({message:"user not found"});
    }
    const blog=new Blog({title,description,image,user});
    try {
        const session=await mongoose.startSession();
         session.startTransaction();
        await blog.save({session});
        existinguser.blogs.push(blog);
        await existinguser.save({session});
        await session.commitTransaction();

    } catch (error) {
         console.log(error);
         return res.status(500).json({message:"sorry fail to add blog "});
        
    }
    return res.status(200).json({blog})
}

export const updatablog=async(req,res,next)=>{
    const {title,description}=req.body;
    const blogid=req.params.id
    let blog;
    try {
        blog=await Blog.findByIdAndUpdate(blogid,{title,description});
        
    } catch (error) {
        return console.log(error)
    }
    if(!blog)
    {
        return res.status(500).json({message:"unable to updata data"});
    }
    return res.status(200).json({blog});

}

export const getbyid=async(req,res,next)=>{
    const id=req.params.id
    let blog;
    try {
        blog=await Blog.findById(id);
        
    } catch (error) {
        return console.log(error);
    }
    if(!blog)
    {
        return res.status(404).json({message:"blog not found"})
    }
    return res.status(200).json({blog})
}

export const deleteblog=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try {
        blog=await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        console.log(error);
    }
    if(!blog)
    {
        return res.status(500).json({message:"unable to delete blog"})
    }
    return res.status(200).json({message:"deleted successfully"})
}

export const getuserbyid=async(req,res,next)=>{
    const id=req.params.id;
    let userblog;
    try {
        userblog=await User.findById(id).populate("blogs"); 
    } catch (error) {
        console.log(error)
    }
    if(!userblog)
    {
        return res.status(404).json({message:"user blog was not found"});
    }
    return res.status(200).json({user:userblog})
}