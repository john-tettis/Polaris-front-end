import React,{useEffect,useState} from "react";
import HourDisplay from './HourDisplay'
import API from '../../API'
import Loading from '../Loading'

//weather api to display weather forcast
export default function WeatherOverlay({weather}){
    // useEffect(()=>{
    //     const fetchWeather=async ()=>{
    //         let result = await  API.getWeather()
    //         //get formatted sunset time
    //         const sunSet = Math.floor(result.astro.sunset.substring(0,2))+12
    //         //slice hourly forecast to include only post-sunset times, format into hourDisplay component
    //         setWeather(result.hour
    //     }
    //     fetchWeather()
    // },[])
    if(!weather) return <Loading/>
    return <div className='widget weather'>
        <p className='weather-text'>Tonight's Forecast</p>
        <div className='weather-container'>

            {weather.map(hour=>{
                    return <HourDisplay data={hour}/>
                })}
        </div>
    </div>
}