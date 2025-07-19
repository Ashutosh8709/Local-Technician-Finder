const Review=require('../models/review');

const createReivew=async(req,res)=>{
    try{
        const {technicianId,userId,rating,comment}=req.body;
        const review=new Review({technicianId,userId,rating,comment});
        await review.save();
        res.json({
            message:"Review Saved",
            success:true
        })
    }catch(err){
        res.json({ success: false, message: err.message });
    }
}

const getReviews=async(req,res)=>{
    try{
        const techId=req.params.techId;
        const reviews=await Review.find({technicianId:techId}).populate('userId', 'name');
        res.json({
            success:true,
            reviews
        });

    }catch(err){
        res.json({success:false,
            message:err.message
        })
    }
}



module.exports={createReivew,getReviews};