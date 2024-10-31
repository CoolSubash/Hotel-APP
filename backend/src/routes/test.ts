import { Router } from "express";
import Hotel from "../model/hotel";

import { Request,Response } from "express";

const router=Router();

router.post("/",async(req:Request,res:Response)=>{
    await Hotel.deleteMany()
    const hotel=await Hotel.insertMany(req.body);
    console.log(hotel)
    return res.status(200).json(hotel)
    
})

export default router;