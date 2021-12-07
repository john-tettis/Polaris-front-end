import React, {useState,useEffect, useRef} from 'react'

import API from '../../API';
import {Link} from 'react-router-dom'
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
  const google = window.google

//uses consttructor function to create and insert into element.
//Ideally this should be more reacty- but this is how the code was designed,
//and it works.priorities.
export default function LocationOverlay({data}){
    const [location,setLocation] = useState({address:`${data.name},${data.region}`})
    let autocomplete=null;
    
    useEffect(()=>{
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
        autocomplete.addListener("place_changed", handlePlaceSelect)
    })

    const handleChange = address => {
        setLocation({ address });
      };
     
    const handlePlaceSelect=()=> {
        let addressObject = autocomplete.getPlace()
        let address = addressObject.address_components
        setLocation({
            name: addressObject.name,
            street_address: `${location.address[0].long_name} ${address[1].long_name}`,
            city: location.address[4].long_name,
            state: location.address[6].short_name,
            zip_code: location.address[8].short_name,
            googleMapLink: location.addressObject.url
        })
    }
    let inputRef = useRef()
    return <div class='widget location-overlay'>
        <input id="autocomplete"
            className="input-field"
            ref={inputRef}
            type="text"
        />
            { data && <p>({data.name}, {data.region})</p>}
                
            <Link to='/set-location'>Not your location?</Link>

            </div>
}