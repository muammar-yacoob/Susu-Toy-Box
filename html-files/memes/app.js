// Meme Generator - Simple JavaScript for kids!

// Fun meme prompts for kids to try
const funMemePrompts = [
    "cats being silly and funny", 
    "dogs doing funny things", 
    "funny animals dancing", 
    "surprised face reactions", 
    "happy celebration moments", 
    "confused expressions", 
    "excited reactions", 
    "sleepy animals", 
    "funny food moments", 
    "cute baby animals",
    "pointing and approving",
    "difficult choice",
    "looking at something",
    "running away",
    "drawing cards",
    "change my mind",
    "same picture",
    "everywhere"
];

// Predefined memes for offline use
const offlineMemes = [
    { 
        id: "181913649", 
        name: "Drake Pointing", 
        url: "https://i.imgflip.com/30b1gx.jpg", 
        description: "Drake pointing and approving", 
        tags: ["drake", "pointing", "approve", "choice", "decision", "yes", "no", "like", "dislike", "good", "bad", "thumbs", "up", "down", "agree", "disagree", "prefer", "rather", "approval", "rejection"]
    },
    { 
        id: "87743020", 
        name: "Two Buttons", 
        url: "https://i.imgflip.com/1g8my4.jpg", 
        description: "Difficult choice between two buttons", 
        tags: ["choice", "decision", "buttons", "difficult", "confused", "hard", "choose", "pick", "dilemma", "problem", "trouble", "stuck", "can't", "decide", "both", "options", "select"]
    },
    { 
        id: "112126428", 
        name: "Distracted Boyfriend", 
        url: "https://i.imgflip.com/1ur9b0.jpg", 
        description: "Boyfriend looking at another girl", 
        tags: ["distracted", "boyfriend", "looking", "choice", "funny", "tempted", "want", "desire", "girlfriend", "cheating", "attracted", "interested", "attention", "focus", "staring", "notice"]
    },
    { 
        id: "131087935", 
        name: "Running Away Balloon", 
        url: "https://i.imgflip.com/26am.jpg", 
        description: "Person chasing after balloon", 
        tags: ["running", "balloon", "chase", "away", "funny", "escape", "lost", "gone", "catch", "flying", "floating", "trying", "reach", "grab", "miss", "almost"]
    },
    { 
        id: "217743513", 
        name: "UNO Draw 25 Cards", 
        url: "https://i.imgflip.com/3lmzyx.jpg", 
        description: "Choice between doing something or drawing 25 cards", 
        tags: ["uno", "cards", "choice", "decision", "game", "rather", "prefer", "avoid", "skip", "punishment", "consequence", "instead", "better", "option", "draw", "pick"]
    },
    { 
        id: "129242436", 
        name: "Change My Mind", 
        url: "https://i.imgflip.com/24y43o.jpg", 
        description: "Person sitting at table with sign", 
        tags: ["change", "mind", "opinion", "debate", "convince", "prove", "argument", "right", "wrong", "table", "sign", "sitting", "challenge", "disagree", "persuade"]
    },
    { 
        id: "180190441", 
        name: "They're The Same Picture", 
        url: "https://i.imgflip.com/2za3u1.jpg", 
        description: "Corporate asking to find differences", 
        tags: ["same", "picture", "difference", "corporate", "identical", "similar", "alike", "equal", "spot", "find", "look", "exactly", "twin", "copy", "duplicate"]
    },
    { 
        id: "91538330", 
        name: "X, X Everywhere", 
        url: "https://i.imgflip.com/1ihzfe.jpg", 
        description: "Buzz Lightyear pointing everywhere", 
        tags: ["everywhere", "buzz", "lightyear", "pointing", "all", "lots", "many", "full", "covered", "space", "toys", "story", "infinity", "beyond", "spread", "around"]
    }
];

// Pick random item from a list
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// Find memes based on description
function findMeme() {
    const memeBox = document.getElementById('memeResult');
    const description = document.getElementById('memePrompt').value.trim().toLowerCase();

    if (!description) return memeBox.innerHTML = '<div style="color: #e74c3c;">Please describe what kind of meme you want! 😂</div>';

    // Show loading message
    memeBox.innerHTML = '<div style="color: #666; font-size: 18px;">😂 Finding your meme... 🔍</div>';

    // Wait a moment, then find a matching meme
    setTimeout(() => {
        let foundMeme = null;
        let bestMatch = null;
        let bestScore = 0;

        // Try to find a meme that matches the description
        for (let meme of offlineMemes) {
            let score = 0;
            const descriptionWords = description.split(' ').filter(word => word.length > 2);

            // Check each tag for matches
            for (let tag of meme.tags) {
                // Check if description contains the tag or tag contains any word from description
                for (let word of descriptionWords) {
                    if (tag.includes(word) || word.includes(tag)) {
                        score += 2; // Direct match
                    } else if (tag.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(tag.toLowerCase())) {
                        score += 1; // Case-insensitive match
                    }
                }
            }

            // Also check meme name and description for matches
            if (meme.name.toLowerCase().includes(description) || description.includes(meme.name.toLowerCase())) {
                score += 3; // Name match gets higher score
            }
            if (meme.description.toLowerCase().includes(description) || description.includes(meme.description.toLowerCase())) {
                score += 2; // Description match
            }

            // Keep track of the best match
            if (score > bestScore) {
                bestScore = score;
                bestMatch = meme;
            }
        }

        // Use best match if we found any matches, otherwise pick random
        foundMeme = bestMatch || pickRandom(offlineMemes);

        displayMeme(foundMeme, description);
    }, 1000);
}

// Get a completely random meme
function getRandomMeme() {
    const memeBox = document.getElementById('memeResult');

    memeBox.innerHTML = '<div style="color: #666; font-size: 18px;">🎲 Getting random meme... 😄</div>';

    setTimeout(() => displayMeme(pickRandom(offlineMemes), "random meme"), 800);
}

// Function to display a meme
function displayMeme(meme, searchTerm) {
    const memeBox = document.getElementById('memeResult');

    memeBox.innerHTML = `
        <div class="meme-container">
            <h3>😂 Found Your Meme!</h3>
            <img src="${meme.url}" alt="${meme.name}" onload="this.style.opacity=1" style="opacity:0; transition: opacity 0.5s;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjhmOCIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1lbWUgTm90IEZvdW5kIDpbPC90ZXh0Pgo8L3N2Zz4K'; this.style.opacity=1;">
            <div class="meme-title">${meme.name}</div>
            <div class="meme-author">${meme.description}</div>
            <p style="font-style: italic; color: #666;">✨ Found for: "${searchTerm}"</p>
            <p>Try searching for something else! 🔍</p>
            <button onclick="document.getElementById('memePrompt').value = pickRandom(funMemePrompts); findMeme();" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border: none; padding: 10px 15px; border-radius: 10px; color: white; cursor: pointer; margin: 5px;">
                Random Search! 🎯
            </button>
            <button onclick="getRandomMeme();" style="background: linear-gradient(45deg, #feca57, #ff9ff3); border: none; padding: 10px 15px; border-radius: 10px; color: white; cursor: pointer; margin: 5px;">
                Another Random! 🎲
            </button>
        </div>
    `;

    // Make the meme box appear with animation
    memeBox.style.transform = 'scale(1.05)';
    setTimeout(() => {
        memeBox.style.transform = 'scale(1)';
    }, 200);
}

// Show welcome message when page loads
const showWelcomeMessage = () => document.getElementById('memeResult').innerHTML = '<div style="color: #666; font-size: 16px; padding: 15px;">😂 Welcome to the Meme Generator! Describe what kind of funny meme you want above! 🎭</div>';
window.onload = showWelcomeMessage;
window.onload = showWelcomeMessage;