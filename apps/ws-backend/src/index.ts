import {WebSocket, WebSocketServer} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";
const wss=new WebSocketServer({ port:8081});

interface User{
    socket: WebSocket;
    rooms:String[];
    userId:String;
}

const users:User[]=[];
const checkJwt=(token:string)=>{
    try{
        const decoded=jwt.verify(token,JWT_SECRET_KEY)
        if(typeof decoded==="string"){
            return null;
        }
        if(!decoded || !decoded.userId){
            return null;
      }
        return decoded;
    }
    catch(err){
        console.log(err);
        return null;
    }
}
wss.on('connection',(socket,request)=>{

    const url=request.url;
    if(!url){
        return ;
    }
    const jwt_secret_key=JWT_SECRET_KEY;
    const queryParams=new URLSearchParams(url.split("?")[1]);
    const token=queryParams.get('token') || "";
    const decoded=checkJwt(token);
    if(!decoded || !(decoded as JwtPayload).userId){
        socket.send("Sorry Not Authenticated !");
        socket.close();
        return ;
    }
    const userId=(decoded as JwtPayload).userId;
    console.log("User Connected");
    users.push({socket,userId,rooms:[]});
    socket.on("message",function message(data){
        const parsedData=JSON.parse(data as unknown as string);
        if(parsedData.type==='join' ){
            const user=users.find(x=>x.socket===socket);
            user?.rooms.push(parsedData.roomId);
        }

        if(parsedData.type==='leave'){
            const user=users.find(x=>x.socket===socket);
            if(!user){
                return ;
            }
            user.rooms=user?.rooms.filter(x=>x===parsedData.room);
        }
        if(parsedData.type==='chat'){
            const roomId=parsedData.roomId;
            const message=parsedData.message;
            users.forEach(user=>{
                if(user.rooms.includes(roomId) && user.userId!==userId){
                    user.socket.send(JSON.stringify({
                        type:'chat',
                        message:message,
                        roomId
                    }))
                }
            })
        }
        socket.send('pong');
    });
});