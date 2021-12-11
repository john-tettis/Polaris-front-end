import React,{useEffect,useState} from "react";
import HourDisplay from './HourDisplay'
import Loading from '../Loading'

//weather api to display weather forcast
export default function WeatherOverlay({weather,sun}){
    if(!weather) return <Loading/>
    //assuming all sunsets ar in the PM. Who know what is possible
    const riseIndex = Number(sun.rise.substring(0,2))+25
    const setIndex = Number(sun.set.substring(0,2)) + 12
    const hours = weather.slice(setIndex,riseIndex);
    return <div className='widget weather'>
        <p className='weather widget-text'>Tonight's Forecast:</p>
        <div className='weather-container'>

            {hours.map(hour=>{
                    return <HourDisplay key={hour} data={hour}/>
                })}
        </div>
    </div>
}