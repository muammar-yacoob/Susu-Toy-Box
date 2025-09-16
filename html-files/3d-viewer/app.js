// 3D Model Viewer - Simple JavaScript for kids!

// Helper function to trim long descriptions
function trimDescription(description, maxLength = 100) {
    if (!description) return 'An amazing 3D model you can explore!';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
}

// Get a random 3D model from Sketchfab API
async function getRandomModel() {
    const randomNumber = Math.random();
    
    if (randomNumber < 0.3) {
        // 30% chance - fetch Spark Games models
        return await getSparkGamesModel();
    } else {
        // 70% chance - fetch any random model
        return await getRandomGeneralModel();
    }
    
}

// Fetch a Spark Games model specifically
async function getSparkGamesModel() {
    // Use Spark Games profile URL to get their models
    const response = await fetch('https://api.sketchfab.com/v3/users/spark-games/models?type=models&downloadable=false&archives_flavours=false&sort_by=-publishedAt');
    
    if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const model = data.results[randomIndex];
            
            return {
                id: model.uid,
                title: model.name || 'Cool 3D Model',
                author: 'Spark Games',
                description: trimDescription(model.description),
                emoji: '🎮'
            };
        }
    }
    
    // If Spark Games API fails, try general API with Spark Games filter
    return await getRandomGeneralModel();
}

// Fetch a random general model
async function getRandomGeneralModel() {
    const response = await fetch('https://api.sketchfab.com/v3/models?type=models&downloadable=false&archives_flavours=false&sort_by=-publishedAt');
    
    if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const model = data.results[randomIndex];
            
            return {
                id: model.uid,
                title: model.name || 'Cool 3D Model',
                author: model.user?.displayName || 'Unknown Artist',
                description: trimDescription(model.description),
                emoji: '🎮'
            };
        }
    }
    
    // If all APIs fail, return null to show error message
    return null;
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
    
    if (randomModel) {
        loadModel(randomModel);
    } else {
        // Show error message if no model found
        const infoBox = document.getElementById('modelInfo');
        infoBox.innerHTML = '<h3>❌ Unable to load model</h3><p>Please check your internet connection and try again!</p><div class="button-group"><button onclick="loadRandomModel()">Try Again 🔄</button></div>';
    }
}