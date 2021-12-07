export function getDate(){
    let today = new Date();
    let day = today.getDate()
    let date = (day< 10 ? '0':'')+day+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
    return date
}

export function formatTime(time){
    var date = new Date(time);
const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};
let timeString = date.toLocaleString('en-US', options);
return timeString;

}