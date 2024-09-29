import Hotel from "../model/hotel"
import { HotelType } from "../shared/types";
import { Request,Response } from "express";





export const getHotel=async(req:Request,res:Response)=>{
    try{
      const hotels=await Hotel.find({});
      return res.json(hotels);
    }catch(error){
       return  res.status(500).json({ message: "Error fetching hotels" });
    }
}