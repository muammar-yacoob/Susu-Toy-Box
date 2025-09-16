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

    result.innerHTML = `
        <div class="bg-gray-700 p-4 rounded-lg text-white">
            <div style="position: relative; display: inline-block; max-width: 350px; margin: 0 auto;">
                <img src="${currentMeme}" alt="Meme" style="width: 100%; height: auto; max-height: 250px; object-fit: contain; border-radius: 8px;">
                <div style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); color: white; font-weight: bold; font-size: 20px; text-shadow: 2px 2px 4px black; text-align: center; width: 90%; line-height: 1.1;">${topText}</div>
                <div style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); color: white; font-weight: bold; font-size: 20px; text-shadow: 2px 2px 4px black; text-align: center; width: 90%; line-height: 1.1;">${bottomText}</div>
            </div>
        </div>
    `;
}