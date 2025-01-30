type Shape = {
    type: "rect";
    x: number;
    y: number
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type:"pencil";
    coordinates:coordinate[][]
}
type coordinate={x:number,y:number};

const getExistingShapes=(roomId:string,socket:WebSocket)=>{
    return [];
}

const drawShapes = async (canvas: HTMLCanvasElement, elementType: string, socket: WebSocket, roomId: string) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || elementType === 'hand') {
        return;
    }
    const shapes: Shape[] = await getExistingShapes(roomId,socket);
    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    
    
    let coordinates:coordinate[][]=[];

    if (socket) {
        socket.onmessage = ((e) => {
            const message = JSON.parse(e.data)?.message;
            if (message !== undefined) {
                // console.log(message);
                // console.log(message);
                shapes.push(JSON.parse(message));
                clearCanvas(shapes, canvas, ctx);
            }
        })
    }
    // Event: Mouse Down (Start Drawing)
    canvas.addEventListener('mousedown', (e) => {
        
        if (elementType !== 'hand') {
            isDrawing = true;
            startX = e.clientX;
            startY = e.clientY;
            ctx.beginPath();
        }
        if(elementType==='pencil'){
            coordinates=[];
            coordinates.push([{x:startX,y:startY}]);
            ctx.moveTo(startX,startY);
            ctx.beginPath();
        }
    });
    canvas.addEventListener('mousemove', (e) => {
        console.log("element",elementType);
        if (!isDrawing) {
            return;
        }
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        if(elementType!=='pencil')
        clearCanvas(shapes, canvas, ctx);
        ctx.strokeStyle = 'rgb(0,0,0)';
        if (elementType === "hand") {
            console.log("Hand tool selected"); 
        }
        else if (elementType ==='rect') {
            console.log("eeee",e.offsetX,e.offsetY);
            // const width = e.offsetX - startX;
            // const height = e.offsetY - startY;
            ctx.beginPath();
            ctx.roundRect(startX, startY, width, height, 20)
            ctx.stroke();
        }
        else if(elementType==='circle'){
            const centerX=startX+width/2;
            const centerY=startY+height/2;
            const radius=Math.max(width,height)/2;
            ctx.beginPath();
            ctx.arc(centerX,centerY,radius, 0,Math.PI*2);
            ctx.stroke();
            ctx.closePath();
        }
        else if(elementType==='pencil'){
            ctx.lineCap='round'
            // console.log(e.clientX,e.clientY,startX,startY)
            const x=e.clientX;
            const y=e.clientY;

            coordinates[coordinates.length-1].push({x,y});
            ctx.lineTo(x,y);
            ctx.stroke();
            
        }
    })
    canvas.addEventListener('mouseup', (e) => {
        isDrawing = false;  // Stop drawing
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        
        if (elementType == 'rect') {
            const shape: Shape = {
                type: "rect",
                x: startX,
                y: startY,
                width: width,
                height: height
            }
            shapes.push(shape)
            socket.send(JSON.stringify({ message: JSON.stringify(shape), type: "chat", roomId: roomId }))
        }
        else if(elementType=='circle'){
            const shape:Shape={
                type:'circle',
                centerX:(startX+width/2),
                centerY:(startY+height/2),
                radius:Math.max(width,height)/2
            }
            shapes.push(shape)
            socket.send(JSON.stringify({ message: JSON.stringify(shape), type: "chat", roomId: roomId }))
        }
        else if(elementType==='pencil'){
            ctx.beginPath();
            const shape:Shape={
                type:"pencil",
                coordinates:coordinates
            }
            shapes.push(shape)
            socket.send(JSON.stringify({ message: JSON.stringify(shape), type: "chat", roomId: roomId }))
            // coordinates=[];
        }

    });

    // Event: Mouse Out (Cancel Drawing if cursor leaves the canvas)
    canvas.addEventListener('mouseout', (e) => {
        isDrawing = false;
        ctx.beginPath();
    });

}
const clearCanvas = (shapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(0,0,canvas.width,canvas.height);    

    shapes?.map((e) => {
        if (e.type === 'rect') {
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(0,0,0)';
            ctx.roundRect(e.x, e.y, e.width, e.height, 20)
            ctx.stroke();
        }
        else if(e.type==='circle'){
            ctx.beginPath();
            ctx.arc(e.centerX,e.centerY,e.radius, 0,Math.PI*2);
            ctx.stroke();
            ctx.closePath();
        }
        else if(e.type==='pencil'){
            ctx.beginPath();
            for(const path of e.coordinates){
                if (path.length === 0) continue;
                // ctx.moveTo(path[0].x,path[0].y);
                for(const point of path){
                    ctx.lineTo(point.x,point.y);
                }
            }
            ctx.stroke();
            ctx.closePath();
            
        }
    })
}
export default drawShapes;