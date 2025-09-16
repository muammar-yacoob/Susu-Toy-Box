async function getCat() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();

    result.innerHTML = `
        <img src="${data[0].url}" alt="Random Cat" width="250" class="rounded-lg mx-auto"/>
    `;

    button.innerHTML = 'Get Random Cat!';
    button.disabled = false;
}

