import React, {useState} from 'react'
import API from '../../API'
import DataListInput from "react-datalist-input";
///location input and display. Autocomplete was a pain in the ass. google will not be straight up about its pricing.
export default function LocationOverlay({data, reference, setLocation}){
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
    const handleSubmit= e =>{
        e.preventDefault();
        console.log(e)
        let obj = auto.find(item=>item.label === input);
        if(!obj) return setInput('')
        setLocation(obj.location)
    }
    const onSelect = (val)=> {
        setInput(val.label)
        setLocation(val.location)
    };
    return <form class='widget location-overlay' onSubmit={handleSubmit}>
        <div ref={reference} className='form-group'>
            <DataListInput
                dropdownClassName='z-5'
                inputClassName="form-control"
                
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
