import {WebSocketServer} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";
const wss=new WebSocketServer({ port:8081});


wss.on('connection',(socket,request)=>{

    const url=request.url;
    if(!url){
        return ;
    }
    const jwt_secret_key=JWT_SECRET_KEY;
    const queryParams=new URLSearchParams(url.split("?")[1]);
    const token=queryParams.get('token') || "";
    const decoded=jwt.verify(token,jwt_secret_key)
    if(!decoded || !(decoded as JwtPayload).userId){
        socket.send("Sorry Not Authenticated !");
        socket.close();
        return ;
    }

    console.log("User Connected");

    socket.on("message",function message(data){
        socket.send('pong');
    });
});