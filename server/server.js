const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const technicianRouter=require('./routes/technicianRouter');
const authRouter=require('./routes/authRouter');
const corsOptions={
    origin:["https://local-technician-finder.onrender.com"],
}
const bookingRouter= require('./routes/bookingRouter');
const reviewRouter = require('./routes/reviewRouter');



main().then(()=>{
    console.log("Connected to Db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));
}


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/technicians',technicianRouter);
app.use('/auth',authRouter);
app.use('/booking',bookingRouter);
app.use('/review',reviewRouter);
















app.listen(8080,()=>{
    console.log("App is listening on port 8080");
})