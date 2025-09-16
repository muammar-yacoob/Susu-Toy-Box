async function initApp() {
    const result = document.getElementById('result');
    result.innerHTML = '';
}

async function mainFunction() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner loading-sm"></span>';
    button.disabled = true;

    const names = [
        "Bubbles McFluffington", "Sir Wigglesworth", "Captain Noodle", "Princess Sparklebutt",
        "Duke Picklesworth", "Lady Gigglesnort", "Baron Von Snuggles", "Countess Tickletush",
        "Professor Bumblebee", "Madame Wobblebottom", "General Fluffernutter", "Admiral Cuddlesworth",
        "Sir Reginald Fluffington III", "Lady Penelope Gigglesworth", "Captain Bartholomew Snuggles",
        "Dame Wobblepants", "Lord Gigglesnort", "Miss Fluffernutter", "Dr. Snugglesworth",
        "Count Picklesworth", "Duchess Sparklebutt", "Baroness Noodlehead", "Sir Tickletush",
        "Lady McFluffington", "Captain Gigglesworth", "Professor Snuggles", "Madame Wobblebottom"
    ];

    const selectedNames = [];
    const usedIndices = new Set();
    
    while (selectedNames.length < 5) {
        const randomIndex = Math.floor(Math.random() * names.length);
        if (!usedIndices.has(randomIndex)) {
            selectedNames.push(names[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }

    const namesList = selectedNames.map((name, index) => 
        `<div onclick="copyToClipboard('${name}')" class="flex items-center gap-2 p-3 bg-base-200 rounded-lg text-sm hover:bg-base-300 hover:scale-105 transition-all duration-200" style="cursor: pointer;">
            <span class="text-primary font-bold">${index + 1}.</span>
            <span class="flex-1">${name}</span>
        </div>`
    ).join('');

    result.innerHTML = `<div class="space-y-1">${namesList}</div>`;

    button.innerHTML = 'Generate Names!';
    button.disabled = false;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied!');
    });
}

function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'alert alert-success';
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1000);
}