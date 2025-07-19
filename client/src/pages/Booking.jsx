import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state;
    useEffect(() => {
        if (!data || !data.selectedTechnician) {
            navigate('/', { replace: true });
        }
}, [data]);

if (!data || !data.selectedTechnician) {
  return (
    <div className="text-white flex justify-center items-center h-screen">
      <p>No technician selected. Redirecting...</p>
    </div>
  );
}
    const [slots, setSlots] = useState({date:'',timeSlot:''});

    const handleChange=(e)=>{
        const {name,value}=e.target;
        const copyslots={...slots};
        copyslots[name]=value;
        setSlots(copyslots);
    }
    const techid=data.selectedTechnician._id;
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!slots.date || !slots.timeSlot) {
            handleError("Please select both date and time slot.");
            return;
        }
        const matchingSlot = data.selectedTechnician.availableSlots.find(slot => {
        const dateObj = new Date(slot);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
        return date === slots.date && time === slots.timeSlot;
        });
        try{
            const res = await axios.post("http://localhost:8080/booking", {
                userId:data.userId,
                technicianId:techid,
                slot: matchingSlot // full ISO slot to be removed
            });
            const {success,message,error}=res.data;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/');
                },1000);
            }
            else if(!success){
                handleError(message);
            }
            else if(error){
                handleError(message)
            }

        }catch(err){
            handleError("booking failed",err);
        }
        }

    const filteredTimes = data.selectedTechnician.availableSlots.filter(slot => {
    const dateObj = new Date(slot);
    const date = dateObj.toLocaleDateString();
    return date === slots.date;
    });
    const uniqueDates = [
  ...new Set(data.selectedTechnician.availableSlots.map(slot => {
    const dateObj = new Date(slot);
    return dateObj.toLocaleDateString();
  }))
];

    

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Booking Slots for: <span className="text-indigo-600">{data.selectedTechnician.name}</span>
      </h1>

      <form className="space-y-6">
        {/* First Dropdown */}
        <div>
          <FormControl fullWidth>
            <InputLabel id="select-label-1">Select Date</InputLabel>
            <Select
              labelId="select-label-1"
              id="select-1"
              name='date'
              value={slots.date}
              label="Select Option 1"
              onChange={handleChange}
              sx={{ borderRadius: 2, backgroundColor: "#f9fafb" }}
            >
                {uniqueDates.map((date, index) => (
                    <MenuItem key={index} value={date}>{date}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        {/* Second Dropdown */}
        <div>
          <FormControl fullWidth>
            <InputLabel id="select-label-2">Select Time</InputLabel>
            <Select
              labelId="select-label-2"
              id="select-2"
              name='timeSlot'
              value={slots.timeSlot}
              label="Select Option 2"
              onChange={handleChange}
              sx={{ borderRadius: 2, backgroundColor: "#f9fafb" }}
            >
                {filteredTimes.map((slot, index) => {
                    const dateObj = new Date(slot);
                    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                    <MenuItem key={index} value={time}>{time}</MenuItem>
                    );
                })}

            </Select>
          </FormControl>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition" onClick={handleSubmit}>
          Book Now
        </Button>
      </form>

      <ToastContainer />
    </div>
  </div>
);

}

export default Booking