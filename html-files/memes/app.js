const topTexts = ["WHEN YOU", "ME WHEN", "HOW I FEEL", "WHEN MOM SAYS", "ME TRYING TO"];
const bottomTexts = ["FINISH HOMEWORK", "GET ICE CREAM", "PLAY GAMES", "EAT PIZZA", "GO TO BED"];
let currentMeme = "";

async function initApp() {
    const result = document.getElementById('result');
    result.innerHTML = '';
}

async function loadRandomImage() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    const meme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
    currentMeme = meme.url;

    updateMemeDisplay();

    button.innerHTML = 'New Image! 🖼️';
    button.disabled = false;
}

function loadRandomText() {
    const topText = topTexts[Math.floor(Math.random() * topTexts.length)];
    const bottomText = bottomTexts[Math.floor(Math.random() * bottomTexts.length)];

    document.getElementById('topText').value = topText;
    document.getElementById('bottomText').value = bottomText;

    if (currentMeme) updateMemeDisplay();
}

function updateMemeText() {
    if (currentMeme) updateMemeDisplay();
}

function updateMemeDisplay() {
    const topText = document.getElementById('topText').value.toUpperCase();
    const bottomText = document.getElementById('bottomText').value.toUpperCase();
    const result = document.getElementById('result');
    const downloadBtn = document.getElementById('downloadBtn');

    result.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-2xl shadow-2xl">
            <div id="memeContainer" style="position: relative; display: flex; justify-content: center; align-items: center; max-width: 500px; margin: 0 auto;">
                <img id="memeImage" src="${currentMeme}" alt="Meme" style="width: 100%; height: auto; max-height: 400px; object-fit: contain; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
                <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); color: white; font-weight: 900; font-size: clamp(16px, 4vw, 28px); text-shadow: 3px 3px 6px black, -1px -1px 2px black; text-align: center; width: 95%; line-height: 1.1; font-family: Impact, Arial Black, sans-serif; letter-spacing: 1px;">${topText}</div>
                <div style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); color: white; font-weight: 900; font-size: clamp(16px, 4vw, 28px); text-shadow: 3px 3px 6px black, -1px -1px 2px black; text-align: center; width: 95%; line-height: 1.1; font-family: Impact, Arial Black, sans-serif; letter-spacing: 1px;">${bottomText}</div>
            </div>
        </div>
    `;

    // Show download button when meme is displayed
    downloadBtn.style.display = 'block';
}

// Download functionality
function downloadMeme() {
    const memeContainer = document.getElementById('memeContainer');
    const memeImage = document.getElementById('memeImage');

    if (!memeContainer || !memeImage) return;

    // Create canvas for meme generation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Create new image to ensure it's loaded
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS

    img.onload = function() {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Set up text styling
        const topText = document.getElementById('topText').value.toUpperCase();
        const bottomText = document.getElementById('bottomText').value.toUpperCase();

        const fontSize = Math.max(img.width / 15, 20);
        ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = fontSize / 15;
        ctx.textAlign = 'center';
        ctx.letterSpacing = '1px';

        // Draw top text
        if (topText) {
            const x = canvas.width / 2;
            const y = fontSize + 20;
            ctx.strokeText(topText, x, y);
            ctx.fillText(topText, x, y);
        }

        // Draw bottom text
        if (bottomText) {
            const x = canvas.width / 2;
            const y = canvas.height - 20;
            ctx.strokeText(bottomText, x, y);
            ctx.fillText(bottomText, x, y);
        }

        // Download the image
        const link = document.createElement('a');
        link.download = `meme-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    // Handle CORS by trying to load through a proxy or fallback
    img.onerror = function() {
        alert('Unable to download meme. The image may be from a different domain that blocks downloads.');
    };

    img.src = currentMeme;
}