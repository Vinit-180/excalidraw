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
const getExistingShapes=async (roomId:string,socket:WebSocket)=>{
    return [];
}
export class Draw{
    private canvas:HTMLCanvasElement;
    private roomId:string;
    private ctx:CanvasRenderingContext2D;
    private existingShapes:Shape[];
    private socket:WebSocket;
    private clicked:boolean;
    private startX:number;
    private startY:number;
    private elementType:string;
    private coordinates:coordinate[][];
    constructor(canvas:HTMLCanvasElement, socket:WebSocket,roomId:string){
        this.canvas=canvas;
        this.roomId=roomId;
        this.ctx=canvas.getContext("2d")!;
        this.socket=socket;
        this.existingShapes=[];
        this.clicked=false;
        this.startX = 0;
        this.startY = 0;
        this.elementType='';
        this.coordinates=[];
        console.log("dd");
        console.log("dd");
        this.initHelper();
        this.mouseHandlers();
    }
    // "circle"| "pencil" | "rect"
    setElementType(elementType:string){
        this.elementType=elementType
        
    }
    async initHelper(){
        this.existingShapes=await getExistingShapes(this.roomId,this.socket)
        this.socket.onmessage = ((e) => {
            const message = JSON.parse(e.data)?.message;
            if (message !== undefined) {
                // console.log(message);
                // console.log(message);
                this.existingShapes.push(JSON.parse(message));
                this.clearCanvas();
            }
        })
    }

    mouseHandlers(){

        this.canvas.addEventListener('mousedown', (e) => {
            if (this.elementType !== 'hand') {
                this.clicked = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.ctx.beginPath();
            }
            console.log(this.clicked,'--')
            if(this.elementType==='pencil'){
                
                this.coordinates.push([{x:this.startX,y:this.startY}]);
                this.ctx.moveTo(this.startX,this.startY);
                this.ctx.beginPath();
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            // console.log("element",elementType);
            if (!this.clicked) {
                console.log('returned')
                return;
            }
            console.log("mousemove",'ss');
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            if(this.elementType!=='pencil')
                this.clearCanvas();
            this.ctx.strokeStyle = 'rgb(0,0,0)';
            if (this.elementType === "hand") {
                console.log("Hand tool selected"); 
            }
            else if (this.elementType ==='rect') {
                console.log("eeee",e.offsetX,e.offsetY);                
                this.ctx.beginPath();
                this.ctx.roundRect(this.startX, this.startY, width, height, 20)
                this.ctx.stroke();
            }
            else if(this.elementType==='circle'){
                const centerX=this.startX+width/2;
                const centerY=this.startY+height/2;
                const radius=Math.max(width,height)/2;
                this.ctx.beginPath();
                this.ctx.arc(centerX,centerY,radius, 0,Math.PI*2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
            else if(this.elementType==='pencil'){
                this.ctx.lineCap='round'
                const x=e.clientX;
                const y=e.clientY;
                this.coordinates[this.coordinates.length-1].push({x,y});
                this.ctx.lineTo(x,y);
                this.ctx.stroke();
                
            }
        })

        this.canvas.addEventListener('mouseup', (e) => {
            this.clicked=false;
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            
            if (this.elementType == 'rect') {
                const shape: Shape = {
                    type: "rect",
                    x: this.startX,
                    y: this.startY,
                    width: width,
                    height: height
                }
                this.existingShapes.push(shape)
                this.socket.send(JSON.stringify({ message: JSON.stringify(shape), type: "chat", roomId: this.roomId }))
            }
            else if(this.elementType=='circle'){
                const shape:Shape={
                    type:'circle',
                    centerX:(this.startX+width/2),
                    centerY:(this.startY+height/2),
                    radius:Math.max(width,height)/2
                }
                this.existingShapes.push(shape)
                this.socket.send(JSON.stringify({ message: JSON.stringify(shape), type: "chat", roomId: this.roomId }))
            }
            else if(this.elementType==='pencil'){
                this.ctx.beginPath();
                const shape:Shape={
                    type:"pencil",
                    coordinates:this.coordinates
                }
                this.existingShapes.push(shape)
                this.socket.send(JSON.stringify({ message: JSON.stringify(shape), type: "chat", roomId: this.roomId }))
            }
    
        });

        this.canvas.addEventListener('mouseout', (e) => {
            this.clicked = false;
            this.ctx.beginPath();
        });
    }
    clearCanvas = () => {
        console.log('------------------')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ctx.fillRect(0,0,canvas.width,canvas.height);    
        this.existingShapes?.map((e) => {
            if (e.type === 'rect') {
                this.ctx.beginPath();
                this.ctx.strokeStyle = 'rgb(0,0,0)';
                this.ctx.roundRect(e.x, e.y, e.width, e.height, 20)
                this.ctx.stroke();
            }
            else if(e.type==='circle'){
                this.ctx.beginPath();
                this.ctx.arc(e.centerX,e.centerY,e.radius, 0,Math.PI*2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
            else if(e.type==='pencil'){
                this.ctx.beginPath();
                for(const path of e.coordinates){
                    if (path.length === 0) continue;
                    // ctx.moveTo(path[0].x,path[0].y);
                    for(const point of path){
                        this.ctx.lineTo(point.x,point.y);
                    }
                }
                this.ctx.stroke();
                this.ctx.closePath();
                
            }
        })
    }
}