async function getCat() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();

    result.innerHTML = `
        <img src="${data[0].url}" alt="Random Cat" width="250" class="rounded-lg mx-auto"/>
        <div class="bg-gray-700 p-4 rounded-lg text-white mt-4">
            <p>Here's your adorable cat! 🐱</p>
        </div>
    `;

    button.innerHTML = 'Get Random Cat!';
    button.disabled = false;
}

