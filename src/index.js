// require('dotenv').config();



// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"
// import express from "express";


// const app = express();
// (async () => {
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//        app.on("error",()=>{
//         console.log("Error connecting to MongoDB");
//         throw error;
//        })
//          app.listen(process.env.PORT,()=>{
//             console.log(`app is running on port ${process.env.PORT}`);
//          })
//     }
//     catch(error){
//         console.error("Error connecting to MongoDB:", error);
//     }
// })();
import connectDB from "./db/index.js";

import dotenv from "dotenv";
import {app} from "./app.js"
dotenv.config({
    path: "./.env"
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port :${process.env.PORT || 8000}`);
    })
    app.on("error",(error)=>{
        console.log("Error connecting to MongoDB");
        throw error;
    })
})
.catch((error) => {
    console.log("MONGODB connection failed:", error);
})
