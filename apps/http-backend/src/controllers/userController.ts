import { JWT_SECRET_KEY, salt } from "@repo/backend-common/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { SigninSchema, SignupSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";
import { hash } from "bcrypt";
const jwt_key = JWT_SECRET_KEY;

export const signupUser = async (req: Request, res: Response) => {
    try {

        console.log(req.body, jwt_key);
        const data = SignupSchema.safeParse(req.body);

        if (!data.success) {
            res.status(400).json({ message: "Incorrect Inputs" });
            return;
        }
        const isExistingUser=await prismaClient.user.findFirst({where:{email:req.body.username}});
        console.log(isExistingUser);
        if(isExistingUser!==null){
            res.json({message:"User is Already Created"});
            return ;
        }
        const hashedPassword=await hash(req.body.password,salt);
        await prismaClient.user.create({ data: { email: req.body.username, password: hashedPassword, name: req.body.name } }).then((data) => {
            console.log(data);
            const token = jwt.sign({ email: data.email, name: data.name,userId:data.id }, JWT_SECRET_KEY, { expiresIn: "30d" });
            res.json({ message: "User Signedup Successfully", token: token });
            return;
        }).catch((err) => {
            console.log(err);
            res.json({ message: "Error In Signup", error: err });
            return;
        });
    }
    catch (err) {
        res.json({ message: "Internal Server Error", error: err });
        return ;
    }
}

export const signinUser = async (req: Request, res: Response) => {
    try{

        const data = SigninSchema.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({ message: "Incorrect Inputs" });
            return;
        }
        const user=await prismaClient.user.findFirst({where:{email:req.body.username}});
        console.log(user);
        if(user===null){
            res.status(400).json({message:"User is not present"});
            return;
        }
        const isMatched=await hash(req.body.password,user.password);
        if(isMatched){
            const token = jwt.sign({ email: user.email, name: user.name,userId:user.id }, JWT_SECRET_KEY, { expiresIn: "30d" });
            res.json({message:"Signed In successfully",token:token});
            return ;
        }
        else{
            res.json({message:"Invalid username or password"});
            return ;
        }
    }catch (err) {
        res.json({ message: "Internal Server Error", error: err });
        return ;
    }
}