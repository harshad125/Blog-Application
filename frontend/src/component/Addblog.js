import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React ,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const laystyle={mb:1 , mt:2 , fontWeight:"bold" ,fontSize:"24px" }
const Addblog = () => {
  const navigate=useNavigate();
  const[input,setinput]=useState({
    title:"",
    description:"",
    imageURL:""
  })
  const handlechange=(e)=>{
       setinput((prevState)=>({
          ...prevState,
        [e.target.name]:e.target.value
       }))
  }
  const sendRequest=async()=>{
    const res=await axios.post("http://localhost:5000/api/blog/add",{
      title:input.title,
      description:input.description,
      image:input.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err));
    const data=await res.data;
    return data;
  }
  const handlesubmit=(e)=>{
    e.preventDefault();
    sendRequest().then(()=>navigate('/blogs/'));

  }
  
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc" display="flex" flexDirection="column" padding={3} margin="auto" marginTop={3} width={"80%"}>
          <Typography variant='h2' textAlign={"center"} fontWeight="bold" padding={3} color="gray">Post your blog </Typography>
            <InputLabel sx={laystyle}>title</InputLabel>
            <TextField margin='normal' variant='outlined' name="title" value={input.title} onChange={handlechange}/>
            <InputLabel sx={laystyle}>description</InputLabel>
            <TextField margin='normal' variant='outlined' name="description" value={input.description} onChange={handlechange}/>
            <InputLabel sx={laystyle}>imageURL</InputLabel>
            <TextField margin='normal' variant='outlined' name="imageURL" value={input.imageURL} onChange={handlechange}/>
            <Button variant='contained' sx={{borderRadius:4,mt:2,width:"100px"}} color="warning" type='submit'>submit</Button>
        </Box>
      </form>
      
    </div>
  )
}

export default Addblog
