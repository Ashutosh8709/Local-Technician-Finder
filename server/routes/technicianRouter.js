const router=require('express').Router();
const {AllTechnicians}=require('../controllers/TechniciansController');


router.get('/',AllTechnicians);


module.exports=router;