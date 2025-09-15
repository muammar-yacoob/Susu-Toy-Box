// Funny Name Generator for Kids!

// Name generation functions using common APIs and patterns
const nameGenerators = {
    random: () => generateRandomName(),
    character: () => generateCharacterName(),
    pet: () => generatePetName(),
    dogs: () => generateDogName(),
    cats: () => generateCatName(),
    players: () => generatePlayerName(),
    superhero: () => generateSuperheroName(),
    pirate: () => generatePirateName(),
    wizard: () => generateWizardName(),
    robot: () => generateRobotName(),
    dragon: () => generateDragonName(),
    unicorn: () => generateUnicornName()
};

// Random funny names
const randomNames = [
    "Bubbles McFluffington", "Sir Wigglesworth", "Captain Noodle", "Princess Sparklebutt",
    "Duke Picklesworth", "Lady Gigglesnort", "Baron Von Snuggles", "Countess Tickletush",
    "Professor Bumblebee", "Madame Wobblebottom", "General Fluffernutter", "Admiral Cuddlesworth"
];

// Character names
const characterNames = [
    "Sir Reginald Fluffington III", "Lady Penelope Gigglesworth", "Captain Bartholomew Snuggles",
    "Princess Anastasia Sparklebutt", "Duke Archibald Ticklepants", "Countess Wilhelmina Wobblebottom",
    "Baron Cornelius Fluffernutter", "Madame Beatrice Cuddlesworth", "Professor Thaddeus Bumblebee",
    "General Montgomery Wigglesworth", "Admiral Percival Gigglesnort", "Lady Cordelia Picklesworth"
];

// Pet names
const petNames = [
    "Fluffy McSnuggles", "Sir Barksalot", "Princess Purrington", "Captain Woofington",
    "Lady Meowington", "Duke Fluffernutter", "Countess Pawsalot", "Baron Snugglesworth",
    "Madame Whiskers", "Professor Tailswagger", "General Purrington", "Admiral Fluffypants"
];

// Superhero names
const superheroNames = [
    "Captain Gigglepants", "Super Snuggles", "The Tickling Tornado", "Professor Bumblebee",
    "Lady Sparklebutt", "Sir Fluffernutter", "The Giggling Guardian", "Madame Wobblebottom",
    "Baron Von Snuggles", "Countess Cuddlesworth", "General Fluffington", "Admiral Ticklepants"
];

// Pirate names
const pirateNames = [
    "Captain Fluffbeard", "Sir Snugglesworth", "Lady Gigglesnort", "Baron Von Ticklepants",
    "Madame Wobblebottom", "Professor Cuddlesworth", "General Fluffernutter", "Admiral Bumblebee",
    "Countess Sparklebutt", "Duke Wigglesworth", "Captain Purrington", "Lady Barksalot"
];

// Wizard names
const wizardNames = [
    "Gandalf the Giggling", "Merlin McSnuggles", "Professor Fluffernutter", "Madame Sparklebutt",
    "Sir Wobblebottom", "Lady Cuddlesworth", "Baron Von Ticklepants", "Countess Bumblebee",
    "General Wigglesworth", "Admiral Purrington", "Captain Gigglesnort", "Duke Fluffington"
];

// Dog names
const dogNames = [
    "Sir Barkington", "Lady Wooflesworth", "Captain Fluffernutter", "Princess Snuggles",
    "Duke Tailswagger", "Countess Pawsalot", "Baron Von Barkington", "Madame Wagglebottom",
    "General Fluffypants", "Admiral Snifflesworth", "Professor Droolington", "Major Wigglebutt"
];

// Cat names
const catNames = [
    "Sir Purrington", "Lady Meowington", "Captain Whiskersworth", "Princess Fluffernutter",
    "Duke Snugglesworth", "Countess Purrington", "Baron Von Meowington", "Madame Whiskers",
    "General Fluffington", "Admiral Purrington", "Professor Tailswagger", "Major Snuggles"
];

// Gaming player names
const playerNames = [
    "ProGamer123", "EpicSlayer99", "MegaWizard42", "SuperNinja88", "UltraWarrior77",
    "LegendaryHero66", "MysticMage55", "ShadowHunter44", "FireDragon33", "IceQueen22",
    "ThunderStrike11", "LightningBolt00"
];

// Robot names
const robotNames = [
    "Robo-Sparkles", "Cyber-Snuggles", "Digital-Giggles", "Quantum-Fluffernutter",
    "Binary-Bumblebee", "Circuit-Cuddlesworth", "Pixel-Purrington", "Data-Droolington",
    "Logic-Laughington", "Algorithm-Awesomeness", "Code-Cuteness", "Program-Pawsalot"
];

// Dragon names
const dragonNames = [
    "Flame-Sparkles", "Fire-Snuggles", "Blaze-Giggles", "Ember-Fluffernutter",
    "Inferno-Bumblebee", "Scorch-Cuddlesworth", "Burn-Purrington", "Heat-Droolington",
    "Flame-Laughington", "Fire-Awesomeness", "Blaze-Cuteness", "Ember-Pawsalot"
];

// Unicorn names
const unicornNames = [
    "Sparkle-Magic", "Rainbow-Snuggles", "Star-Giggles", "Moon-Fluffernutter",
    "Cosmic-Bumblebee", "Galaxy-Cuddlesworth", "Nebula-Purrington", "Stardust-Droolington",
    "Aurora-Laughington", "Celestial-Awesomeness", "Mystic-Cuteness", "Enchanted-Pawsalot"
];

// Generate random funny name
function generateRandomName() {
    const names = randomNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Random Funny Name",
        description: "A completely random and hilarious name!"
    };
}

// Generate character name
function generateCharacterName() {
    const names = characterNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Character Name",
        description: "Perfect for your next story character!"
    };
}

// Generate pet name
function generatePetName() {
    const names = petNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Pet Name",
        description: "Great name for your furry friend!"
    };
}

// Generate superhero name
function generateSuperheroName() {
    const names = superheroNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Superhero Name",
        description: "Ready to save the day with style!"
    };
}

// Generate pirate name
function generatePirateName() {
    const names = pirateNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Pirate Name",
        description: "Ahoy! Perfect for sailing the seven seas!"
    };
}

// Generate wizard name
function generateWizardName() {
    const names = wizardNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Wizard Name",
        description: "Magical name for casting spells!"
    };
}

// Generate dog name
function generateDogName() {
    const names = dogNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Dog Name",
        description: "Perfect name for your furry best friend!"
    };
}

// Generate cat name
function generateCatName() {
    const names = catNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Cat Name",
        description: "Great name for your purring companion!"
    };
}

// Generate gaming player name
function generatePlayerName() {
    const names = playerNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Gaming Player Name",
        description: "Epic name for dominating the leaderboards!"
    };
}

// Generate robot name
function generateRobotName() {
    const names = robotNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Robot Name",
        description: "Futuristic name for your mechanical friend!"
    };
}

// Generate dragon name
function generateDragonName() {
    const names = dragonNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Dragon Name",
        description: "Mystical name for your fire-breathing companion!"
    };
}

// Generate unicorn name
function generateUnicornName() {
    const names = unicornNames;
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        type: "Unicorn Name",
        description: "Magical name for your rainbow-horned friend!"
    };
}

// Generate 5 funny names
function generateFunnyNames() {
    const nameType = document.getElementById('nameType').value;
    const resultDiv = document.getElementById('nameResult');
    
    // Show loading
    resultDiv.innerHTML = '<div class="loading">🎪 Generating 5 funny names... ⏳</div>';
    
    // Simulate API delay
    setTimeout(() => {
        try {
            const names = [];
            for (let i = 0; i < 5; i++) {
                names.push(nameGenerators[nameType]());
            }
            displayMultipleNames(names);
        } catch (error) {
            console.error('Error generating names:', error);
            resultDiv.innerHTML = '<div style="color: #e74c3c; font-size: 18px; padding: 15px;">😞 Oops! Something went wrong. Please try again!</div>';
        }
    }, 1200);
}

// Display a single name
function displayName(nameData) {
    const resultDiv = document.getElementById('nameResult');
    
    const html = `
        <div class="name-card">
            <div class="name-text">${nameData.name}</div>
            <div class="name-type">${nameData.type}</div>
            <div class="name-description">${nameData.description}</div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
}

// Display multiple names
function displayMultipleNames(names) {
    const resultDiv = document.getElementById('nameResult');
    
    let html = '<div style="margin-bottom: 20px; font-size: 18px; color: #ffd700; font-weight: bold;">🎪 Here are your 5 funny names:</div>';
    
    names.forEach((nameData, index) => {
        html += `
            <div class="name-card">
                <div class="name-text">${nameData.name}</div>
                <div class="name-type">${nameData.type}</div>
            </div>
        `;
    });
    
    resultDiv.innerHTML = html;
}

// Initialize the app
window.onload = function() {
    console.log('Funny Name Generator loaded! Ready to create hilarious names! 😄');
};
