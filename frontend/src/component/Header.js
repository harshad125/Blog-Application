import React, { useState } from 'react'
import {AppBar, Button, Toolbar, Typography,Box, Tabs,Tab} from '@mui/material'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { authaction } from '../store'

const Header = () => {
    const dispatch=useDispatch();
    const [value,setvalue]=useState();
    const isLoggedIn=useSelector((state)=>state.isLoggedIn);
  return (
    <AppBar position="sticky" sx={{background:" linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(86,32,163,0.9475140397956058) 35%, rgba(0,212,255,1) 100%)"}}>
        <Toolbar>
            <Typography variant='h4'>Blogapp</Typography>
           { isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
                <Tabs textColor="inherit" value={value} onChange={(e,val)=>setvalue(val)}>
                    <Tab LinkComponent={Link} to="/myblogs" label="My blogs"/>
                    <Tab LinkComponent={Link} to="/blogs" label="All blogs"/>
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add blog"/>
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
               {!isLoggedIn && <> <Button LinkComponent={Link} to="/login" variant="contained" sx={{margin:1,borderRadius:10}} color='warning'>Login</Button>
                <Button LinkComponent={Link} to="/login" variant="contained" sx={{margin:1,borderRadius:10}} color='warning'>Singnup</Button> </>}
               { isLoggedIn && <Button onClick={()=>dispatch(authaction.logout())} LinkComponent={Link} to="/login" variant="contained" sx={{margin:1,borderRadius:10}} color='warning'>Logout</Button> }
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header
