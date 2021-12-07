import {formatTime} from '../../Helpers/time'


export default function HourDisplay({data}){

    return(
        <div className='weather-hour-display'>
            <div>{formatTime(data.time)}</div>
            <div>{data.condition.text} <img className='weather-icon' src={data.condition.icon}></img></div>
        </div>
    )

}


