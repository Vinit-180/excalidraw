import drawShapes from "@/tools/draw";
import { Draw } from "@/tools/draw/index";
import { useEffect, useRef, useState } from "react"
type CanvasProps={
    elementType:string;
    roomId:string;
    socket:WebSocket
}
const Canvas=({elementType,roomId,socket}:CanvasProps)=>{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [draw,setDraw]=useState<Draw>();
    const [canvasWindows,setCanvasWindows]=useState({width:window.innerWidth,height:window.innerHeight});
  
    useEffect(()=>{
      const checkWindow=()=>{
        console.log(window.innerWidth,window.innerHeight,'---');
        setCanvasWindows({width:window.innerWidth,height:window.innerHeight});
      }

      window.addEventListener('resize',checkWindow);
      return(()=>{
        window.removeEventListener("resize",checkWindow);
      })
    },[window]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const drawObject=new Draw(canvas,socket,roomId);
            setDraw(drawObject);
            
            // drawShapes(canvas, elementType,socket,r  omId); 
        }  
    }, [canvasRef]);

    useEffect(()=>{
      console.log("Drawing with elementType:", elementType);
      draw?.setElementType(elementType);
    },[elementType,draw]);
    
      
return( <div 
    className=" relative h-full w-full ">
        <canvas ref={canvasRef} className={`bg-white h-full w-full ${elementType === 'hand' ? "cursor-grab" : "cursor-crosshair"} `}
        width={canvasWindows.width} height={canvasWindows.height}
        ></canvas>
    </div>
    )
}


export default Canvas;