import React, {useEffect, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Overlay from './Overlay'
import {animate, particles, CallToAction, mouse, Bomb, pause} from './ParticleSimulator.js'




//landing page with interactive canvas

export default function Landing({setNav}){  
    const [canvas,setCanvas] = useState(null);
    const [button,setButton] = useState(null);
    const [click,setClick] = useState(false);
    useEffect(()=>{
        setNav(false)
        if(!canvas ||click) return
        animate(canvas, canvas.getContext('2d'))
        const button = new CallToAction(canvas.width/3*2,canvas.height/2,10,70);
        setButton(button)
        particles.push(button);
    },[canvas])


    function handleResize(){
        if(!canvas) return
        canvas.height = window.innerHeight-60;
        canvas.width=window.innerWidth
    }
    
    window.addEventListener('resize', handleResize)
    return(
        <>
            <Overlay>
                <div class={`landing ${click && 'fade'}`}>
                    <h1 className='landing-title'>Polaris</h1>
                    <p className='landing-text'>Your guiding star</p>
                    <Link to='/astro-view' className={`link-button accent ${click && 'slide-in-margin'}`}>Get Started</Link>
                </div>
            </Overlay>
            <CanvasDisplay setNav={setNav} button={button}setClick={setClick}setCanvas={setCanvas}/>
        </>
        )
}

//canvas component. Wrapped in meo to keep from rerendering upon nav bar display.
const CanvasDisplay = React.memo(({setCanvas, setClick,setNav, button})=>{
    const canvasRef = useRef();
    
    function addParticles(e){
        //check if call to action was pressed
        if(!button.isMouseOver())return
        setTimeout(()=>{
            setNav(true);
            pause.pause=true
        },4000);

        setClick(true);
        particles.length=0;
        particles.push(new Bomb({x:e.clientX,y:e.clientY-60, now:true}))
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

    function mouseMove(e){
            mouse.x=e.clientX;
            mouse.y=e.clientY;
    }
    return(
       <canvas onMouseMove={mouseMove} onClick={addParticles}ref={canvasRef} id='canvas1'>

       </canvas>
    )
});