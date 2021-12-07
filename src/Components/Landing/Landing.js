import React, {useEffect, useState, useRef} from 'react'
import {animate, particles, mouse, Bomb} from './ParticleSimulator.js'




//landing page with interactive canvas

export default function Landing(){  
    const [canvas,setCanvas] = useState(null)

    useEffect(()=>{
        if(!canvas) return
        animate(canvas, canvas.getContext('2d'))
    },[canvas])

    return(
        <>
            <Overlay>
                <h1>Polaris</h1>
                <p>Your guiding star</p>

            </Overlay>
            <CanvasDisplay setCanvas={setCanvas}/>
        </>
        )
}




function CanvasDisplay({setCanvas, setShow}){
    const canvasRef = useRef();
    function addParticles(e){
        particles.push(new Bomb({x:e.clientX,y:e.clientY, now:true}))
    }
    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        const context = canvas.getContext('2d');
        context.fillStyle= 'black'
        context.fillRect(0, 0, canvas.width, canvas.height);
        setCanvas(canvas)
    })
    return(
       <canvas onClick={addParticles}ref={canvasRef} id='canvas1'>

       </canvas>
    )
}