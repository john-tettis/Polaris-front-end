import React, {useEffect, useState} from "react";
import API from '../../API';
import SunOverlay from './SunOverlay';
import MoonOverlay from './MoonOverlay';
import SkyMap from './SkyMap'
import Loading from '../Loading'
import WeatherOverlay from './WeatherOverlay'
import WidgetMenu from '../WidgetMenu'
import LocationOverlay from './LocationOverlay'


export default function AstroView(){
    //handle data for rise and set times
    const [astro,setAstro] = useState(null)
    //controls the overlay for widget-menu
    const [show,setShow] = useState(false)
       //retreive sunrise, senset, moonrise,moonset
       useEffect(()=>{
        //get weather info and rise/set times. format apropriately.
        
        async function loadDataFromApi(){
            let data = await API.getAstroData()
            if(!data) return
            setAstro(data)
            
        }
        loadDataFromApi()
    },[])
    //if API hasnt responded, return just the skymap to render loading screen
    if(!astro)return (
                        <>
                            <SkyMap setShow={setShow} data={null}>
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
    return (
        <>
            <SkyMap setShow={setShow} data={astro.astro.location||null}>
            </SkyMap>
            <WidgetMenu  show={show} setShow={setShow}>
                <LocationOverlay data={astro.astro.location}/>
                <MoonOverlay data={moonData}/>
                <SunOverlay data={sunData}/>
                <WeatherOverlay weather={astro.hour}/>
            </WidgetMenu>
        </>
    )
}


