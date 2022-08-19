import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from '../component/Blog'

const Userblog = () => {
  const id=localStorage.getItem("userId");
  const[user,setusers]=useState([])
  const sendRequest=async()=>{
       const res= await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err)=>console.log(err));
       const data=await res.data;
       console.log(data)
       return data;


  }
  useEffect(()=>{
    sendRequest().then((data)=>setusers(data.user));
  },[]);
  console.log(user)
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog ,index)=>{return <Blog key={index} id={blog._id} isuser={true} title={blog.title} description={blog.description} imgurl={blog.image} username={user.name}/>})}
      
    </div>
  )
}

export default Userblog
