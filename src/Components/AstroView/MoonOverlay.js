import React, {useEffect} from 'react'
import Loading from '../Loading'

import API from '../../API';

//uses consttructor function to create and insert into element.
//Ideally this should be more reacty- but this is how the code was designed,
//and it works.priorities.
export default function MoonOverlay({data}){
    //retreive astrological data for display
    useEffect(()=>{
        //get api data for astrological view
        async function loadDataFromApi(){
            await API.loadMoonData(data);

        }
        loadDataFromApi()
    },[data])
    
    if(!data) return <Loading/>
    return <div className='widget' id="moon-overlay">
            </div>
}