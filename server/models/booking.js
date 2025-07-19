const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bookingSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    technicianId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'technician',
        required:true
    },
    slot:[Date],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
});

module.exports=mongoose.model('Booking',bookingSchema);