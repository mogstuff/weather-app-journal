let baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "";
const fetch = require("node-fetch");


const getSalt = async () => {

    const req = await fetch("/getsalt", {});    

    try{
        const data = await req.json();
        return data;
    }catch(error){
        console.error('cannot retrieve api key', error);
    }    

}

// get data from Open Weather API
const getWeatherData = async (zip) => {

    apiKey = getSalt();    
    
    const url = baseURL + zip + apiKey;

    const res = await fetch(apiKey);

    try{
            const weatherData = await res.json();
            console.debug('weatherData:');
            console.debug(weatherData);
            return weatherData;
    }

    catch(error){
        console.error('error retreiving data from open weather api', error);
    }

}

getSalt();