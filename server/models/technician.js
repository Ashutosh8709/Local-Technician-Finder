const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const technicianSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    serviceType:{
        type: String,
        enum: ['home', 'computer', 'vehicle'],
        required: true
    },
    location:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    availableSlots: [Date],
    profileImgUrl:{
        type:String,
        default:"https://unsplash.com/photos/man-standing-in-front-of-open-doorway-OyN4ErsD3J0"
    }
});


module.exports=mongoose.model("Technician",technicianSchema);