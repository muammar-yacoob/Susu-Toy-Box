// Pokemon Generator - Simple JavaScript for kids to learn!

// Simple function to show loading message
function showLoading(message) {
    const pokemonBox = document.getElementById('pokemonResult');
    pokemonBox.innerHTML = `<div class="loading">${message}</div>`;
}

// Simple function to show error message
function showError(message) {
    const pokemonBox = document.getElementById('pokemonResult');
    pokemonBox.innerHTML = `<div class="loading">${message}</div>`;
}

// Simple function to get data from the internet
async function getDataFromInternet(webAddress) {
    try {
        // Ask the internet for Pokemon data
        const response = await fetch(webAddress);

        // Check if we got a good response
        if (!response.ok) {
            throw new Error('Could not get Pokemon data');
        }

        // Get the data as JSON
        return await response.json();
    } catch (error) {
        console.log('Error getting data:', error);
        throw error;
    }
}

// Main function to get a random Pokemon
async function getPokemon() {
    const pokemonBox = document.getElementById('pokemonResult');

    // Show loading message
    showLoading('Getting a random Pokemon... ⚡');

    try {
        // Pick a random Pokemon number (1-1010)
        const randomNumber = Math.floor(Math.random() * 1010) + 1;

        // Get Pokemon data from the Pokemon API
        const pokemonWebsite = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
        const pokemonData = await getDataFromInternet(pokemonWebsite);

        // Get Pokemon's basic info
        const name = pokemonData.name;
        const id = pokemonData.id;
        const image = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default;

        // Get Pokemon types (fire, water, etc.)
        const types = pokemonData.types.map(type => type.type.name).join(', ');

        // Show the Pokemon on screen
        pokemonBox.innerHTML = `
            <div class="loading">Here is your Pokemon! 🔴</div>
            <div class="pokemon-card">
                <img src="${image}" alt="${name}" class="pokemon-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23ddd%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2220%22>No Image</text></svg>'">
                <h2 class="pokemon-name">#${id} ${name}</h2>
                <p class="pokemon-type">Type: ${types}</p>
            </div>
            <p>Click the button for another Pokemon! ⚡</p>
        `;

    } catch (error) {
        // If something went wrong, show an error message
        showError('Could not get Pokemon data. Check your internet connection! ❌');
    }
}

// Get a Pokemon when page loads
window.onload = function() {
    getPokemon();
};