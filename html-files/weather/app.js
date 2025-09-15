// Weather Wizard - Simple JavaScript for kids to learn about weather and APIs!

// Simple function to show loading message
function showLoading(message) {
    const weatherBox = document.getElementById('weatherResult');
    weatherBox.innerHTML = `<div class="loading">${message}</div>`;
}

// Simple function to show error message
function showError(message) {
    const weatherBox = document.getElementById('weatherResult');
    weatherBox.innerHTML = `<div class="loading">${message}</div>`;
}

// Simple function to get text from the internet
async function getTextFromInternet(webAddress) {
    try {
        // Ask the internet for information
        const response = await fetch(webAddress);

        // Check if we got a good response
        if (!response.ok) {
            throw new Error('Could not get weather data');
        }

        // Get the text from the response
        return await response.text();
    } catch (error) {
        console.log('Error getting data:', error);
        throw error;
    }
}

// Simple function to get JSON data from the internet
async function getJSONFromInternet(webAddress) {
    try {
        // Ask the internet for information
        const response = await fetch(webAddress);

        // Check if we got a good response
        if (!response.ok) {
            throw new Error('Could not get location data');
        }

        // Get the JSON data from the response
        return await response.json();
    } catch (error) {
        console.log('Error getting data:', error);
        throw error;
    }
}

// Simple function to get weather by city name
async function getWeatherByCity(cityName) {
    const weatherWebsite = `http://wttr.in/${cityName}?format=3`;
    return await getTextFromInternet(weatherWebsite);
}

// Simple function to get weather by your current location
async function getWeatherByLocation() {
    // First, find out where you are
    const locationData = await getJSONFromInternet('http://ip-api.com/json');

    // Then get weather for your city
    const weatherWebsite = `http://wttr.in/${locationData.city}?format=3`;
    return await getTextFromInternet(weatherWebsite);
}

// Simple function to detect your current city
async function detectCurrentCity() {
    try {
        // Ask the internet where you are
        const locationData = await getJSONFromInternet('http://ip-api.com/json');
        return locationData.city;
    } catch (error) {
        console.log('Could not detect city:', error);
        return null;
    }
}

// Simple function to auto-fill your city
async function autoFillCity() {
    const cityInput = document.getElementById('cityInput');

    // Only fill if the input is empty
    if (cityInput.value.trim() === '') {
        const currentCity = await detectCurrentCity();
        if (currentCity) {
            cityInput.value = currentCity;
            cityInput.placeholder = `Your location: ${currentCity}`;
        }
    }
}

// Simple function to show weather animation
function showWeatherAnimation(weatherType) {
    const animationBox = document.getElementById('weatherAnimation');
    animationBox.innerHTML = ''; // Clear any old animation

    // Choose which animation to show based on weather type
    if (weatherType === 'sunny' || weatherType === 'clear') {
        animationBox.innerHTML = '<div class="sun"></div>';
    } else if (weatherType === 'rain' || weatherType === 'rainy') {
        animationBox.innerHTML = `
            <div class="rain">
                <div class="raindrop"></div>
                <div class="raindrop"></div>
                <div class="raindrop"></div>
                <div class="raindrop"></div>
            </div>`;
    } else if (weatherType === 'snow' || weatherType === 'snowy') {
        animationBox.innerHTML = `
            <div class="snow">
                <div class="snowflake"></div>
                <div class="snowflake"></div>
                <div class="snowflake"></div>
                <div class="snowflake"></div>
                <div class="snowflake"></div>
            </div>`;
    } else if (weatherType === 'storm' || weatherType === 'thunder' || weatherType === 'lightning') {
        animationBox.innerHTML = '<div class="storm"><div class="lightning"></div></div>';
    } else {
        // Default to clouds for any other weather
        animationBox.innerHTML = '<div class="cloud"></div>';
    }
}

// Simple function to figure out what type of weather it is
function figureOutWeatherType(weatherDescription) {
    const lowerCaseWeather = weatherDescription.toLowerCase();

    // Check if it's sunny
    if (lowerCaseWeather.includes('sunny') || lowerCaseWeather.includes('clear') || lowerCaseWeather.includes('☀️')) {
        return 'sunny';
    }
    // Check if it's rainy
    else if (lowerCaseWeather.includes('rain') || lowerCaseWeather.includes('🌧️') || lowerCaseWeather.includes('drizzle')) {
        return 'rain';
    }
    // Check if it's snowy
    else if (lowerCaseWeather.includes('snow') || lowerCaseWeather.includes('❄️') || lowerCaseWeather.includes('blizzard')) {
        return 'snow';
    }
    // Check if it's stormy
    else if (lowerCaseWeather.includes('storm') || lowerCaseWeather.includes('thunder') || lowerCaseWeather.includes('⛈️')) {
        return 'storm';
    }
    // Check if it's cloudy
    else if (lowerCaseWeather.includes('cloud') || lowerCaseWeather.includes('☁️') || lowerCaseWeather.includes('overcast')) {
        return 'cloud';
    }
    // If we can't figure it out, default to cloudy
    else {
        return 'cloud';
    }
}

// Main function to get weather (this is what happens when you click the button!)
async function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    const weatherBox = document.getElementById('weatherResult');
    const animationBox = document.getElementById('weatherAnimation');

    // Show loading message
    showLoading('Getting weather info... ⏳');
    animationBox.innerHTML = ''; // Clear any old animations

    try {
        let weatherInfo;

        // Check if user typed a city name
        if (cityName.trim() === '') {
            // Get weather for current location
            weatherInfo = await getWeatherByLocation();
        } else {
            // Get weather for the city they typed
            weatherInfo = await getWeatherByCity(cityName);
        }

        // Show the weather information
        weatherBox.innerHTML = `Weather: ${weatherInfo}`;

        // Figure out what type of weather it is and show animation
        const weatherType = figureOutWeatherType(weatherInfo);
        showWeatherAnimation(weatherType);

    } catch (error) {
        // If something went wrong, show an error message
        showError('Could not get weather data. Check your internet connection! ❌');
        animationBox.innerHTML = '';
    }
}

// When the page loads, try to fill in your current city
document.addEventListener('DOMContentLoaded', function() {
    autoFillCity();
});

