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
        // Fallback to a simple meme if API fails
        return "https://i.imgflip.com/30b1gx.jpg";
    }
}

// Update text on the current meme image
function updateMemeText() {
    const topText = document.getElementById('topText').value.trim();
    const bottomText = document.getElementById('bottomText').value.trim();
    
    const topTextElement = document.getElementById('topTextElement');
    const bottomTextElement = document.getElementById('bottomTextElement');
    
    if (topTextElement) {
        topTextElement.textContent = topText.toUpperCase();
    }
    if (bottomTextElement) {
        bottomTextElement.textContent = bottomText.toUpperCase();
    }
}

// Load a random image (keeps current text)
async function loadRandomImage() {
    const memeBox = document.getElementById('memeResult');
    
    // Show loading message
    memeBox.innerHTML = '<div style="color: #666; font-size: 18px;">🔄 Loading new image...</div>';
    
    // Get a new random meme image
    const randomImage = await getRandomMemeFromAPI();
    
    // Get current text
    const topText = document.getElementById('topText').value.trim() || "WHEN YOU";
    const bottomText = document.getElementById('bottomText').value.trim() || "FINISH HOMEWORK";
    
    // Create the meme with new image
    memeBox.innerHTML = `
        <div class="meme-container">
            <div class="meme-image-container">
                <img src="${randomImage}" alt="Meme" class="meme-image" id="memeImage">
                <div class="meme-text top-text" id="topTextElement">${topText.toUpperCase()}</div>
                <div class="meme-text bottom-text" id="bottomTextElement">${bottomText.toUpperCase()}</div>
            </div>
            <p style="color: #666; margin-top: 15px;">New image loaded! Change text above to update the meme! 🎉</p>
        </div>
    `;
}

// Load random text (keeps current image)
function loadRandomText() {
    const topText = pickRandom(topTexts);
    const bottomText = pickRandom(bottomTexts);
    
    // Update input fields
    document.getElementById('topText').value = topText;
    document.getElementById('bottomText').value = bottomText;
    
    // Update text on meme if it exists
    updateMemeText();
    
    // If no meme exists yet, create one
    const memeBox = document.getElementById('memeResult');
    if (!document.getElementById('memeImage')) {
        loadRandomImage();
    }
}

// Download the meme
async function downloadMeme() {
    const topText = document.getElementById('topText').value.trim();
    const bottomText = document.getElementById('bottomText').value.trim();
    
    if (!topText || !bottomText) {
        alert('Please create a meme first! 😂');
        return;
    }
    
    // Get the meme image
    const memeImage = document.getElementById('memeImage');
    if (!memeImage) {
        alert('Please create a meme first! 😂');
        return;
    }
    
    // Create filename
    const filename = `${topText.replace(/\s+/g, '_')}_${bottomText.replace(/\s+/g, '_')}_meme.jpg`;
    
    // Show loading message
    const memeBox = document.getElementById('memeResult');
    const originalContent = memeBox.innerHTML;
    memeBox.innerHTML = '<div style="color: #666; font-size: 18px;">💾 Preparing download...</div>';
    
    // Create canvas to draw the meme with text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Wait for image to load
    await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            // Set canvas size to image size
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw the image
            ctx.drawImage(img, 0, 0);
            
            // Set text properties
            ctx.font = `${Math.max(40, img.width / 15)}px Impact, Arial Black, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = Math.max(3, img.width / 200);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Draw top text
            const topY = img.height * 0.15;
            ctx.strokeText(topText.toUpperCase(), img.width / 2, topY);
            ctx.fillText(topText.toUpperCase(), img.width / 2, topY);
            
            // Draw bottom text
            const bottomY = img.height * 0.85;
            ctx.strokeText(bottomText.toUpperCase(), img.width / 2, bottomY);
            ctx.fillText(bottomText.toUpperCase(), img.width / 2, bottomY);
            
            resolve();
        };
        img.src = memeImage.src;
    });
    
    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        
        // Restore original content
        memeBox.innerHTML = originalContent;
        alert(`Meme downloaded as: ${filename} 🎉`);
    }, 'image/jpeg', 0.9);
}

// Show welcome message when page loads and set up event listeners
window.onload = function() {
    document.getElementById('memeResult').innerHTML = '<div style="color: #666; font-size: 16px; padding: 15px;">😂 Welcome! Write your funny text above and click "New Image!" to start! 🎭</div>';
    
    // Add event listeners to update text immediately when typing
    document.getElementById('topText').addEventListener('input', updateMemeText);
    document.getElementById('bottomText').addEventListener('input', updateMemeText);
};