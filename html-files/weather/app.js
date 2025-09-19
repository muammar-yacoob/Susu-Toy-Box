async function getWeather() {
    const city = document.getElementById('city').value;
    const result = document.getElementById('result');
    const button = document.querySelector('button[onclick="getWeather()"]');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch(`http://wttr.in/${city}?format=3`);
    const weather = await response.text();

    let icon = 'clear-day.svg';
    if (weather.includes('rain')) icon = 'rainy.svg';
    if (weather.includes('snow')) icon = 'snowy.svg';
    if (weather.includes('cloud')) icon = 'cloudy-day.svg';
    if (weather.includes('storm')) icon = 'thunder.svg';

    result.innerHTML = `<img src="weather-icons/${icon}" width="80"/><div class="bg-gray-700 p-4 rounded-lg text-white mt-4">${weather}</div>`;

    button.innerHTML = 'Get Weather!';
    button.disabled = false;
}

async function fillCity() {
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    document.getElementById('city').value = data.city;
}

