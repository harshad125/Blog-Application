import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from '../component/Blog'


const Blogs = () => {
  const [blogs,setblogs]=useState([]);
  const sendRequest=async()=>{
    const res=await axios.get("http://localhost:5000/api/blog").catch(err=>console.log(err));
    const data=await res.data;
    console.log(data);
    return data;
  }
  useEffect(()=>{
     sendRequest().then((data)=>setblogs(data.blog));
     console.log(blogs);
  },[])
  return (
    <div>
     {blogs && blogs.map((blog ,index)=>{return <Blog  key={index} isuser={localStorage.getItem('userId')===blog.user._id} id={blog._id} title={blog.title} description={blog.description} imgurl={blog.image} username={blog.user.name} />})}
    </div>
  )
}

export default Blogs
