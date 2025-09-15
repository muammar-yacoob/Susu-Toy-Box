// Simple Meme Generator for Kids!

// Keep track of current meme to avoid duplicates
let currentMemeUrl = "";
let memeHistory = []; // Keep track of recent memes

// Fun top text examples
const topTexts = [
    "WHEN YOU",
    "ME WHEN",
    "HOW I FEEL",
    "WHEN MOM SAYS",
    "ME TRYING TO",
    "WHEN THE TEACHER",
    "HOW I LOOK",
    "WHEN DAD",
    "ME AFTER",
    "WHEN YOU REALIZE"
];

// Fun bottom text examples
const bottomTexts = [
    "FINISH HOMEWORK",
    "GET ICE CREAM",
    "PLAY VIDEO GAMES",
    "EAT PIZZA",
    "GO TO BED",
    "CLEAN YOUR ROOM",
    "DO CHORES",
    "EAT VEGETABLES",
    "SHARE TOYS",
    "BE QUIET"
];

// Pick random item from a list
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// Get a random meme from API
async function getRandomMemeFromAPI() {
    try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        
        if (data.success && data.data.memes) {
            const memes = data.data.memes;
            let randomMeme;
            
            // Keep trying until we get a different meme
            do {
                randomMeme = pickRandom(memes);
            } while (randomMeme.url === currentMemeUrl && memes.length > 1);
            
            currentMemeUrl = randomMeme.url;
            
            // Add to history (keep only last 10)
            memeHistory.push(randomMeme.url);
            if (memeHistory.length > 10) {
                memeHistory.shift();
            }
            
            return randomMeme.url;
        } else {
            throw new Error('Failed to get memes from API');
        }
    } catch (error) {
        console.log('API failed, using backup meme');
        // Fallback to a simple meme if API fails
        return "https://i.imgflip.com/30b1gx.jpg";
    }
}

// Create a meme with top and bottom text
async function createMeme() {
    const topText = document.getElementById('topText').value.trim();
    const bottomText = document.getElementById('bottomText').value.trim();
    const memeBox = document.getElementById('memeResult');
    
    if (!topText || !bottomText) {
        memeBox.innerHTML = '<div style="color: #e74c3c; font-size: 18px;">Please write both top and bottom text! 😂</div>';
        return;
    }
    
    // Show loading message
    memeBox.innerHTML = '<div style="color: #666; font-size: 18px;">🎨 Creating your meme...</div>';
    
    // Get a random meme image from API
    const randomImage = await getRandomMemeFromAPI();
    
    // Create the meme
    memeBox.innerHTML = `
        <div class="meme-container">
            <div class="meme-image-container">
                <img src="${randomImage}" alt="Meme" class="meme-image" id="memeImage">
                <div class="meme-text top-text">${topText.toUpperCase()}</div>
                <div class="meme-text bottom-text">${bottomText.toUpperCase()}</div>
            </div>
            <p style="color: #666; margin-top: 15px;">Your meme is ready! Click download to save it! 🎉</p>
        </div>
    `;
}

// Create a random meme
async function randomMeme() {
    const topText = pickRandom(topTexts);
    const bottomText = pickRandom(bottomTexts);
    
    document.getElementById('topText').value = topText;
    document.getElementById('bottomText').value = bottomText;
    
    await createMeme();
}

// Shuffle to get a different meme image
async function shuffleMeme() {
    const topText = document.getElementById('topText').value.trim();
    const bottomText = document.getElementById('bottomText').value.trim();
    
    if (!topText || !bottomText) {
        alert('Please write both top and bottom text first! 😂');
        return;
    }
    
    // Show loading message
    const memeBox = document.getElementById('memeResult');
    memeBox.innerHTML = '<div style="color: #666; font-size: 18px;">🔄 Getting a different meme...</div>';
    
    // Get a new random meme image
    const randomImage = await getRandomMemeFromAPI();
    
    // Update the meme with new image
    memeBox.innerHTML = `
        <div class="meme-container">
            <div class="meme-image-container">
                <img src="${randomImage}" alt="Meme" class="meme-image" id="memeImage">
                <div class="meme-text top-text">${topText.toUpperCase()}</div>
                <div class="meme-text bottom-text">${bottomText.toUpperCase()}</div>
            </div>
            <p style="color: #666; margin-top: 15px;">New meme image! Click download to save it! 🎉</p>
        </div>
    `;
}

// Download the meme
function downloadMeme() {
    const topText = document.getElementById('topText').value.trim();
    const bottomText = document.getElementById('bottomText').value.trim();
    
    if (!topText || !bottomText) {
        alert('Please create a meme first! 😂');
        return;
    }
    
    // Create filename
    const filename = `${topText.replace(/\s+/g, '_')}_${bottomText.replace(/\s+/g, '_')}_meme.png`;
    
    // Get the meme image
    const memeImage = document.getElementById('memeImage');
    if (!memeImage) {
        alert('Please create a meme first! 😂');
        return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = memeImage.src;
    link.click();
    
    alert(`Meme downloaded as: ${filename} 🎉`);
}

// Show welcome message when page loads
window.onload = function() {
    document.getElementById('memeResult').innerHTML = '<div style="color: #666; font-size: 16px; padding: 15px;">😂 Welcome! Write your funny text above and create a meme! 🎭</div>';
};