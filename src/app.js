import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN, // it controls which domains can access your backend api which means if your frontend is running on 3000 it can access the backend api
    credentials:true
})) 

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true,limit:'16kb' }));// for encodind url request
app.use(express.static('public'));// for static files like images pdf which i want to servel
app.use(cookieParser());// to access and set the user brouser cookies with my server
export  { app }