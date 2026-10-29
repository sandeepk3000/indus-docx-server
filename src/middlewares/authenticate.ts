
import type { Response,Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken"
import { userService } from "../modules/users/users.service.js";
import type { AccessTokenPayload } from "../modules/users/users.types";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";
const authenticate = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.split("Bearer ")
        if(!token){
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED,MESSAGES.ERROR.UNAUTHORIZED)
        }
      
        
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload
    
        const user = await userService.findByEmail(decodedToken.email)
  
        
        if(!user){
            throw new ApiError(HTTP_STATUS.NOT_FOUND,MESSAGES.ERROR.NOT_FOUND)
        }
        req.user = user
        return next()
    } catch (error) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED,MESSAGES.ERROR.VALIDATION_FAILED)
    }
}

export default authenticate;