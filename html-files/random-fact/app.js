async function mainFunction() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const data = await response.json();

    result.innerHTML = `
        <div class="bg-gray-700 p-4 rounded-lg text-white">
            <p>${data.text}</p>
        </div>
    `;

    button.innerHTML = 'Get Random Fact!';
    button.disabled = false;
}