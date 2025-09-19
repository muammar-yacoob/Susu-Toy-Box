let dogImages = [];
let currentIndex = 0;

function updateMetaTags() {
    // Use the enhanced config to generate all social media meta tags
    AppConfig.generateSocialMetaTags('dog-pics');
}

async function initializeDogData() {
    for (let i = 0; i < 10; i++) {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const breedName = data.message.split('/')[4].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        dogImages.push({
            imageUrl: data.message,
            breedName: breedName
        });
    }
    
    // Show first dog picture immediately
    if (dogImages.length > 0) {
        const firstDog = dogImages[0];
        document.querySelector('#result img').src = firstDog.imageUrl;
        document.querySelector('#result img').alt = firstDog.breedName;
        document.querySelector('#result .breed-name').textContent = firstDog.breedName;
    }
}

function GetData(action) {
    if (dogImages.length === 0) return null;

    if (action === 'next') {
        currentIndex = (currentIndex + 1) % dogImages.length;
    }

    return dogImages[currentIndex];
}

function shareApp() {
    const currentData = dogImages[currentIndex];
    const breedName = currentData ? currentData.breedName : 'Random Dog';
    const shareText = `Check out this adorable ${breedName}! 🐕`;
    const shareUrl = AppConfig.getAppUrl('/html-files/dog-pics/');
    
    if (navigator.share) {
        navigator.share({
            title: 'Dog Picture Generator',
            text: shareText,
            url: shareUrl
        });
    } else {
        showShareModal(shareText, shareUrl, currentData?.imageUrl);
    }
}

function showShareModal(text, url, imageUrl) {
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
    const message = `${text}\n\n${url}\n\n#DogPics #CuteDogs #SusuApps`;
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
    const tweet = `${text}\n\n${url}\n\n#DogPics #CuteDogs #SusuApps`;
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
        alert('Link copied to clipboard! 📋');
        document.querySelector('.modal').remove();
    });
}