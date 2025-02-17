import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async()=>{
    try{
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database connected to ${DB_NAME}`)

    
}catch(error){
    console.log(`Database connection failed ${error.message}`)}
}