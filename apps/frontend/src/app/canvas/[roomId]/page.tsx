import Canvas from "@/components/Canvas/page";

export default async function CanvasPage({params}:{params:{roomId:string}}) {
    const roomId=(await params).roomId;
    
    
    return <Canvas roomId={roomId} />

    //  <div className="max-h-full max-w-full w-100 h-100 bg-white text-black">
    // <h1>Hello</h1>
    //  </div>
}