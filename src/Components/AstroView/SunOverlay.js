import React from "react";
import sun from '../../Images/sun.svg';
import {formatTime} from '../../Helpers/time'


//similar to moon overlay, but I created this from scratch.
//state is managed by Parent here, as sunrise/sunset API is also moonrise/moonset api. so said data is consolidated
export default function SunOverlay({data}){
    console.log({data})
    return <div className='widget'>
                <img src={sun}style={{width:'150px'}}></img>
                <div>Rise: <span>{data.rise}</span></div>
                <div>Set: <span>{data.set}</span></div>
            </div>
}