import { RoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const data = RoomSchema.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({ message: "Incorrect Inputs" });
            return;
        }
        // @ts-ignore
        const userId = req.userId;

        await prismaClient.room.create({data:{
            slug:req.body.name,
            adminId:userId
        }}).then((data)=>{
            console.log(data);
            res.status(201).json({message:"Room is created",data:data});
            return;
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({message:"Facing problem to create a room",error:err});
            return;
        })
    }
    catch (err) {
        res.json({ message: "Internal Server Error", error: err });
        return;
    }
}