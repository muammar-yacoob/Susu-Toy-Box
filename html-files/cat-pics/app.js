async function getCat() {
    const result = document.getElementById('result');
    const button = document.querySelector('button[onclick="getCat()"]');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();

    result.innerHTML = `
        <div class="flex flex-col items-center justify-center space-y-4">
            <div class="relative">
                <img src="${data[0].url}" alt="Random Cat" class="max-w-80 max-h-80 w-auto h-auto rounded-lg shadow-lg"/>
            </div>
        </div>
    `;

    button.innerHTML = 'Get Random Cat!';
    button.disabled = false;
}

