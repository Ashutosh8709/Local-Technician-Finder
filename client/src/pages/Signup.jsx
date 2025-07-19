import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate=useNavigate();
  const [signupInfo,setSignupInfo]=useState({name:'',email:'',password:'',phone:'',address:''});
  
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    const copySignupInfo={...signupInfo};
    copySignupInfo[name]=value;
    setSignupInfo(copySignupInfo);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password,phone,address}=signupInfo;
    if(!name || !email || !password || !phone || !address){
      return handleError('All field are required');
    }
    try{
      const url='https://local-technician-finder.onrender.com/auth/signup';
      const response = await axios.post(url,signupInfo);
      const result=await response.data;
      const {success,message,error}=result;
      if(success){
        handleSuccess(message);
          setTimeout(()=>{
            navigate('/login')
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
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
  <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md'>
    <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>Sign Up</h1>
    
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField label="Name" name='name' value={signupInfo.name} onChange={handleChange} placeholder="Enter Name..." variant="outlined" required />
      <TextField label="Email" name='email' value={signupInfo.email} onChange={handleChange} placeholder="Enter Email..." variant="outlined" required />
      <TextField label="Password" type='password' name='password' value={signupInfo.password} onChange={handleChange} placeholder="Enter Password..." variant="outlined" required />
      <TextField label="Phone" name='phone' value={signupInfo.phone} onChange={handleChange} placeholder="Enter Phone Number..." variant="outlined" required />
      <TextField label="Address" name='address' value={signupInfo.address} onChange={handleChange} placeholder="Enter Address..." variant="outlined" required />
      <Button type='submit' variant="contained" fullWidth>Signup</Button>
    </Box>

    <p className='text-sm text-center mt-4'>
      Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link>
    </p>
  </div>
  <ToastContainer />
</div>

  )
}

export default Signup