
import './App.css';
import Header from './component/Header';
import Login from './component/Login';
import Blogs from './component/Blogs';
import Blogdetails from './component/Blogdetails';
import Addblog from './component/Addblog';
import Userblog from './component/Userblog';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { authaction } from './store';

function App() {
  const isLoggedIn=useSelector((state)=>state.isLoggedIn);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('userId'))
    {
      dispatch(authaction.login())
    }
  },[dispatch]);
  return (
    <React.Fragment>
      <header>
        <Header></Header>
      </header>
      <main>
        <Routes>
         {!isLoggedIn ?  <Route path='/login' element={<Login/>}></Route>:<>
          <Route path='/blogs' element={<Blogs/>}></Route>
          <Route path='/blogs/add' element={<Addblog/>}></Route>
          <Route path='/myblogs' element={<Userblog/>}></Route>
          <Route path='/myblogs/:id' element={<Blogdetails/>}></Route>
          </>
          }
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
