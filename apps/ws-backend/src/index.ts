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
        const decoded=jwt.decode(token)
        console.log(decoded);
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
    const queryParams=new URLSearchParams(url.split("?")[1]);
    const token=queryParams.get('token') || "";

    const decoded=checkJwt(token);
    console.log(decoded)
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
            socket.send('pong');
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
            const message=parsedData.message.toString();
            console.log(message);
            users.forEach(user=>{
                //  && user.userId!==userId
                if(user.rooms.includes(roomId)){
                    user.socket.send(JSON.stringify({
                        type:'chat',
                        message:message,
                        roomId
                    }))
                }
            })
        }
        
    });
});