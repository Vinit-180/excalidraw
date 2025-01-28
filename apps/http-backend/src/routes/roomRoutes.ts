import express, { Router } from "express";
import { createRoom, getMessagesByRoomId } from "../controllers/roomController";

export const roomRouter:Router=express.Router();

roomRouter.post("/",createRoom);
roomRouter.get("/messages/:roomId",getMessagesByRoomId  );
// get via roomId -> return message top-50
// get via slug -> return roomId 