import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginInfo,setLoginInfor]=useState({email:'',password:''});
  const navigate= useNavigate();


  const handleChange=(e)=>{
    const {name,value}=e.target;
    const copyLoginInfo={...loginInfo};
    copyLoginInfo[name]=value;
    setLoginInfor(copyLoginInfo);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {email,password}=loginInfo;
    if(!email || !password){
      return handleError("All fields are required");
    }
    try{
      const url='https://local-technician-finder.onrender.com/auth/login';
      const response = await axios.post(url,loginInfo);
      const result=await response.data;
      const {success,message,jwtToken,userId,name,error}=result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        localStorage.setItem('UserID',userId);
          setTimeout(()=>{
            navigate('/')
          },1000)
      }else if(error){
        const details=error.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
    }catch(err){
        handleError(err);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4">
  <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Login</h1>
    
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="email"
        label="Email"
        name="email"
        value={loginInfo.email}
        placeholder="Enter Email..."
        variant="outlined"
        onChange={handleChange}
        required
        InputLabelProps={{ style: { color: '#ccc' } }}
        InputProps={{ style: { color: 'white' } }}
        sx={{ input: { backgroundColor: '#1f2937', borderRadius: '6px' } }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        name="password"
        value={loginInfo.password}
        placeholder="Enter Password..."
        variant="outlined"
        onChange={handleChange}
        required
        InputLabelProps={{ style: { color: '#ccc' } }}
        InputProps={{ style: { color: 'white' } }}
        sx={{ input: { backgroundColor: '#1f2937', borderRadius: '6px' } }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#06b6d4',
          '&:hover': { backgroundColor: '#0891b2' },
        }}
      >
        Login
      </Button>
    </Box>

    <div className="mt-4 text-center">
      <span className="text-gray-400">Don't have an account? </span>
      <Link to="/signup" className="text-cyan-400 underline hover:text-cyan-300">Register</Link>
    </div>

    <ToastContainer />
  </div>
</div>

  )
}
export default Login