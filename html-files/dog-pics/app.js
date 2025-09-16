async function getDog() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();

    result.innerHTML = `
        <img src="${data.message}" alt="Random Dog" width="250" class="rounded-lg mx-auto"/>
        <div class="bg-gray-700 p-4 rounded-lg text-white mt-4">
            <p>Here's your good boy! 🐶</p>
        </div>
    `;

    button.innerHTML = 'Get Random Dog!';
    button.disabled = false;
}