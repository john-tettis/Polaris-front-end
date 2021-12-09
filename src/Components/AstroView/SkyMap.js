import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {getDate} from '../../Helpers/time.js'
import API from '../../API'
import Loading from '../../Images/Loading.svg'
import Icon from '../../Images/sun-and-moon.svg'

let starMap ={
    "paint":true,
    "shape":false,
    "geo":{
        "location":{
            "lat":null,
            "lng":null
            },
        "time":"12.00.00",
        "date":getDate()

    },
    "text":{"line1":{"value":"","font":"","size":"22","color":"black"},"line2":{"value":"","font":"","size":"42","color":"black"},"line3":{"value":"","font":"","size":"42","color":"black"}},
    "music":{"qr":""},
    "background":{"bg":"transparent","x":0,"y":0,"opacity":40,"wallpaper":"","circle":true},
    "customize":{"size":"A3","frame":"#000000","background":"black","dot":false,"star":true,"constellation":true,"constellationText":true},
    "filename": uuidv4() + ".svg",
    "roban":true
}
//return necessary html to construct a sky map based off of
//
export default function SkyMap({data,setShow,children}){
    // const [mapData,setMapData] = useState(starmap)
    const [Image,setImage] = useState(Loading)
    
    useEffect(()=>{
        if(!data)return
        // console.log(mapData)
        const getSkyMap= async()=>{
            starMap.geo.location={
                 lng:data.lon,
                 lat:data.lat
                 }
            // console.log('GETTING STAR DATA',mapData,data)
            let result= await API.getStarMap(starMap)
            setImage(result.data.path)
            
        }
        if(data)getSkyMap()
    },[data])
    function toggleOffCanvas(){
        setShow(s=>!s)
    }
    return(
        <>
            <div id="celestial-map">s
                <img alt='star map 'id='map' src={Image}/>
                <img alt='widget menu button'
                    src={Icon}
                    className='widget-launcher slide-in-left'
                    onClick={toggleOffCanvas}/>
            </div>
        </>
    )
}