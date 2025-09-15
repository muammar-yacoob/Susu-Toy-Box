// Cat Pictures - Simple JavaScript for kids!

// Simple function to get a random cat from the internet
async function getCat() {
    const resultDiv = document.getElementById('catResult');

    // Show loading message while we get the cat
    resultDiv.innerHTML = '<div class="loading">Getting a cute cat... 🐱</div>';

    // Ask the internet for a random cat picture
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();

    // Show the cat picture on our page
    resultDiv.innerHTML = `
        <div class="loading">Here is your cat! 🐱</div>
        <img src="${data[0].url}" alt="Random Cat" class="cat-image">
        <p>Click the button for another cat! 🐾</p>
    `;
}

// Get a cat when page loads
const showCatOnLoad = () => getCat();
window.onload = showCatOnLoad;

