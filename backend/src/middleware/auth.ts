import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token;
   
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Verifying the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        
        // Attach the decoded token to the request object (req.user)
        req.userId = (decoded as JwtPayload).userId;
        
        // Call next to proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};

export default verifyToken;
