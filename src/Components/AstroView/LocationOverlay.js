import React, {useState} from 'react'
import API from '../../API'
import DataListInput from "react-datalist-input";
///location input and display. Autocomplete was a pain in the ass. google will not be straight up about its pricing.
export default function LocationOverlay({data}){
    const [location,setLocation] = useState({address:`${data.name},${data.region}`})
    const [input,setInput] = useState('')
    const [auto,setAuto] = useState([])
    
    const getAutoComplete= async(val)=>{
        let results = await API.getAutoComplete(val);
        console.log(results)
        if(!results) return
        setAuto(results)
    }
    const handleChange = val => {
        console.log(val)
        setInput(val);
        getAutoComplete(val);
    }
    const onSelect = (val)=> console.log(val);
    return <form class='widget location-overlay'>
        <div className='form-group'>
            <DataListInput
            dropdownClassName='z-5'
            // inputClassName="form-control"
                placeholder="Your location..."
                items={auto}
                value={input}
                onSelect={onSelect}
                onInput={handleChange}
                />
            

        </div>
        
            { data && <p>({data.name}, {data.region})</p>}

            </form>
}
