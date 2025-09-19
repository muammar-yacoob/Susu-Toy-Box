const topTexts = ["WHEN YOU", "ME WHEN", "HOW I FEEL", "WHEN MOM SAYS", "ME TRYING TO"];
const bottomTexts = ["FINISH HOMEWORK", "GET ICE CREAM", "PLAY GAMES", "EAT PIZZA", "GO TO BED"];
let currentMeme = "";

async function initApp() {
    const result = document.getElementById('result');
    result.innerHTML = '';

    // Load a random meme on initial load
    await loadRandomImage();
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
    const shareBtn = document.getElementById('shareBtn');

    result.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-2xl shadow-2xl mx-auto" style="max-width: fit-content;">
            <div id="memeContainer" style="position: relative; display: flex; justify-content: center; align-items: center; max-width: 100%; margin: 0 auto;">
                <img id="memeImage" src="${currentMeme}" alt="Meme" style="width: 100%; height: auto; max-width: 500px; max-height: 400px; object-fit: contain; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" onload="adjustFontSize()">
                <div id="topTextDiv" style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); color: white; font-weight: 900; text-shadow: 3px 3px 6px black, -1px -1px 2px black; text-align: center; width: 95%; line-height: 1.1; font-family: Impact, Arial Black, sans-serif; letter-spacing: 1px;">${topText}</div>
                <div id="bottomTextDiv" style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); color: white; font-weight: 900; text-shadow: 3px 3px 6px black, -1px -1px 2px black; text-align: center; width: 95%; line-height: 1.1; font-family: Impact, Arial Black, sans-serif; letter-spacing: 1px;">${bottomText}</div>
                <div id="watermarkDiv" style="position: absolute; bottom: 4px; right: 8px; color: rgba(255,255,255,0.7); font-size: 10px; font-family: Arial, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); letter-spacing: 0.5px;">sundus.fun</div>
            </div>
        </div>
    `;

    // Show download and share buttons when meme is displayed
    downloadBtn.style.display = 'block';
    shareBtn.style.display = 'block';
}

function adjustFontSize() {
    const memeImage = document.getElementById('memeImage');
    const topTextDiv = document.getElementById('topTextDiv');
    const bottomTextDiv = document.getElementById('bottomTextDiv');

    if (!memeImage || !topTextDiv || !bottomTextDiv) return;

    // Get the actual rendered width of the image
    const imageWidth = memeImage.getBoundingClientRect().width;

    // Calculate font size based on image width (roughly 1/15th of image width)
    const fontSize = Math.max(imageWidth / 15, 16);

    // Apply the calculated font size and ensure text wraps within image width
    const textStyle = {
        fontSize: fontSize + 'px',
        maxWidth: (imageWidth * 0.9) + 'px', // 90% of image width for padding
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto'
    };

    Object.assign(topTextDiv.style, textStyle);
    Object.assign(bottomTextDiv.style, textStyle);
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

        // Draw watermark
        const watermarkFontSize = Math.max(canvas.width / 80, 8);
        ctx.font = `${watermarkFontSize}px Arial, sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.strokeStyle = 'rgba(0,0,0,0.8)';
        ctx.lineWidth = watermarkFontSize / 8;
        ctx.textAlign = 'right';
        const watermarkX = canvas.width - 10;
        const watermarkY = canvas.height - 8;
        ctx.strokeText('sundus.fun', watermarkX, watermarkY);
        ctx.fillText('sundus.fun', watermarkX, watermarkY);

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

// Share functionality
async function shareMeme() {
    if (!currentMeme) return;

    try {
        // Create canvas for meme generation (similar to download function)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = async function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Add text and watermark (same as download function)
            const topText = document.getElementById('topText').value.toUpperCase();
            const bottomText = document.getElementById('bottomText').value.toUpperCase();

            const fontSize = Math.max(img.width / 15, 20);
            ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = fontSize / 15;
            ctx.textAlign = 'center';

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

            // Draw watermark
            const watermarkFontSize = Math.max(canvas.width / 80, 8);
            ctx.font = `${watermarkFontSize}px Arial, sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.strokeStyle = 'rgba(0,0,0,0.8)';
            ctx.lineWidth = watermarkFontSize / 8;
            ctx.textAlign = 'right';
            const watermarkX = canvas.width - 10;
            const watermarkY = canvas.height - 8;
            ctx.strokeText('sundus.fun', watermarkX, watermarkY);
            ctx.fillText('sundus.fun', watermarkX, watermarkY);

            // Convert canvas to blob
            canvas.toBlob(async (blob) => {
                if (navigator.share && navigator.canShare) {
                    // Use Web Share API if available
                    const file = new File([blob], `meme-${Date.now()}.png`, { type: 'image/png' });

                    if (navigator.canShare({ files: [file] })) {
                        try {
                            await navigator.share({
                                title: 'Check out this meme!',
                                text: 'Made with Meme Generator',
                                url: 'https://sundus.fun',
                                files: [file]
                            });
                        } catch (err) {
                            console.log('Share cancelled or failed:', err);
                        }
                    } else {
                        // Fallback to URL sharing
                        await navigator.share({
                            title: 'Check out this meme!',
                            text: 'Made with Meme Generator at sundus.fun',
                            url: 'https://sundus.fun'
                        });
                    }
                } else {
                    // Fallback: Copy to clipboard and show message
                    try {
                        const item = new ClipboardItem({ 'image/png': blob });
                        await navigator.clipboard.write([item]);
                        alert('Meme copied to clipboard! You can now paste it in your social media app.');
                    } catch (err) {
                        // Final fallback: show share text
                        const shareText = 'Check out this meme I made at sundus.fun!';
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            await navigator.clipboard.writeText(shareText);
                            alert('Share text copied to clipboard: "' + shareText + '"');
                        } else {
                            alert('Sharing not supported. Visit sundus.fun to create memes!');
                        }
                    }
                }
            }, 'image/png');
        };

        img.onerror = function() {
            alert('Unable to share meme. Please try downloading instead.');
        };

        img.src = currentMeme;
    } catch (error) {
        console.error('Share failed:', error);
        alert('Sharing failed. Please try downloading the meme instead.');
    }
}