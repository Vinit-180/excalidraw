import express from "express";
import userRouter from "./routes/userRoutes";
import { roomRouter } from "./routes/roomRoutes";
import { authMiddleware } from "./middleware/auth";
import cors from "cors";
const app=express();

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Oye Pappaji Oye Pappaji !!")
})

app.use("/api/user",userRouter);
app.use("/api/room",authMiddleware,roomRouter);

app.listen(9000,()=>{
    console.log(`Server Started on http://localhost:9000`);
});