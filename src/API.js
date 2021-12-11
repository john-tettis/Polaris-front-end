
import axios from'axios'
var env = process.env.NODE_ENV || 'development';
const SERVER_URL = env === 'development' ? 'http://localhost:3001':process.env.SERVER_URL



export default class API{
    static async loadMoonData(moonRiseSet){
        //code from http://www.wdisseny.com/lluna/?lang=en
        //props for the awesome moon phase generator
        function load_moon_phases(obj,callback){
            var gets=[]
            for (var i in obj){
                gets.push(i + "=" +encodeURIComponent(obj[i]))
            }
            gets.push("LDZ=" + new Date(obj.year,obj.month-1,1) / 1000)
            var xmlhttp = new XMLHttpRequest()
            var url = "https://www.icalendar37.net/lunar/api/?" + gets.join("&")
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    callback(JSON.parse(xmlhttp.responseText))
                }
            }
            xmlhttp.open("GET", url, true)
            xmlhttp.send()
        }
        function configure(moon){    
            var day = new Date().getDate()
            var html = 
            //this part included the dat. Since my app will include it elsewhere, there is no need
            //  +
            // "<b>" + moon.nameDay[dayWeek]+ "</b>" +
            // "<div>" + day + " <b>" + moon.monthName + "</b> " +
            // moon.year + "</div>"
            `<div class= 'widget-container'>`+
            // `<p class='widget-text'>Lunar Data:</p>`+
            "<div shadow>" + moon.phase[day].svg + 
            "<div >" + moon.phase[day].phaseName + " " +
            "" + ((moon.phase[day].isPhaseLimit )? ""  :   Math.round(moon.phase[day].lighting) + "%") +
            "</div>" +
            
            "</div>" +
            "</div>" +
            
            "<div class='widget-container'>" +
            `<div>Rise:<span>${moonRiseSet.rise}</span></div>`+
            `<div>Set:<span>${moonRiseSet.set}</span></div>`
            + "</div>";
            let moonOverlay = document.getElementById("moon-overlay");
           if(moonOverlay)moonOverlay.innerHTML = html;
        }   
        var configMoon = {
            lang  		:'en', 
            month 		:new Date().getMonth() + 1,
            year  		:new Date().getFullYear(),
            size		:150, 
            lightColor	:"rgb(255,255,210)", 
            shadeColor	:"black", 
            texturize	:true, 
        }
        try{
            load_moon_phases(configMoon,configure);
        }
        catch(e){
            console.error(e)
        }
    } 
    //dev key for IPGEO API
    static IPGeoKey = '60367fbf71f54c22b26d647f85c90bcf'
    static locationData= null;
    //return IP adrress and location of user
    static async getLocationData(){
        try {
            if(this.locationData) return this.locationData
            const result = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.IPGeoKey}`)
            this.locationData = result.data
            return result.data
        } catch (error) {
            console.error(error)
        }
        


    }
    //generates star map based on users long/latitude passed through data
    static async getStarMap(data) {
        try{
            //using star generator API. there is no documentation and everything is in another language. Very very very difficult to sort out.
            let response = await axios.post("https://sky.respina.store/api/starmap", data)
            return response
        }catch(e){
            console.error(e)
        }
    }
    //returns object containing weather for users location
    static async getAstroData(location){
        try {
            const API_KEY = '2f5bd61df84d497fa26202402210312'
            let data;
            console.log({location})
            if(!location){
                const {ip} = await this.getLocationData()
                let res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${ip}&key=${API_KEY}&days=2`)
                data= res.data
                
            }
            else{
                let res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${`${location[1]},${location[0]}`}&key=${API_KEY}&days=2`)
                data= res.data
                
            }
            let value =data.forecast.forecastday[0];
            value.astro.location=data.location
            value.hour.push(...data.forecast.forecastday[1].hour)
            return value
            
        } catch (error) {
            console.error(error)
        }

    }
    static auth={
        signup: async function(formData){
            try{
                let result = await axios.post(`${SERVER_URL}/auth/register`,formData);
                return result.data
            }
            catch(e){
                console.error(e)
                return {error:e}
            }
        },
        login: async function(formData){
            try{
                let result = await axios.post(`${SERVER_URL}/auth/login`,formData);
                return result.data
            }
            catch(e){
                console.error(e)

            }
        }
    }


    static async getAutoComplete(text){
        try{
            if(!text) return []
            const config = {
                method: 'get',
                url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=b4cbb7dffc5647d0b54a7176adaf94ba`,
                headers: { }
                };
        
            const {data} = await axios(config);
            console.log(data)
            return data.features.map(object=>({
                key: object.properties.name || `${object.properties.city}, ${object.properties.state}`,
                label:object.properties.name || `${object.properties.city}, ${object.properties.state}`,
                location: object.geometry.coordinates
            }))
            
                        

        }
        catch(e){
            console.log(e)
            return e

        }
    }
}

