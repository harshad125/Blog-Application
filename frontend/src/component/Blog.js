import React from 'react'
import { Card ,CardHeader, Avatar,CardMedia,CardContent,Typography, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Blog = (props) => {
    const {id,title,description,imgurl,username,isuser}=props
    console.log(id);
    const navigate=useNavigate();
    const handleedit=(e)=>{
        navigate(`/myblogs/${id}`);
    }
    
    const deleteReq=async()=>{
       const res=await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
       const data=await res.data  
       return data;  
    }
    const handledelete=(e)=>{
        deleteReq().then(()=>navigate('/')).then(()=>navigate('/blogs/'));
    }
    return (
        <div>
            <Card sx={{ width:"40%",margin:"auto",mt:2,padding:2,boxShadow:"5px 5px 20px #ccc",":hover":{boxShadow:"10px 10px 20px #ccc"} }}>
                {isuser && (<Box display="flex">
                    <IconButton onClick={handleedit} sx={{marginLeft:"auto"}}><EditIcon/></IconButton>
                    <IconButton onClick={handledelete}><DeleteIcon/></IconButton>
                </Box>)}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                            {username.charAt(0)}
                        </Avatar>
                    }
                    title={title}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imgurl}
                    alt="Paella dish"
                />
                <CardContent>
                    <hr/>
                    <br/>
                    <Typography variant="body2" color="text.secondary">
                       <b>{username}</b> {":"} {description}
                    </Typography>
                </CardContent>

            </Card>


        </div>
    )
}

export default Blog
