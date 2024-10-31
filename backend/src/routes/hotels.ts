import Hotel from "../model/hotel";
import mongoose from "mongoose";

import { Router } from "express";
import { Response,Request } from "express";
import { param, validationResult } from "express-validator";


const router=Router();




// search hotel


router.get("/search", async (req: Request, res: Response) => {
    try {
      console.log(req.query);
      const query: any = {}; // To hold MongoDB filter conditions
      const sort:any={};
      const { facilities, types, stars, maxPrice:pricePerNight, description,  page, sortOption, checkIn, checkOut, adultCount, childCount, destination } = req.query;
      
      // Filter by maximum price per night
      if (pricePerNight) {
        query.pricePerNight = { $lte: Number(pricePerNight) };
      }
      if (adultCount) {
        query.adultCount = { $gte: Number(adultCount) };
      }
      if (childCount) {
        query.childCount = { $gte: Number(childCount) };
      }

      // --Sorts
      
      switch (sortOption) {
        case 'StarRating':
          sort.starRating = -1; // Sort by starRating in descending order
          break;
        case 'PriceByDesc':
          sort.pricePerNight = -1; // Sort by pricePerNight in descending order (high to low)
          break;
        case 'PriceByAsc':
          sort.pricePerNight = 1; // Sort by pricePerNight in ascending order (low to high)
          break;
        default:
          // Optionally handle default case or leave empty for no sorting
          break;
      }

      



     
   
      // Filter by star rating (e.g., rating <= provided rating)
      if (stars) {
        const starArray=Array.isArray(stars)?stars:[stars];
        query.starRating={$in:starArray};
      }
        // Filter by facilities if provided
        if (facilities) {

          const facilityArray=Array.isArray(facilities)?facilities:[facilities];
          query.facilities={$all:facilityArray};
         }
   
          if (types) {
            const typeArray = Array.isArray(types)?types:[types];
            query.type = { $in: typeArray };
          }
      
  
     
     
      // Filter by description (case-insensitive match)
      if (description && typeof description === "string") {
        query.description = { $regex: new RegExp(description, "i") };
      }
  
      
      if (destination && typeof destination == "string") {
         query.$or= [
            { city: new RegExp(destination , "i") },
            { country: new RegExp(destination, "i") },
         ]
      }

      
  
    
      
      
      // Set up pagination values, defaulting to page 1 if not provided

      
      const pageNumber = page?parseInt(page as string):1;
      const pageSize = 5;
      const skipNumber = (pageNumber - 1) * pageSize;
  
      // Fetch total count of documents that match the query for pagination
      const total = await Hotel.countDocuments(query);
      // Execute the query with pagination
      const hotels = await Hotel.find(query).sort(sort).skip(skipNumber)
        .limit(pageSize)
         // Assuming sortOption is a valid field in the database
      // Respond with the queried hotels and pagination details
      return res.json({
        data: hotels,
        pagination: {
          total,
          page: pageNumber,
          pages: Math.ceil(total / pageSize),
        },
      });

    } catch (error) {
      console.error("Error fetching hotels:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

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