import express,{Request,Response} from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import "dotenv/config"
import { connectToDatabase } from './database'
import { v2 as cloudinary } from "cloudinary";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import adminHotelRoutes from "./routes/myhotel"
import hotelroutes from "./routes/hotels"
import path from 'path';
const app=express()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
dotenv.config()
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));
connectToDatabase()






app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/my-hotel",adminHotelRoutes)
app.use("/api/hotel",hotelroutes)


  

  
  app.listen(8000, () => {
    console.log(`Server is running on http://localhost:8000}`);
  });

  export default cloudinary;
