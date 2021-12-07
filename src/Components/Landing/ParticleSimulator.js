import weightedRandom from '../../Helpers/random'
//canvas 1 for particles
let formData= {
    trails:true,
    gravity:0, 
    growth:0, 
    particleLimit:100,
    bomb:false,
    bomb_intensity:10,
    complementary:false,
    friction:0
};


//global particles variable
export let particles=[];
let hue=200;

export let mouse = {
    x:null,
    y:null
}

const colorValues={
    200:.4,
    60:.3,
    300:.3,

};

//particle class -> tracks a single particle and its location and speed.
class Particle{
    constructor(color=hue,friction,x=mouse.x, y=mouse.y, dx, dy){
        const offset = (Math.random() > .5 ? 180:0);
        this.size = Math.random()* 5
        this.brightness= Math.random()*50 + 50;
        this.x = x;
        this.y=y;
        this.speed = Math.random()*10-5;;
        this.angle = Math.floor(Math.random()*361 ) * (Math.PI/180)
        this.dx= dx || Math.cos(this.angle)*this.speed
        this.dy= dy || Math.sin(this.angle)*this.speed
        this.color = (Math.random()*30 + color) + (formData.complementary ? offset:0);
        this.age=0;
        this.friction =Math.random()*.001
        this.opacity=0;
    }
    //retreive growth variable from form
    growthFactor = ()=>formData.growth;
    //retreive gravity from form
    gravity = ()=>formData.gravity;
    //update function cjhanges position, size and acceleration of particle. runs each animation frame
    update(canvas,ctx){
        this.x+=this.dx
        this.y+=this.dy
        
        this.dy+=this.gravity();
        this.size+=this.growthFactor();
        // if(this.size>20)this.decreaseFactor = ()=>formData.growth
        //friction handling. bring dx/dy to zero;
        this.dx+=this.dx<0 ? this.friction: this.dx > 0 ? -this.friction:0;
        this.dy+=this.dy<0 ? this.friction: this.dy > 0 ? -this.friction:0;
        if(Math.abs(this.dx)< this.friction) this.dx=0;
        if(Math.abs(this.dy)< this.friction) this.dy=0;
        if(Math.abs(this.dy)< this.friction && Math.abs(this.dx)< this.friction){
            this.update=this.draw;
        }


        //collision detection
        //if particle is outside canvas, delete it
        // if(this.x> canvas.width-this.size || this.x< this.size ||this.y> canvas.height+this.size || this.y<this.size  ){
        //     // this.size=0;
        // }
        if(this.size>0){
            this.draw(canvas,ctx)
            this.opacity=Math.min(this.opacity+.1,1)
        }
    }
    draw(canvas,ctx){
        ctx.beginPath();
        ctx.fillStyle=`hsla(${this.color},100%,${this.brightness}%,${this.opacity})`;
        ctx.arc(this.x,this.y, this.size, 0, Math.PI *2)
        ctx.fill();
    }
}
//class particle SYstem -> handles multiple particles. Easy way to spawn many particles in one animation frame.
class ParticleSystem{
    constructor(quantity, offset=0, fd){
        this.particles = [];
        this.origin ={x:mouse.x,y:mouse.y};
        this.size= 1;
        this.speed=-10;
        // this.drawTrail();
        //if particle system was created by firing context
        if(fd){
            //shoot particles in genereal direction provided by fd
            for(let i=0;i<=quantity;i++){
                fd.dx+=  (Math.random()*2 -1)
                fd.dy+=  (Math.random()*2 -1)
                this.particles.push(new Particle(hue-offset,fd.friction, fd.x,fd.y))
            }

        }
        else{
            for(let i=0;i<=quantity;i++){
                this.particles.push(new Particle(hue-offset))
            }
        }
    }
    update(canvas,ctx){
        let every = true;
        let increment=0;
        let count=particles.length-formData.particleLimit
        if(count>0){
            increment=1;
        }
        for(let i=0;i<this.particles.length;i++){
            //this code will draw a line between all particles in a particel system, given they are close enough.
            //O(n^2) means thisn is extremely performance heavy.
            // for(let j=i+1; i<this.particles.length;j++){
                let particle = this.particles[i]
            //     let p2 = this.particles[j]
            //     let dx = p1.x-p2.x;
            //     let dy = p1.y-p2.y
            //     let distance = Math.sqrt(dy**2 + dx**2)
            //     if(distance < 10000){
            //         ctx.beginPath();
            //         ctx.strokeStyle =`hsl(${hue}, 100%,50%)`;
            //         ctx.moveTo(p1.x,p1.y);
            //         ctx.lineTo(p2.x,p2.y);
            //         ctx.stroke();
            //     }
            // }

        //only for individual particles
        //duplicate code. needs refactored.
        particle.age+=increment;
        // if(particle.age >=formData.particleLimit/2 && count>0) {
        //     particle.growthFactor= ()=> -.1;
        //     count--;
        // }
            if(this.particles[i].size>0){
                every=false;
            }
            this.particles[i].update(canvas,ctx);
            if(this.particles[i].size<=0){
                this.particles.splice(i,1);
                i--;
            }
            
        }
        // if all particles are done animating, cover them up
        if(every){
            // ctx.beginPath();
            // ctx.fillStyle=`black`;
            // ctx.arc(this.origin.x,this.origin.y, 110, 0, Math.PI *2)
            // ctx.fill();
            this.size=0;

        }
    }
}
//spawns particle in direction, explodes into particle bomb upon second impact
export class Bomb{
    constructor(data){
        this.x = data.x;
        this.y = data.y;
        this.collisions=0;
        this.age=0;
        this.color = hue
        this.explosionTime=200;
        this.friction=0;
        
        
        //data.now is true only for left click events. no delay to firing
        if(data.now){
            this.size=.1;
            this.timer=0;
            this.dx=0;
            this.dy = 0;
            return
        }
        this.dx=data.dx;
        this.dy = data.dy;
        this.size=20;
        this.timer=80;
        this.gravity = ()=>formData.gravity;
    }
    update(canvas,ctx){
        this.friction+=.0002
        //check if bomb has exploded for a few seconds
        if(this.age >=this.explosionTime) return this.size=0
       
        if(this.timer<=0) this.explode();
    
    }
    explode(){
        let v= formData.bomb_intensity
        let data={
            x:this.x,
            y:this.y, 
            friction: this.friction
        };
        this.age++
        particles.push(new ParticleSystem(20,weightedRandom(colorValues),data))
        this.size=.1;
        this.collisions=0; 
    }
}


// canvas.addEventListener('mousedown',(e)=>{
//     return 
// })
/**
 * handles the update of all elements in global particles variable. Runs each animation frame.
 * updates collision coordinates for pparticles, bombs, particle systems
 */
function updateAllParticles(canvas,ctx){
    //set increment based on particle limit
    let increment=0;
    let count=particles.length-formData.particleLimit/2
    if(count>0){
        increment=1;
    }
    
    for(let i=0;i<particles.length;i++){
        const particle = particles[i]
        particle.update(canvas,ctx);
        if(particle.size <= 0){
            particles.splice(i,1);
            i--;
            continue
        }
        //only for individual particles
        // if(!(particle instanceof Particle))continue
        // particle.age+=increment;
        // if(particle.age >=formData.particleLimit/2 && count>0) {
        //     particle.growthFactor= ()=> -.1;
        //     count--;
        // }
       
    }

}


/**
 * clears the canvas according to user settings. Either clears entire frame, or draws semi-transparent rectangle across screen.
 *  Ran each animation frame
 **/
function updateCanvas(canvas,ctx){
    //begin drawing
    ctx.beginPath()
    //set fillstyle to clear entire canvas
    // ctx.fillStyle='rgba(0,0,0,225)';
    
    //if formData.trails,change fillstyle slowly cover previous particle drawings, creating trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    //otherwise clear the entire canvas
    // else ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
}

//animate function, recursively calls indefinetely
export function animate(canvas,ctx){
    updateCanvas(canvas,ctx);
    updateAllParticles(canvas,ctx);
    window.requestAnimationFrame(()=>animate(canvas,ctx));

}
