const router=require('express').Router();
const {createReivew,getReviews}=require('../controllers/reviewController');

router.post("/",createReivew);

router.get('/:techId',getReviews);



module.exports=router;