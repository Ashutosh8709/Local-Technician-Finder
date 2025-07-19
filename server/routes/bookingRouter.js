const router=require('express').Router();
const {createBooking}=require('../controllers/BookingController');

router.post('/',createBooking);


module.exports=router;