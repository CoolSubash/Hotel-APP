
import express,{Response,Request} from "express"
import User from "../model/user"
import { Router } from "express"
import { logincontroller, logoutController } from "../controller/auth.controller";
import {check, validationResult } from "express-validator"
import verifyToken from "../middleware/auth";
const router=Router();

const userValidation=[
    check("email","email is required").isEmail(),
    check("password","password is required and must be at least 6 characters").isLength({
    min:6
    })
]


router.post("/login",userValidation, logincontroller);
router.post('/logout',logoutController);
router.get("/validateToken",verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId});

})



export default router




