const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    technicianId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'technician',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }  
});


module.exports=mongoose.model('Review',reviewSchema);