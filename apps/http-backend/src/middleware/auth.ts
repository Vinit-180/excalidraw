import { JWT_SECRET_KEY } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload }  from "jsonwebtoken";

export const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const jwt_key=JWT_SECRET_KEY;
        const token=req.headers["authorization"] ?? "";
        if (!token){
            res.status(400).json({message:"Token is missing"});
            return ;
        }
        const decoded=jwt.verify(token,jwt_key);
        if(decoded ){
            const userId=(decoded as JwtPayload).userId ;
            // @ts-ignore
            req.userId=decoded.userId;
            
            console.log(userId)
            const isUser=await prismaClient.user.findFirst({where:{id:userId}})
            console.log(isUser,userId)
            if(isUser){
                next();
                return ;
            }
            res.status(400).json({message:"Token Malformed"});
            return ;
        }
        else{
            res.status(403).json({message:"Unauthorized"});
            return ;
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Token Malformed"});
        return ;
    }
    
}