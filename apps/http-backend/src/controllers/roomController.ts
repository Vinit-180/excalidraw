import { RoomSchema } from "@repo/common/types";
import { Request, Response } from "express";

export const createRoom=async(req:Request,res:Response)=>{
    const data=RoomSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({message:"Incorrect Inputs"});
        return ;
    }
    
    res.json({
        roomId:req.body.name
    });
}