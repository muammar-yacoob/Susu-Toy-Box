// 3D Model Viewer - Simple JavaScript for kids!

// List of cool animated 3D models from Spark Games
const sparkGamesModels = [
    { id: 'da15c2fb91fc4034a0658b89b8ebff17', title: 'Easter Egg - Animated', author: 'Spark Games', description: 'Cute animated Easter egg with fun movements', emoji: '🥚' },
    { id: '1590b14b34214d29b245d87609a4b299', title: 'Low-poly Chick - Rigged & Animated', author: 'Spark Games', description: 'Adorable animated chick with low-poly style', emoji: '🐤' },
    { id: '7e81491c647f4452943fa3072d2e3a68', title: 'Cute Animated Easter Bunny', author: 'Spark Games', description: 'Playful bunny with cute hopping animations', emoji: '🐰' },
    { id: 'bb0178b180e840549bb034972949dd1e', title: 'Voxel Fox', author: 'Spark Games', description: 'Blocky fox character with smooth animations', emoji: '🦊' },
    { id: 'd0f175b9c8ad470984080c1a4364c967', title: 'Santa Mid-night Snack - Animated', author: 'Spark Games', description: 'Santa enjoying a late night snack with animations', emoji: '🎅' },
    { id: 'bcdea5e7e4e74a4a9be2c39590c8dadf', title: 'Hello Kitty', author: 'Spark Games', description: 'Classic Hello Kitty character with animations', emoji: '🐱' },
    { id: 'ff0b15657a8040f0a96d680f52db1fe4', title: 'World\'s Best Dad Mug', author: 'Spark Games', description: 'Animated coffee mug for the best dad', emoji: '☕' }
];

// Keep track of current model to avoid repeats
let currentModelId = 'fddc038ff63544218433d14aa80135f3'; // BMO default

// Pick a random model that's different from current one
const pickRandomModel = () => {
    const availableModels = sparkGamesModels.filter(model => model.id !== currentModelId);
    return availableModels[Math.floor(Math.random() * availableModels.length)];
};

// Update the info box with model details
const updateModelInfo = (modelData) => {
    document.getElementById('modelInfo').innerHTML = `
        <h3>${modelData.emoji} ${modelData.title}</h3>
        <p><strong>Model by:</strong> ${modelData.author}</p>
        <p><strong>Description:</strong> ${modelData.description}</p>
        <p><strong>Features:</strong> Animated and interactive! 🎬</p>
        <button onclick="window.open('https://sketchfab.com/3d-models/${modelData.id}', '_blank')" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 10px 15px; border-radius: 10px; cursor: pointer; margin-top: 10px;">
            Go to Model Page 🔗
        </button>
    `;
};

// Create the embed HTML for a model (without attribution links)
const createEmbedHTML = (modelData) => `
    <iframe title="${modelData.title}" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/${modelData.id}/embed?autostart=1&ui_controls=1&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=1"></iframe>
`;

// Load a new 3D model
function loadModel(modelData) {
    const container = document.querySelector('.sketchfab-embed-wrapper');
    const infoBox = document.getElementById('modelInfo');

    // Show loading message
    infoBox.innerHTML = '<h3>Loading new model... ⏳</h3><p>Please wait while we load your new animated 3D model!</p>';

    // Update the container with new embed
    container.innerHTML = createEmbedHTML(modelData);

    // Wait a moment, then update the model info
    setTimeout(() => updateModelInfo(modelData), 1000);
}

// Get a random model when button is clicked
function getRandomModel() {
    const randomModel = pickRandomModel();
    currentModelId = randomModel.id; // Update current model ID
    loadModel(randomModel);
    console.log('Loading random animated model:', randomModel.title);
}

// Show welcome message when page loads
const showWelcomeMessage = () => console.log('3D Model Viewer loaded! BMO is ready to play! 🎮');
window.onload = showWelcomeMessage;