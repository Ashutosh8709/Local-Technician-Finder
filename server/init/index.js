const mongoose=require('mongoose');
const initDB=require('./data');
const Technician=require('../models/technician');
import dotenv from "dotenv";
dotenv.config();

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});



async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}

const initData=async()=>{
    await Technician.deleteMany({});
    await Technician.insertMany(initDB.data);
}

initData();