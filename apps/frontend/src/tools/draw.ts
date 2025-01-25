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
}
const shapes: Shape[] = [];

const drawShapes = (canvas: HTMLCanvasElement, type: string) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return;
    }
    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    // Event: Mouse Down (Start Drawing)
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;
    });
    canvas.addEventListener('mousemove', (e) => {
        console.log(type);
        if (!isDrawing || type==='hand') {
            return;
        }
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        clearCanvas(shapes,canvas,ctx);
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.roundRect(startX, startY, width, height, 20)
        // ctx.lineJoin = 'bevel';
        ctx.stroke();


    })
    canvas.addEventListener('mouseup', (e) => {
        isDrawing = false;  // Stop drawing
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;

        if (type === 'rect') {
            shapes.push({ 
                type: "rect", 
                x: startX, 
                y: startY,
                width: width,
                 height: height
                 })
        }

    });

    // Event: Mouse Out (Cancel Drawing if cursor leaves the canvas)
    canvas.addEventListener('mouseout', (e) => {
        isDrawing = false;

    });
    
}
const clearCanvas=(shapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(0,0,canvas.width,canvas.height);    
    
    shapes?.map((e)=>{
        if(e.type==='rect'){
            ctx.beginPath();

            ctx.strokeStyle = 'rgb(0,0,0)';
            ctx.roundRect(e.x, e.y, e.width,e.height, 20)
            ctx.stroke();
        }  
    })
}
export default drawShapes;