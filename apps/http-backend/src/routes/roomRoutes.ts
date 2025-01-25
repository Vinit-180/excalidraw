import express, { Router } from "express";
import { createRoom } from "../controllers/roomController";

export const roomRouter:Router=express.Router();

roomRouter.post("/",createRoom);

// get via roomId -> return message top-50
// get via slug -> return roomId 