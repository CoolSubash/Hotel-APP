import express,{Response,Request} from "express"
import User from "../model/user"
import { Router } from "express"
import { registercontroller } from "../controller/user";
import {check, validationResult } from "express-validator"
const router=Router();

const userValidation=[
    check("firstName","firstName is required").isString(),
    check("lastName","lastName is required").isString(),
    check("email","email is required").isEmail(),
    check("password","password is required and must be at least 6 characters").isLength({
    min:6
    })
]


router.post("/register",userValidation, registercontroller);


export default router




