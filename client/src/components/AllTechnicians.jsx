import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {ToastContainer} from 'react-toastify';
import {handleSuccess,handleError} from '../utils';




export default function AllTechnicians(){

    const [technicians,setTechnicians]=useState([]);
    const [selectedTechnician,setSelectedTechnician]=useState(null);
    const [searchQuery,setSearchQuery]=useState('');
    const [reviews,setReviews]=useState([]);
    const [reviewForm,setReviewForm]=useState({rating:1,comment:''});
    const navigate=useNavigate();

    const handleOpenTech=(tech)=>{
        setSelectedTechnician(tech);
        getReviews(tech._id);
    }

    const handleCloseTech=()=>{
        setSelectedTechnician(null);
        setReviews([]);
    }

    const getTechnicians=async()=>{
        const response=await axios.get("https://local-technician-finder.onrender.com/technicians");
        setTechnicians(response.data);
    }

    const getReviews=async(techid)=>{
      const response=await axios.get(`https://local-technician-finder.onrender.com/review/${techid}`);
      setReviews(response.data.reviews);
    }

    const userId=localStorage.getItem('UserID');
    
    const handleSubmitReview=async(e)=>{
      e.preventDefault();
      if (!reviewForm.rating || !reviewForm.comment) {
        handleError("Please fill in all fields.");
      return;
  }
      try{
        const res=await axios.post('https://local-technician-finder.onrender.com/review',{
          technicianId:selectedTechnician._id,
          userId:userId,
          rating:reviewForm.rating,
          comment:reviewForm.comment
        });
        handleSuccess(res.data.message);
        setReviewForm({ rating: "", comment: "" });
        getReviews(selectedTechnician._id);
      }catch(err){
        handleError(err);
      }
    }
    useEffect(()=>{
        getTechnicians();
    },[])

    const data={
        selectedTechnician,
        userId
    }

    const filteredTechnicians = technicians.filter((tech) =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.location.toLowerCase().includes(searchQuery.toLowerCase()));

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white pt-20 px-4">
       <div className="relative mb-4">
  <h1 className="text-3xl font-bold text-white text-center">Available Technicians</h1>

  <input
    type="text"
    placeholder="Search by name or location..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-md border border-white/10 focus:outline-none focus:ring focus:ring-blue-500 w-64"
  />
</div>

      
      <div className="flex flex-wrap justify-center gap-6">
        {filteredTechnicians.length === 0 ? (
          <p className="text-white text-center text-lg mt-8">
          Sorry, we will shortly be coming to your city.
          </p>
        ) :(filteredTechnicians.map((tech) => (
         <Card
            key={tech._id}
            onClick={() => handleOpenTech(tech)}
            sx={{
            width: 250,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.3s',
            '&:hover': {
            transform: 'scale(1.03)',
            },
            backgroundColor: '#1f2937',
            color: '#e5e7eb',
            borderRadius: 3,
            boxShadow: 3,
        }}>
            <CardMedia sx={{ height: 140 }} image={tech.profileImgUrl} title={tech.name} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" className="font-semibold">
                {tech.name} {tech.isVerified && <VerifiedIcon sx={{ color: 'dodgerblue' }} />}
              </Typography>
              <Typography variant="body2" color="gray">
                Service: {tech.serviceType.toUpperCase()} <br />
                Location: {tech.location}
              </Typography>
            </CardContent>
          </Card>
        )))}
      </div>

      {/* Modal */}
      {selectedTechnician && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-white/10">
            {/* Close Button */}
            <div className="sticky top-0 z-10 flex justify-end p-4 bg-gray-900 border-b border-white/10">
              <button onClick={handleCloseTech} className="text-white text-3xl font-bold hover:text-white/60 cursor-pointer">
                &times;
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex flex-col items-center gap-4 p-6">
              <img
                src={selectedTechnician.profileImgUrl}
                alt={selectedTechnician.name}
                className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
              />
              <h3 className="text-2xl font-bold text-white text-center">
                {selectedTechnician.name}{' '}
                {selectedTechnician.isVerified && <VerifiedIcon sx={{ color: 'deepskyblue' }} />}
              </h3>
              <p className="text-gray-400 text-sm">Service Type: {selectedTechnician.serviceType.toUpperCase()}</p>
              <p className="text-gray-400 text-sm">Location: {selectedTechnician.location}</p>

              <div className="text-white w-full mt-4">
                <h4 className="text-lg font-semibold mb-2">📅 Available Slots</h4>
                <ul className="space-y-2">
                  {selectedTechnician.availableSlots.length === 0 ? (
                        <li className="text-sm text-red-400">No slots available</li>
                        ) : (selectedTechnician.availableSlots.map((slot, index) => {
                            const dateObj = new Date(slot);
                            const date = dateObj.toLocaleDateString();
                            const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            return (
                            <li key={index} className="text-sm bg-gray-800 p-2 rounded-md shadow-sm">
                                📅 {date} — 🕒 {time}
                            </li>
                        );
                    })
                  )}

                </ul>
              </div>

              <div className="w-full flex justify-center mt-6">
                <button
                  onClick={() => navigate('/booking', { state: data })}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl transition duration-300 cursor-pointer"
                >
                  Book Now
                </button>
              </div>
              {/* Reviews Section */}
                <div className="text-white w-full mt-8">
                  <h4 className="text-lg font-semibold mb-4">⭐ User Reviews</h4>

              {/* Display existing reviews */}
                <div className="space-y-3 mb-6">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((review, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-md shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-blue-400">👤 {review.userId?.name || "Anonymous"}</span>
                        <span className="text-yellow-400 text-sm">
                          {Array.from({ length: review.rating }, (_, i) => '⭐').join('')}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{review.comment}</p>
                    </div>
                    ))
                  ) : (
                  <p className="text-sm text-red-400">No reviews yet.</p>
                  )}
                </div>

  {/* Add new review */}
  <form
    className="bg-gray-800 p-4 rounded-lg shadow-inner space-y-3"
    onSubmit={(e) => handleSubmitReview(e)}
  >
    <h5 className="text-md font-semibold">Leave a Review</h5>

    <div className="flex items-center space-x-2">
      {/* <label htmlFor="rating" className="text-sm">
        Rating:
      </label> */}
      {/* <select
        id="rating"
        value={reviewForm.rating}
        onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
        className="bg-gray-700 text-white p-1 rounded"
        required
      >
        <option value="">Select</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 && 's'}
          </option>
        ))}
      </select> */}
      <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">Rating: </Typography>
      <Rating
        name="simple-controlled"
        value={reviewForm.rating}
        onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
      />
      </Box>
    </div>

    <textarea
      placeholder="Write your comment..."
      value={reviewForm.comment}
      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
      className="w-full p-2 rounded bg-gray-700 text-white text-sm"
      rows={3}
      required
    />

    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition duration-300"
    >
      Submit Review
    </button>
  </form>
</div>

            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
    );
}