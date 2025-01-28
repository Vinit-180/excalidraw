import drawShapes from "@/tools/draw";
import { useEffect, useRef, useState } from "react"
type CanvasProps={
    elementType:string;
    roomId:string;
    socket:WebSocket
}
const Canvas=({elementType,roomId,socket}:CanvasProps)=>{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [zoom, setZoom] = useState(100);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
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

          const context = canvas.getContext("2d");
          if (context) {
            contextRef.current = context;
          }
            console.log("Drawing with elementType:", elementType);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawShapes(canvas, elementType,socket,roomId); 
        }  
    }, [elementType]);

    
      
return( <div 
    className=" relative h-full w-full ">
        <canvas ref={canvasRef} className={`bg-white h-full w-full ${elementType === 'hand' ? "cursor-grab" : "cursor-crosshair"} `}
        width={canvasWindows.width} height={canvasWindows.height}
        ></canvas>
    </div>
    )
}


export default Canvas;