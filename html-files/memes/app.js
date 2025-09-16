async function mainFunction() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();

    const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];

    result.innerHTML = `
        <div class="bg-gray-700 p-4 rounded-lg text-white">
            <h3 class="font-bold mb-2">Random Meme! 😂</h3>
            <img src="${randomMeme.url}" alt="Random meme" class="w-full rounded-lg mb-2" style="max-width: 300px;">
            <p class="text-sm text-gray-300">${randomMeme.name}</p>
        </div>
    `;

    button.innerHTML = 'Generate Random Meme!';
    button.disabled = false;
}