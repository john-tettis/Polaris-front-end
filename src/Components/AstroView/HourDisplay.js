import {formatTime} from '../../Helpers/time'


export default function HourDisplay({data}){

    return(
        <div className='weather-hour-display'>
            <div className='weather-time'>{formatTime(data.time)}</div>
            <div><img className='weather-icon' src={data.condition.icon}></img></div>
        </div>
    )

}


