import Hotel from "../model/hotel";
import mongoose from "mongoose";

import { Router } from "express";
import { Response,Request } from "express";
import { param, validationResult } from "express-validator";


const router=Router();




// search hotel


router.get("/search",async(req:Request,res:Response)=>{
    const query:any={};
    const {pricePerNight,starRating,type,city,description,facilities,adultCount,childCount,country}=req.query;

    if(pricePerNight){
       query.pricePerNight={$lte:Number(pricePerNight)};
    }
    if(starRating){
        query.starRating={$lte:Number(starRating)};
    }

    if(type){
        query.type=type;
    }
    if (typeof description === 'string' ) {
        query.description = { $regex: new RegExp(description, 'i') };
    }

    if(typeof city ==='string'){
       query.city={$regex:new RegExp(city,'i')};
    }
    
    if(facilities){
        const facilitiesArray:string[] = (facilities as string).split(",").map((facility)=>facility.trim());
        query.facilities={$in:facilitiesArray};
    }
    const pageNumber=parseInt(req.query.page?req.query.page.toString(): "1");
    const pageSize=5;
    const skipNumber=(pageNumber-1)*pageSize;
    
    const total=await Hotel.countDocuments(query);
    console.log(total)

    const hotel=await Hotel.find(query).skip(skipNumber).limit(pageSize);
    console.log(query);
    return res.json({
        data:hotel,
        pagination:{
            total,
            page:pageNumber,
            pages:Math.ceil(total / pageSize),
        }
    });

})


router.get("/",async(req:Request,res:Response)=>{
    
    try{

        const hotelList=await Hotel.find().sort({lastUpdated:-1});
        return res.status(200).json(hotelList);
    }catch(err){
        res.status(500).json({ message: "Error fetching hotels" });
    }
})

router.get("/:id",[param("id").notEmpty().withMessage("Hotel Id is Required")],async(req:Request,res:Response)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
   }

   const id=req.params.id;

   try{
     const hotel=await Hotel.findById(id);
     if(!hotel){
        return res.status(404).send("No hotel has been found");
     }

     return res.status(200).json(hotel);



   }catch(err){
    return res.status(500).send('Error while fetching the hotel');
   }


})






export default router;