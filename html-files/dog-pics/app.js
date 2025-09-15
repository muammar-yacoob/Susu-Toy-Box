// Dog Pictures - Simple JavaScript for kids!

// Simple function to get a random dog from the internet
async function getDog() {
    const resultDiv = document.getElementById('dogResult');

    // Show loading message while we get the dog
    resultDiv.innerHTML = '<div class="loading">Getting a cute dog... 🐶</div>';

    // Ask the internet for a random dog picture
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();

    // Show the dog picture on our page
    resultDiv.innerHTML = `
        <div class="loading">Here is your dog! 🐶</div>
        <img src="${data.message}" alt="Random Dog" class="dog-image">
        <p>Click the button for another dog! 🐾</p>
    `;
}

// Get a dog when page loads
const showDogOnLoad = () => getDog();
window.onload = showDogOnLoad;