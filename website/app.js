// UI Elements
const zip = document.getElementById("zip_code");
const city = document.getElementById("city");
const countryCode = document.getElementById("country_code");

const weather = document.getElementById("weather");
const date = document.getElementById("date");
const location = document.getElementById("location");
const temperature = document.getElementById("temperature");
const feelingToday = document.getElementById("user_feeling");


let baseURL = "api.openweathermap.org/data/2.5/weather?";
let apiKey = "";


document.getElementById("generate").addEventListener("click", async (event) => {
    
    // guard clauses ? - call displayErrors

    // set date

    // set data to await getWeatherData

    
    // post data with postJournalEntry


    // .then clause to update UI


})


const displayErrors = () => {

}


// get the API Key value
const getSalt = async () => {

    const req = await fetch("/getsalt", {});    

    try{
        const data = await req.json();
        return data;
    }catch(error){
        console.error('cannot retrieve api key', error);
    }    
}

// GET data from Open Weather API
const getWeatherData = async (zipCode, cityName, countryCode) => {

    apiKey = getSalt();    
    
    const url = baseURL + zip + apiKey;

    const res = await fetch(apiKey);

    try{
            const weatherData = await res.json();
            console.debug('weatherData:');
            console.debug(weatherData);
            return weatherData;
    }catch(error){
        console.error('error retreiving data from open weather api', error);
    }

}


// POST journal entry
// see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const postJournalEntry = async (url = '', data = {} ) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'         
        },
     
        body: JSON.stringify(data) 

    });

    try {
            const weatherData = response.json();
            return weatherData;

    } catch (error) {
        console.error("error posting data to Open Weather API", error);
    }


}




