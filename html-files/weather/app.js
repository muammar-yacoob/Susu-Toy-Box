async function getWeather() {
    const city = document.getElementById('city').value;
    const result = document.getElementById('result');

    result.innerHTML = '<span class="loading loading-spinner"></span> Getting weather...';

    try {
        const response = await fetch(`http://wttr.in/${city}?format=3`);
        const weather = await response.text();

        result.innerHTML = `
            <div class="alert alert-success">
                <img src="https://img.icons8.com/fluency/24/sun.png"/>
                <span>${weather}</span>
            </div>
        `;
    } catch {
        result.innerHTML = `
            <div class="alert alert-error">
                <img src="https://img.icons8.com/fluency/24/error.png"/>
                <span>Could not get weather!</span>
            </div>
        `;
    }
}

