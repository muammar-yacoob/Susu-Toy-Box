let dogImages = [];
let currentIndex = 0;

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
}

function GetData(action) {
    if (dogImages.length === 0) return null;

    if (action === 'next') {
        currentIndex = (currentIndex + 1) % dogImages.length;
    }

    return dogImages[currentIndex];
}