const APP_ID = '4090239d69cdb3874de692fd18539299';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key]);
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex'; 
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}
