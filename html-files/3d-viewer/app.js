// 3D Model Viewer - Simple JavaScript for kids!

// All our cool 3D models
const allModels = [
    { id: 'fddc038ff63544218433d14aa80135f3', title: 'BMO from Adventure Time', author: 'Marc Virgili', description: 'BMO fan-art, one of my fav characters from Adventure Time series', emoji: '🎮' },
    { id: 'da15c2fb91fc4034a0658b89b8ebff17', title: 'Easter Egg - Animated', author: 'Spark Games', description: 'Cute animated Easter egg with fun movements', emoji: '🥚' },
    { id: '1590b14b34214d29b245d87609a4b299', title: 'Low-poly Chick - Rigged & Animated', author: 'Spark Games', description: 'Adorable animated chick with low-poly style', emoji: '🐤' },
    { id: '7e81491c647f4452943fa3072d2e3a68', title: 'Cute Animated Easter Bunny', author: 'Spark Games', description: 'Playful bunny with cute hopping animations', emoji: '🐰' },
    { id: 'bb0178b180e840549bb034972949dd1e', title: 'Voxel Fox', author: 'Spark Games', description: 'Blocky fox character with smooth animations', emoji: '🦊' },
    { id: 'd0f175b9c8ad470984080c1a4364c967', title: 'Santa Mid-night Snack - Animated', author: 'Spark Games', description: 'Santa enjoying a late night snack with animations', emoji: '🎅' },
    { id: 'bcdea5e7e4e74a4a9be2c39590c8dadf', title: 'Hello Kitty', author: 'Spark Games', description: 'Classic Hello Kitty character with animations', emoji: '🐱' },
    { id: 'ff0b15657a8040f0a96d680f52db1fe4', title: 'World\'s Best Dad Mug', author: 'Spark Games', description: 'Animated coffee mug for the best dad', emoji: '☕' },
    { id: '8c8c1d7b1b3c4e7f9a2b3c4d5e6f7a8b', title: 'Classic Red Sports Car', author: 'AutoDesign Studio', description: 'Beautiful classic red sports car with detailed interior', emoji: '🚗' },
    { id: '9d9d2e8c2c4d5f8a0b1c2d3e4f5a6b7c', title: 'Flying Drone', author: 'TechModels', description: 'High-tech quadcopter drone with rotating propellers', emoji: '🚁' },
    { id: '0e0e3f9d3d5e6f9a1b2c3d4e5f6a7b8c', title: 'Space Rocket', author: 'SpaceCorp', description: 'Realistic space rocket ready for launch', emoji: '🚀' },
    { id: '1f1f4a0e4e6f7a2b3c4d5e6f7a8b9c0d', title: 'Steam Locomotive', author: 'TrainMaster', description: 'Classic steam train with working wheels and smoke', emoji: '🚂' },
    { id: '2a2a5b1f5f7a8b3c4d5e6f7a8b9c0d1e', title: 'Medieval Castle', author: 'Spark Games', description: 'Majestic medieval castle with towers and walls', emoji: '🏰' },
    { id: '3b3b6c2a6a8b9c4d5e6f7a8b9c0d1e2f', title: 'Modern Skyscraper', author: 'Spark Games', description: 'Glass and steel skyscraper with LED lighting', emoji: '🏢' },
    { id: '4c4c7d3b7b9c0d5e6f7a8b9c0d1e2f3a', title: 'Japanese Pagoda', author: 'Spark Games', description: 'Traditional Japanese temple with curved roofs', emoji: '🏯' },
    { id: '5d5d8e4c8c0d1e6f7a8b9c0d1e2f3a4b', title: 'Lighthouse', author: 'Spark Games', description: 'Classic lighthouse with rotating beacon light', emoji: '🗼' },
    { id: '6e6e9f5d9d1e2f7a8b9c0d1e2f3a4b5c', title: 'Ancient Oak Tree', author: 'Spark Games', description: 'Massive oak tree with detailed bark and branches', emoji: '🌳' },
    { id: '7f7f0a6e0e2f3a8b9c0d1e2f3a4b5c6d', title: 'Volcano', author: 'Spark Games', description: 'Active volcano with lava flows and smoke', emoji: '🌋' },
    { id: '8a8a1b7f1f3a4b9c0d1e2f3a4b5c6d7e', title: 'Crystal Cave', author: 'Spark Games', description: 'Sparkling cave filled with colorful crystals', emoji: '💎' },
    { id: '9b9b2c8a2a4b5c0d1e2f3a4b5c6d7e8f', title: 'Waterfall', author: 'Spark Games', description: 'Beautiful cascading waterfall with mist effects', emoji: '🌊' },
    { id: '0c0c3d9b3b5c6d1e2f3a4b5c6d7e8f9a', title: 'Retro Computer', author: 'Spark Games', description: 'Classic 80s computer with CRT monitor', emoji: '💻' },
    { id: '1d1d4e0c4c6d7e2f3a4b5c6d7e8f9a0b', title: 'Robot Companion', author: 'Spark Games', description: 'Friendly humanoid robot with glowing eyes', emoji: '🤖' },
    { id: '2e2e5f1d5d7e8f3a4b5c6d7e8f9a0b1c', title: 'Virtual Reality Headset', author: 'Spark Games', description: 'Modern VR headset with controllers', emoji: '🥽' },
    { id: '3f3f6a2e6e8f9a4b5c6d7e8f9a0b1c2d', title: 'Smartphone', author: 'Spark Games', description: 'Latest smartphone with holographic display', emoji: '📱' },
    { id: '4a4a7b3f7f9a0b5c6d7e8f9a0b1c2d3e', title: 'Magic Crystal Ball', author: 'Spark Games', description: 'Glowing crystal ball with swirling energy', emoji: '🔮' },
    { id: '5b5b8c4a8a0b1c6d7e8f9a0b1c2d3e4f', title: 'Dragon', author: 'Spark Games', description: 'Majestic dragon with wings and fire breath', emoji: '🐉' },
    { id: '6c6c9d5b9b1c2d7e8f9a0b1c2d3e4f5a', title: 'Fairy House', author: 'Spark Games', description: 'Tiny magical house with glowing windows', emoji: '🧚' },
    { id: '7d7d0e6c0c2d3e8f9a0b1c2d3e4f5a6b', title: 'Wizard Staff', author: 'Spark Games', description: 'Ornate staff with glowing gem at the top', emoji: '🪄' },
    { id: '8e8e1f7d1d3e4f9a0b1c2d3e4f5a6b7c', title: 'Giant Pizza', author: 'Spark Games', description: 'Delicious pizza with all the toppings', emoji: '🍕' },
    { id: '9f9f2a8e2e4f5a0b1c2d3e4f5a6b7c8d', title: 'Treasure Chest', author: 'Spark Games', description: 'Wooden chest filled with gold coins and gems', emoji: '💰' },
    { id: '0a0a3b9f3f5a6b1c2d3e4f5a6b7c8d9e', title: 'Musical Instruments', author: 'Spark Games', description: 'Collection of guitars, drums, and keyboards', emoji: '🎸' },
    { id: '1b1b4c0a4a6b7c2d3e4f5a6b7c8d9e0f', title: 'Garden Gnome', author: 'Spark Games', description: 'Cheerful gnome with red hat and fishing rod', emoji: '🧙' }
];

// Pick a random model - 30% chance for Spark Games models
function pickRandomModel() {
    const randomNumber = Math.random();
    
    if (randomNumber < 0.3) {
        // 30% chance - pick a Spark Games model
        const sparkModels = allModels.filter(model => model.author === 'Spark Games');
        const randomIndex = Math.floor(Math.random() * sparkModels.length);
        return sparkModels[randomIndex];
    } else {
        // 70% chance - pick any model
        const randomIndex = Math.floor(Math.random() * allModels.length);
        return allModels[randomIndex];
    }
}

// Show model information
function showModelInfo(modelData) {
    document.getElementById('modelInfo').innerHTML = `
        <h3>${modelData.emoji} ${modelData.title}</h3>
        <p><strong>Model by:</strong> ${modelData.author}</p>
        <p><strong>Description:</strong> ${modelData.description}</p>
        <p><strong>Features:</strong> Animated and interactive! 🎬</p>
        <div class="button-group">
            <button onclick="getRandomModel()">Get Random Model! 🎲</button>
            <button onclick="window.open('https://sketchfab.com/3d-models/${modelData.id}', '_blank')" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 10px 15px; border-radius: 10px; cursor: pointer;">
                Go to Model Page 🔗
            </button>
        </div>
    `;
}

// Load a new 3D model
function loadModel(modelData) {
    const container = document.querySelector('.sketchfab-embed-wrapper');
    const infoBox = document.getElementById('modelInfo');

    // Show loading message
    infoBox.innerHTML = '<h3>Loading new model... ⏳</h3><p>Please wait while we load your new 3D model!</p>';

    // Create the iframe for the 3D model
    const iframeHTML = `<iframe title="${modelData.title}" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/${modelData.id}/embed?autostart=1&ui_controls=1&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=1"></iframe>`;
    
    // Update the container with new model
    container.innerHTML = iframeHTML;

    // Wait a moment, then show model info
    setTimeout(() => {
        showModelInfo(modelData);
    }, 1000);
}

// Get a random model when button is clicked
function getRandomModel() {
    const randomModel = pickRandomModel();
    loadModel(randomModel);
}