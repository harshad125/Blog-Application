import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { authaction } from '../store';
import {useNavigate} from 'react-router-dom'

const Login = () => {
 const navigate= useNavigate();
  const dispatch=useDispatch();
  const[issign,setsign]=useState(false);
  const[input,setinput]=useState({
    name:"",
    email:"",
    password:""
  })
  const handlechange=(e)=>{
       setinput((prevState)=>({
          ...prevState,
        [e.target.name]:e.target.value
       }))
  }
  const sendrequiest=async(type="login")=>{
   const res=await axios.post(`http://localhost:5000/api/user/${type}`,{
       name:input.name,
       email:input.email,
       password:input.password
     }).catch(err=>console.log(err))

    const data=await res.data;
    return data;
  }
  const handlesubmit=(e)=>{
     e.preventDefault();
     console.log(input);
     if(issign)
     {
      sendrequiest("signup").then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authaction.login())).then(()=>navigate("/blogs")).then((data)=>console.log(data));
     }
     else{
      sendrequiest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authaction.login())).then(()=>navigate("/blogs")).then((data)=>console.log(data));
     }
      
  }
  return (
    <div>
       <form onSubmit={handlesubmit}>
         <Box width={400} display="flex" flexDirection={'column'} justifyContent="center" alignItems={'center'} boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={5} borderRadius={5}>
          <Typography variant="h3" textAlign={'center'} padding={3}>{!issign?"Login":"Signup"}</Typography>
         {issign &&  <TextField name="name" onChange={handlechange} value={input.name} margin="normal" id="outlined-basic" label="Name" variant="outlined" />}
          <TextField name="email" onChange={handlechange}
          value={input.email} margin="normal" id="outlined-basic" label="Email" variant="outlined" /> 
          <TextField name="password" onChange={handlechange}
           value={input.password}  margin="normal" id="outlined-basic" label="Password" variant="outlined" />
          <Button type="submit" variant='contained' sx={{borderRadius:3 ,marginTop:3}} color="warning">submit</Button>
         <Button onClick={()=>setsign(!issign)} sx={{marginTop:3}}>change to {issign?"Login":"signup"}</Button>        
        </Box>
       </form>
    </div>
  )
}

export default Login
