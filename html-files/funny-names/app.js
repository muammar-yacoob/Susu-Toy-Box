async function mainFunction() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const names = [
        "Bubbles McFluffington", "Sir Wigglesworth", "Captain Noodle", "Princess Sparklebutt",
        "Duke Picklesworth", "Lady Gigglesnort", "Baron Von Snuggles", "Countess Tickletush",
        "Professor Bumblebee", "Madame Wobblebottom", "General Fluffernutter", "Admiral Cuddlesworth",
        "Sir Reginald Fluffington III", "Lady Penelope Gigglesworth", "Captain Bartholomew Snuggles"
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];

    result.innerHTML = `
        <div class="bg-gray-700 p-4 rounded-lg text-white">
            <h3 class="font-bold mb-2">Your Funny Name! 😄</h3>
            <p class="text-xl font-bold text-yellow-300">${randomName}</p>
            <p class="text-sm mt-2">Perfect for characters, pets, or just for fun!</p>
        </div>
    `;

    button.innerHTML = 'Generate Funny Name!';
    button.disabled = false;
}