
import { Response,Request } from "express"
import User from "../model/user"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"

export const registercontroller=async(req:Request,res:Response)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
   }
   
    try{

        let user= await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({message:"User Already Exists"});
        }
       
        user=new User(req.body);
        await user.save();
        const token=jwt.sign({userId:user.id},process.env.SECRET_KEY as string,{expiresIn:'1d'});
        res.cookie("auth_token",token,{
            httpOnly:true,
            maxAge:86400000
        })

        return res.status(200).json({message:"User Registered Successfully"});
        

    }catch(error){
        
        return res.status(500).json({message:"Something went Wrong"});
    }


}
