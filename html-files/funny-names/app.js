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

function shareApp() {
    const shareText = 'Check out this hilarious Funny Name Generator! 😄';
    const shareUrl = 'https://yoursite.com/html-files/funny-names/';
    
    if (navigator.share) {
        navigator.share({
            title: 'Funny Name Generator',
            text: shareText,
            url: shareUrl
        });
    } else {
        showShareModal(shareText, shareUrl);
    }
}

function showShareModal(text, url) {
    const modal = document.createElement('div');
    modal.className = 'modal modal-open';
    modal.innerHTML = `
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-4">Share This App</h3>
            <div class="grid grid-cols-2 gap-3">
                <button onclick="shareToWhatsApp('${text}', '${url}')" class="btn btn-success btn-sm">
                    📱 WhatsApp
                </button>
                <button onclick="shareToInstagram('${text}', '${url}')" class="btn btn-sm" style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);">
                    📸 Instagram
                </button>
                <button onclick="shareToFacebook('${url}')" class="btn btn-primary btn-sm">
                    👥 Facebook
                </button>
                <button onclick="shareToTwitter('${text}', '${url}')" class="btn btn-info btn-sm">
                    🐦 Twitter
                </button>
                <button onclick="shareToTelegram('${text}', '${url}')" class="btn btn-sm" style="background: #0088CC;">
                    ✈️ Telegram
                </button>
                <button onclick="copyToClipboard('${text}', '${url}')" class="btn btn-secondary btn-sm">
                    📋 Copy Link
                </button>
            </div>
            <div class="modal-action">
                <button onclick="this.closest('.modal').remove()" class="btn">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function shareToWhatsApp(text, url) {
    const message = `${text}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    document.querySelector('.modal').remove();
}

function shareToInstagram(text, url) {
    const message = `${text}\n\n${url}\n\n#FunnyNames #NameGenerator #SusuApps`;
    navigator.clipboard.writeText(message).then(() => {
        alert('Link copied! Paste it in your Instagram story or post 📸');
        document.querySelector('.modal').remove();
    });
}

function shareToFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    document.querySelector('.modal').remove();
}

function shareToTwitter(text, url) {
    const tweet = `${text}\n\n${url}\n\n#FunnyNames #NameGenerator #SusuApps`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
    document.querySelector('.modal').remove();
}

function shareToTelegram(text, url) {
    const message = `${text}\n\n${url}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    document.querySelector('.modal').remove();
}

function copyToClipboard(text, url) {
    const message = `${text}\n\n${url}`;
    navigator.clipboard.writeText(message).then(() => {
        showToast('Link copied to clipboard! 📋');
        document.querySelector('.modal').remove();
    });
}