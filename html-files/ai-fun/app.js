async function mainFunction() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What do you call a fake noodle? An impasta!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
        "Why don't skeletons fight each other? They don't have the guts!",
        "What do you call a bear with no teeth? A gummy bear!"
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    result.innerHTML = `
        <div class="bg-gray-700 p-4 rounded-lg text-white">
            <p>${randomJoke}</p>
        </div>
    `;

    button.innerHTML = 'Generate Fun Content!';
    button.disabled = false;
}