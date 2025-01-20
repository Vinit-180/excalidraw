import express, { Router } from "express";
import { signinUser, signupUser } from "../controllers/userController";

const userRouter:Router=express.Router();


userRouter.post("/signup",signupUser);
userRouter.post('/signin',signinUser);
export default userRouter;