"use client";

import React from 'react'
import drawShapes from "@/tools/draw";
import { Button } from "@repo/ui/button";
import { Circle, Hand, HandIcon, Pencil, RectangleEllipsis, RectangleHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import Canvas from './Canvas';
const RootCanvas = ({roomId}:{roomId:string}) => {
    console.log(roomId);
    

    const [elementType, setElementType] = useState("hand");
    const iconsData = [
        { icon: HandIcon, text: "hand" },
        { icon: RectangleHorizontalIcon, text: "rect" },
        { icon: Circle, text: "circle" },
        {icon:Pencil, text:"pencil"}
    ]
    const [socket,setSocket]=useState<WebSocket | null >(null);

    useEffect(()=>{
        const token=localStorage?.getItem("excaliToken");
        const ws=new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}?token=${token}`);
        ws.onopen=((ev)=>{
            setSocket(ws);
            ws.send(JSON.stringify({type:"join",roomId:roomId}))
        });

        },[]);
    
    return <div className='h-screen w-screen relative overflow-hidden'>    
    <div className="left-[50%] absolute top-4 z-20 mx-auto border rounded-lg shadow-lg">
            <div className="  bg-white/60 px-4 py-2 rounded-lg border border-gray-700">
                {
                    iconsData?.map((e, ind) => {
                        return <Button key={ind} onClick={() => { setElementType(e.text) }}
                            className={` ${elementType === e.text ? 'bg-gray-400/60' : ""} p-2 rounded-lg`}
                        > <e.icon className="text-black" /> </Button>
                    })
                }
            </div>
        </div>
        {
        socket===null ? <h1 className='my-auto text-2xl text-black'>Connecting to Server</h1> : <Canvas elementType={elementType} socket={socket} roomId={roomId} />
    }
    </div>
  
}

export default RootCanvas;
