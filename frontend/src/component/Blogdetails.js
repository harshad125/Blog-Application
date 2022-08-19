import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const laystyle={mb:1 , mt:2 , fontWeight:"bold" ,fontSize:"24px" }
const Blogdetails = () => {
  const navigate=useNavigate();
  const[input,setinput]=useState({})
  const handlechange=(e)=>{
       setinput((prevState)=>({
          ...prevState,
        [e.target.name]:e.target.value
       }))
  }
  const[blog,setblog]=useState();
 const id= useParams().id;
 console.log(id)
 const fetchdetails=async()=>{
    const res =await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
    const data=await res.data
    return data;
 }
 useEffect(()=>{
    fetchdetails().then((data)=>{
      setblog(data.blog)
      setinput({
        title:data.blog.title,
        description:data.blog.description,
      })
    })
 },[id])

 const sendRequest=async()=>{
    const res=await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:input.title,
      description:input.description
    }).catch(err=>console.log(err))

    const data=await res.data;
    return data;
 }

 const handlesubmit=(e)=>{
  e.preventDefault();
  console.log(input)
  sendRequest().then((data)=>console.log(data)).then(()=>navigate('/myblogs/'));
}
 console.log(blog);
  return (
    <div>
      {input && 
       <form onSubmit={handlesubmit}>
        <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc" display="flex" flexDirection="column" padding={3} margin="auto" marginTop={3} width={"80%"}>
          <Typography variant='h2' textAlign={"center"} fontWeight="bold" padding={3} color="gray">Post your blog </Typography>
            <InputLabel sx={laystyle}>title</InputLabel>
            <TextField margin='normal' variant='outlined' name="title" value={input.title} onChange={handlechange}/>
            <InputLabel sx={laystyle}>description</InputLabel>
            <TextField margin='normal' variant='outlined' name="description" value={input.description} onChange={handlechange}/>
            <Button variant='contained' sx={{borderRadius:4,mt:2,width:"100px"}} color="warning" type='submit'>submit</Button>
        </Box>
      </form>
      }
      
    </div>
  )
}

export default Blogdetails
