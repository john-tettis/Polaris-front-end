import React, {useEffect, useState, useRef} from "react";
import API from '../../API';
import SunOverlay from './SunOverlay';
import MoonOverlay from './MoonOverlay';
import SkyMap from './SkyMap'
import Loading from '../Loading'
import WeatherOverlay from './WeatherOverlay'
import WidgetMenu from '../WidgetMenu'
import LocationOverlay from './LocationOverlay'
import {Link} from 'react-router-dom'


export default function AstroView(){
    //handle data for rise and set times
    const [astro,setAstro] = useState(null)
    //controls the overlay for widget-menu
    const [show,setShow] = useState(false)
    //reference to the location input to focus 
    const input = useRef({})
    //user defined location
    const [location, setLocation]= useState(null)
       //retreive sunrise, senset, moonrise,moonset
       useEffect(()=>{
        //get weather info and rise/set times. format apropriately.
        
        async function loadDataFromApi(){
            
            let data = location ? await  API.getAstroData(location): await API.getAstroData()
            if(!data) return
            setAstro(data)
            
        }
        loadDataFromApi()
    },[location])
    //if API hasnt responded, return just the skymap to render loading screen
    if(!astro)return (
                        <>
                            <SkyMap setShow={setShow} data={null}>
                            <div className='title-card'>
                                <h1 className='title-card-title'>Loading star view...</h1>
                                {/* <Link to={launchLocationOverlay} className='title-card-link'>Not your location?</Link> */}
                            </div>
                            </SkyMap>

                            <Loading text='Loading stars for your location'/>
                        </>
                        )
    const moonData={
        rise:astro.astro.moonrise,
        set:astro.astro.moonset
    }
    const sunData={
        rise:astro.astro.sunrise,
        set:astro.astro.sunset
    }
    
    const locationData = astro.astro.location;
    const launchLocationOverlay=(e)=>{
        e.preventDefault();
        setShow(true);
        input.current.firstChild.firstChild.focus()
        return location

}
    return (
        <>
            <SkyMap setShow={setShow} data={locationData||null}>
            <div className='title-card'>
                    <h1 className='title-card-title'>Star view for {locationData.name} {locationData.region}</h1>
                    <a onClick={launchLocationOverlay} className='title-card-link'>Not your location?</a>
                </div>
            </SkyMap>
            <WidgetMenu  show={show} setShow={setShow}>
                <LocationOverlay setLocation = {setLocation} reference={input} data={locationData}/>
                <MoonOverlay data={moonData}/>
                <SunOverlay data={sunData}/>
                <WeatherOverlay weather={astro.hour} sun={sunData}/>
            </WidgetMenu>
        </>
    )
}


