async function initApp() {
    const result = document.getElementById('result');
    result.innerHTML = '';
    
    // Generate names immediately on page load
    generateSelectedNames();
}


async function generateSelectedNames() {
    const result = document.getElementById('result');
    const select = document.getElementById('nameType');
    const selectedType = select.value;

    result.innerHTML = '<div class="flex justify-center"><span class="loading loading-spinner loading-md"></span></div>';

    const allNames = {
        funny: [
            "Bubbles McFluffington", "Sir Wigglesworth", "Captain Noodle", "Princess Sparklebutt",
            "Duke Picklesworth", "Lady Gigglesnort", "Baron Von Snuggles", "Countess Tickletush",
            "Professor Bumblebee", "Madame Wobblebottom", "General Fluffernutter", "Admiral Cuddlesworth",
            "Sir Reginald Fluffington III", "Lady Penelope Gigglesworth", "Captain Bartholomew Snuggles",
            "Dame Wobblepants", "Lord Gigglesnort", "Miss Fluffernutter", "Dr. Snugglesworth",
            "Count Picklesworth", "Duchess Sparklebutt", "Baroness Noodlehead", "Sir Tickletush",
            "Lady McFluffington", "Captain Gigglesworth", "Professor Snuggles", "Madame Wobblebottom"
        ],
        games: [
            "ShadowStrike", "DragonSlayer99", "PixelWarrior", "CyberNinja", "MysticMage",
            "BlazeRunner", "StormBreaker", "FrostWolf", "ThunderBolt", "FireStorm",
            "NightHawk", "SteelFist", "CrimsonBlade", "VoidWalker", "LightningStrike"
        ],
        social: [
            "CoolCat2024", "SunshineSmile", "DreamChaser", "HappyVibes", "StarGazer",
            "OceanWave", "MountainPeak", "CityLights", "NightOwl", "MorningStar",
            "GoldenHeart", "SilverLining", "BlueSky", "GreenThumb", "PurpleRain"
        ],
        pets: [
            "FluffyButt", "Sir Barksalot", "Princess Whiskers", "Captain Fluff", "Lady Purr",
            "Duke Wagtail", "Count Meow", "Baron Woofington", "Duchess Snuggles", "Lord Paws",
            "Miss Fuzzball", "General Cuddles", "Admiral Purrington", "Colonel Fluffernut", "Major Snuggles"
        ],
        fantasy: [
            "Aelindra Moonwhisper", "Thorin Ironbeard", "Luna Shadowdancer", "Phoenix Rising",
            "Sage Windcaller", "Raven Darkwing", "Starweaver", "Stormchaser", "Crystal Heart", "Ember Flame",
            "Aria Starborn", "Kael Fireheart", "Zara Moonstone", "Eldric Stormwind", "Nyx Shadowbane"
        ],
        tech: [
            "CodeNinja", "ByteMaster", "PixelPioneer", "DataDragon", "CloudWalker",
            "BinaryBeast", "CyberSage", "QuantumLeap", "NeuralNet", "DigitalDream",
            "AlgorithmAce", "SyntaxSage", "DebugMaster", "FrameworkFury", "APIAssassin"
        ]
    };

    const categoryEmojis = {
        funny: "🎭",
        games: "🎮",
        social: "📱", 
        pets: "🐾",
        fantasy: "🧙‍♂️",
        tech: "💻"
    };

    const categoryNames = allNames[selectedType];
    const selectedNames = [];
    const usedIndices = new Set();
    
    while (selectedNames.length < 10) {
        const randomIndex = Math.floor(Math.random() * categoryNames.length);
        if (!usedIndices.has(randomIndex)) {
            selectedNames.push(categoryNames[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }

    const namesList = selectedNames.map((name, index) => 
        `<div onclick="copyToClipboard('${name}')" class="flex items-center gap-2 p-3 bg-base-200 rounded-lg text-sm hover:bg-base-300 hover:scale-105 transition-all duration-200" style="cursor: pointer;">
            <span class="text-primary font-bold">${index + 1}.</span>
            <span class="flex-1">${name}</span>
        </div>`
    ).join('');

    result.innerHTML = `
        <div class="text-center mb-3">
            <span class="badge badge-primary">${categoryEmojis[selectedType]} ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Names</span>
        </div>
        <div class="space-y-1">${namesList}</div>
    `;
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
