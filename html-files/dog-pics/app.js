async function getDog() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();

    result.innerHTML = `
        <img src="${data.message}" alt="Random Dog" width="250" class="rounded-lg mx-auto"/>
    `;

    button.innerHTML = 'Get Random Dog!';
    button.disabled = false;
}