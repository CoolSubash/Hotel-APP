import express,{Response,Request} from "express"
import User from "../model/user"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"




export const logincontroller=async(req:Request,res:Response)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
   }
   

   try{
   
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
     return res.json({"message":"Invalid Credentials or User Doesn't Exists"});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({"message":"Invalid Credentials"});
    }
    const token=jwt.sign({userId:user.id},process.env.SECRET_KEY as string,{expiresIn:'1d'});
    res.cookie("auth_token",token,{
        httpOnly:true,
        maxAge:86400000
    })

    return res.status(200).json({message:"User Login Successfully",userId:user._id});
    
    }catch(error){
        res.status(500).json({message:"Something Went Wrong"});
   }
}

// export const validateToken=async(req:Request,res:Response)=>{


// }

export const logoutController= (req:Request,res:Response)=>{
     res.cookie("auth_token","",{
        expires:new Date(0)
    })
    res.status(200).send('Clear Cookie');
}


