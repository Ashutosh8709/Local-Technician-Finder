const Technician = require('../models/technician');

const AllTechnicians=async(req,res)=>{
    const allTechnicaians=await Technician.find({});
    res.json(allTechnicaians);
}

module.exports={AllTechnicians};