// 3D Model Viewer - Simple JavaScript for kids!

// Get a random 3D model from Sketchfab API
async function getRandomModel() {
    const randomNumber = Math.random();
    
    // 30% chance to use "Spark Games" as author
    const author = randomNumber < 0.3 ? 'Spark Games' : 'Various Artists';
    
    // Fetch models from Sketchfab API
    const response = await fetch('https://api.sketchfab.com/v3/models?type=models&downloadable=false&archives_flavours=false&sort_by=-publishedAt');
    
    if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const model = data.results[randomIndex];
            
            return {
                id: model.uid,
                title: model.name || 'Cool 3D Model',
                author: author,
                description: model.description || 'An amazing 3D model you can explore!',
                emoji: '🎮'
            };
        }
    }
    
    // Fallback if API fails
    return {
        id: 'fddc038ff63544218433d14aa80135f3',
        title: 'BMO from Adventure Time',
        author: author,
        description: 'A cool 3D model to explore!',
        emoji: '🎮'
    };
}

// Show model information
function showModelInfo(modelData) {
    document.getElementById('modelInfo').innerHTML = `
        <h3>${modelData.emoji} ${modelData.title}</h3>
        <p><strong>Model by:</strong> ${modelData.author}</p>
        <p><strong>Description:</strong> ${modelData.description}</p>
        <p><strong>Features:</strong> Animated and interactive! 🎬</p>
        <div class="button-group">
            <button onclick="loadRandomModel()">Get Random Model! 🎲</button>
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
async function loadRandomModel() {
    const randomModel = await getRandomModel();
    loadModel(randomModel);
}