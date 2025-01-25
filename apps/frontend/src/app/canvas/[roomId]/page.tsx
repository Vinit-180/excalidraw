"use client";
import drawShapes from "@/tools/draw";
import { Button } from "@repo/ui/button";
import { Circle, Hand, HandIcon, RectangleEllipsis, RectangleHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react"

export default function Canvas(){
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const [elementType,setElementType]=useState("rect");
    const iconsData=[
        {icon:HandIcon, text:"hand"},
        {icon:RectangleHorizontalIcon, text:"rect"},
        {icon:Circle, text:"circle"}
    ]
    console.log(elementType);
    useEffect(()=>{
        if(canvasRef.current){
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d'); // Get the 2D context
            // Set canvas size explicitly (this will ensure it takes full viewport size)
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawShapes(canvasRef.current,elementType);
        }
    },[canvasRef,elementType]);

    return <div style={{height:'100%'}} className="bg-white overflow-hidden" >
        <div className="relative flex items-center justify-center py-10">
        <div className="absolute flex gap-2 items-center bg-white/60 px-4 py-2 rounded-lg border border-gray-700"> 
        {
            iconsData?.map((e,ind)=>{
              return <Button key={ind} onClick={()=>{setElementType(e.text)}} 
              className={` ${elementType===e.text ? 'bg-gray-400/60' :""} p-2 rounded-lg`}
              > <e.icon className="text-black" /> </Button>  
            })
        }
        {/* <Button>dswdefrg</Button> */}
            {/* <button onClick={()=>{setElementType("hand")}} > <HandIcon className="text-black" />  </button>
            <button> <RectangleHorizontalIcon className="text-black" /> </button>
            <button> <Circle className="text-black" /> </button> */}
        </div>
        </div>
        <canvas ref={canvasRef} className={`h-screen w-screen bg-white ${elementType==='hand' ? "cursor-grab" : "cursor-crosshair"} `} ></canvas>   
    </div> 
        
    //  <div className="max-h-full max-w-full w-100 h-100 bg-white text-black">
    // <h1>Hello</h1>
    //  </div>
}