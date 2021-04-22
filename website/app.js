// UI Elements
const userLocation = document.getElementById('location');
const zip = document.getElementById('zip_code');
const city = document.getElementById('city');
const countryCode = document.getElementById('country_code');
const feelingTxt = document.getElementById('user_feeling');

const weatherToday = document.getElementById('weather');
const dateToday = document.getElementById('date');

const temperature = document.getElementById('temperature');
const feelingToday = document.getElementById('feeling');

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
let apiKey = '';


document.getElementById('generate').addEventListener('click', async (event) => {
    // clear any error messages
    resetErrors();

    // reset the UI
    resetUI();

    // set date (en-GB) UK format
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    let date = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    // just show hours and minutes
    let time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    date += ' ' + time;

    let weatherData = await getWeather(zip.value, city.value, countryCode.value);

    console.info('Weather Data: ');
    console.log(weatherData);

    // guard clause for invalid data
    if(weatherData.cod != '200'){
        displayError(weatherData.message);
        return;
    }

    if(typeof(feelingToday) === undefined){
        displayError('Please enter how you are feeling today');
        return;
    }

    if(feelingToday.value == ''){
        displayError('Please enter how you are feeling today');
        return;
    }

    let journalEntry = {
        location: weatherData.name + " " + weatherData.sys.country,
        date: date,
        temperature: weatherData.main.temp,
        weather: weatherData.main,
        content: feelingToday.value
    };

    postJournalEntry('/addentry', journalEntry).then(updateUI()).catch((error) => {
        console.error(error);
    });;
})


// get the API Key value
const getSalt = async () => {

    const req = await fetch('/getsalt', {});

    try {
        const data = await req.json();
        return data;
    } catch (error) {
        console.error('cannot retrieve Api key', error);
    }
}

// GET data from Open Weather API
const getWeather = async (zipCode, cityName, countryCode) => {

    let keyData = await getSalt();

    apiKey = keyData.OW_KEY;

    console.info('Api Key: ');
    console.log(apiKey);

    let url = getUrl(zipCode, cityName, countryCode);

    console.info('Url for Api Request: ');
    console.log(url);

    if (url === null) {
        throw 'invalid url for Api request';
    }

    const res = await fetch(url);

    try {
        const data = await res.json();
        console.info('data from Api: ');
        console.log(data);
        return data;
    } catch (error) {
        displayError(error);
        console.error('error retreiving data from open weather api', error);
    }

}


const getUrl = (zipCode, cityName, countryCode) => {
    // guard clauses - bail out early if data invalid
    if (typeof (countryCode) === undefined || countryCode.length < 1) {
        displayError('Please enter a valid country code');
        return null;
    }


    if (typeof (zipCode) === undefined && typeof (cityName) === undefined) {
        displayError('Please enter either Zip Code or City Name');
        return null;
    }

    if (zipCode.length < 1 && cityName < 1) {
        displayError('Please enter either Zip Code or City Name');
        return null;
    }

    if (cityName.length > 0 && zipCode.length < 1) {
        return baseURL + 'q=' + cityName + ',' + countryCode + '&units=metric' + '&appid=' + apiKey;
    }

    if (zipCode.length > 0 && cityName.length < 1 && countryCode.toUpperCase() === 'US') {
        return baseURL + 'zip=' + zipCode + ',' + countryCode + '&units=metric' + '&appid='  + apiKey;
    }

    // US only uses ZIP codes (?) so just default to using City Name 
    return baseURL + 'q=' + cityName + ',' + countryCode + '&units=metric' + '&appid=' + apiKey;
}


// POST journal entry
// see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const postJournalEntry = async (url = '', data = {}) => {

    console.info('posting data to Api');
    console.log(JSON.stringify(data) );

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    });

    try {
        const data = await response.json();
        console.info('response from posting data to Api: ');
        console.log(data);
        return data;

    } catch (error) {
        displayError(error);
        console.error('error posting data to Open Weather API', error);
    }

}



const updateUI = async () => {

    const req = await fetch('/getdata');

    try {

        const data = await req.json();
        console.info('data for updating UI: ');
        console.log(data);

        dateToday.innerHTML = data.date;
        temperature.innerHTML = data.temperature + ' Celsius';
        userLocation.innerHTML = data.location;
        feelingTxt.innerHTML = data.feeling;

    } catch (error) {
        displayError(error);
        console.error('error updating UI', error);
    }

}

const resetUI = ()=> {
    dateToday.innerHTML = '';
        temperature.innerHTML =  '';
        userLocation.innerHTML =  '';
        feelingTxt.innerHTML = '';
}


// sets css class for div based on icon value in weather data
// see https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
const getIconClass = (iconCode) => {

    if (typeof (iconCode) === undefined) {
        throw 'invalid icon code, cannot be null';
    }

    switch (iconCode) {
        case '01d':
        case '01n':
            return 'clear-sky';
        case '02d':
        case '02n':
            return 'few-clouds';
        case '03d':
        case '03n':
            return 'scattered-clouds';
        case '04d':
        case '04n':
            return 'broken-clouds';
        case '09d':
        case '09n':
            return 'shower-rain';
        case '10d':
        case '10n':
            return 'rain';
        case '11d':
        case '11n':
            return 'thunderstorm';
        case '13d':
        case '13n':
            return 'snow';
        case '50d':
        case '50n':
            return 'mist';
        default:
            return '';
    }
}


const displayError = (errorMessage, elementId = 'errors-summary') => {

    resetErrors();
  
    let element = document.getElementById(elementId);
    let p = document.createElement('p');
    p.textContent = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    p.classList.add('error');
    element.appendChild(p);
    document.getElementById(elementId).focus();
}

const resetErrors = () => {
    let errors = document.getElementById('errors-summary');
    errors.innerHTML = '';
}