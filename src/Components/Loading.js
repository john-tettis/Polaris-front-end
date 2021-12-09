import React,{useEffect} from 'react'
export default function Loading({text='Loading', color='white'}){
    const dots = '...'
    let i=0;
    useEffect(()=>{
        setInterval(() => {
            i++;
            i=i>2 ? 0:i;
        },2000);
    })

    return <div style={{color}} className='loading'>{text}{dots.substring(i)}</div>
}