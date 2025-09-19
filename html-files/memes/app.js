const topTexts = ["WHEN YOU", "ME WHEN", "HOW I FEEL", "WHEN MOM SAYS", "ME TRYING TO"];
const bottomTexts = ["FINISH HOMEWORK", "GET ICE CREAM", "PLAY GAMES", "EAT PIZZA", "GO TO BED"];
let currentMeme = "";
let currentMemeIndex = 0;
let allMemes = [];
let selectedTexts = new Set(['topText', 'bottomText']); // Both selected by default
let textProperties = {
    topText: { fontSize: 50, rotation: 0, x: null, y: null },
    bottomText: { fontSize: 50, rotation: 0, x: null, y: null }
};

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
    allMemes = data.data.memes;
    currentMemeIndex = Math.floor(Math.random() * allMemes.length);
    currentMeme = allMemes[currentMemeIndex].url;

    // Reset text positions to center when loading new image
    resetTextPositions();

    updateMemeDisplay();

    button.innerHTML = '🖼️ Random';
    button.disabled = false;
}

function nextMeme() {
    if (allMemes.length === 0) return;
    currentMemeIndex = (currentMemeIndex + 1) % allMemes.length;
    currentMeme = allMemes[currentMemeIndex].url;
    resetTextPositions();
    updateMemeDisplay();
}

function previousMeme() {
    if (allMemes.length === 0) return;
    currentMemeIndex = (currentMemeIndex - 1 + allMemes.length) % allMemes.length;
    currentMeme = allMemes[currentMemeIndex].url;
    resetTextPositions();
    updateMemeDisplay();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size too large. Please select an image under 10MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const aspectRatio = this.height / this.width;

            // Reject images taller than 2:1 aspect ratio
            if (aspectRatio > 2) {
                alert('Image is too tall. Please select an image with a height no more than twice its width.');
                return;
            }

            // Reset allMemes array since this is a custom upload
            allMemes = [];
            currentMemeIndex = 0;
            currentMeme = e.target.result;
            resetTextPositions();
            updateMemeDisplay();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function loadRandomText() {
    const topText = topTexts[Math.floor(Math.random() * topTexts.length)];
    const bottomText = bottomTexts[Math.floor(Math.random() * bottomTexts.length)];

    document.getElementById('topText').value = topText;
    document.getElementById('bottomText').value = bottomText;

    // Reset text positions to center when loading new text
    resetTextPositions();

    if (currentMeme) updateMemeDisplay();
}

function resetTextPositions() {
    // Reset all text properties to defaults
    textProperties.topText.x = null;
    textProperties.topText.y = null;
    textProperties.topText.fontSize = 50;
    textProperties.topText.rotation = 0;
    textProperties.bottomText.x = null;
    textProperties.bottomText.y = null;
    textProperties.bottomText.fontSize = 50;
    textProperties.bottomText.rotation = 0;

    // Update UI sliders to reflect the reset values
    document.getElementById('fontSizeSlider').value = 50;
    document.getElementById('rotationSlider').value = 0;
    updateSliderDisplay('fontSize', 50);
    updateSliderDisplay('rotation', 0);
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

    // Get positions if they exist
    const topX = textProperties.topText.x || '50%';
    const topY = textProperties.topText.y || '12px';
    const bottomX = textProperties.bottomText.x || '50%';
    const bottomY = textProperties.bottomText.y || 'auto';

    result.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 800px; margin: 0 auto;">
            <button onclick="previousMeme()" class="btn btn-circle btn-ghost hover:bg-base-300" style="flex-shrink: 0;" ${allMemes.length === 0 ? 'disabled' : ''}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <div class="bg-gray-800 p-6 rounded-2xl shadow-2xl" style="max-width: fit-content; margin: 0 20px;">
                <div id="memeContainer" style="position: relative; display: flex; justify-content: center; align-items: center; max-width: 100%; margin: 0 auto; user-select: none;">
                    <img id="memeImage" src="${currentMeme}" alt="Meme" style="width: 400px; height: auto; object-fit: contain; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" onload="setupDraggableText()">
                    <div id="topTextDiv" data-text-id="topText" class="draggable-text" style="position: absolute; top: ${typeof topY === 'string' ? topY : topY + 'px'}; left: ${typeof topX === 'string' ? topX : topX + 'px'}; transform: ${typeof topX === 'string' ? 'translateX(-50%)' : 'translateX(-50%)'} rotate(${textProperties.topText.rotation}deg); color: white; font-weight: 900; text-shadow: 3px 3px 6px black, -1px -1px 2px black; text-align: center; max-width: 90%; line-height: 1.1; font-family: Impact, Arial Black, sans-serif; letter-spacing: 1px; font-size: ${textProperties.topText.fontSize}px; cursor: move; padding: 5px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${topText}</div>
                    <div id="bottomTextDiv" data-text-id="bottomText" class="draggable-text" style="position: absolute; ${bottomY === 'auto' ? 'bottom: 12px' : 'top: ' + bottomY + 'px'}; left: ${typeof bottomX === 'string' ? bottomX : bottomX + 'px'}; transform: ${typeof bottomX === 'string' ? 'translateX(-50%)' : 'translateX(-50%)'} rotate(${textProperties.bottomText.rotation}deg); color: white; font-weight: 900; text-shadow: 3px 3px 6px black, -1px -1px 2px black; text-align: center; max-width: 90%; line-height: 1.1; font-family: Impact, Arial Black, sans-serif; letter-spacing: 1px; font-size: ${textProperties.bottomText.fontSize}px; cursor: move; padding: 5px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${bottomText}</div>
                    <div id="hoverGizmo" style="display: none; position: absolute; border: 2px dashed #00ff00; background: rgba(0,255,0,0.1); pointer-events: none; z-index: 1001; border-radius: 4px;"></div>
                    <div id="watermarkDiv" style="position: absolute; bottom: 4px; right: 8px; color: rgba(255,255,255,0.7); font-size: 10px; font-family: Arial, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); letter-spacing: 0.5px; display: none;">sundus.fun</div>
                </div>
            </div>
            <button onclick="nextMeme()" class="btn btn-circle btn-ghost hover:bg-base-300" style="flex-shrink: 0;" ${allMemes.length === 0 ? 'disabled' : ''}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    `;

    // Show action buttons when meme is displayed
    const memeActions = document.getElementById('memeActions');
    memeActions.style.display = 'flex';

    // Update text wrapping after image loads
    setTimeout(updateTextWrapping, 100);
}

let isDragging = false;
let currentDragElement = null;
let offsetX = 0;
let offsetY = 0;

function setupDraggableText() {
    const draggableElements = document.querySelectorAll('.draggable-text');

    draggableElements.forEach(element => {
        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag, { passive: false });
        element.addEventListener('click', toggleTextSelection);
        element.addEventListener('mouseenter', showHoverGizmo);
        element.addEventListener('mouseleave', hideHoverGizmo);
    });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    // Initialize with both texts selected and update UI
    updateInputHighlights();
    updateSliderValues();
    updateSliderDisplays();
    updateTextWrapping();
}

function updateTextWrapping() {
    const memeImage = document.getElementById('memeImage');
    if (!memeImage) return;

    const imageWidth = memeImage.getBoundingClientRect().width;
    const maxTextWidth = imageWidth * 0.9; // 90% of image width

    const draggableElements = document.querySelectorAll('.draggable-text');
    draggableElements.forEach(element => {
        element.style.maxWidth = maxTextWidth + 'px';
    });
}

function toggleTextSelection(e) {
    e.stopPropagation();
    const textId = e.target.getAttribute('data-text-id');

    // Toggle selection: if selected, deselect (unless it's the only one selected)
    if (selectedTexts.has(textId)) {
        if (selectedTexts.size > 1) {
            selectedTexts.delete(textId);
        }
        // Can't deselect if it's the only one selected
    } else {
        selectedTexts.add(textId);
    }

    updateInputHighlights();
    updateSliderValues();
    updateSliderDisplays();
}

function showHoverGizmo(e) {
    const textId = e.target.getAttribute('data-text-id');
    if (!selectedTexts.has(textId)) return; // Only show for selected text

    const gizmo = document.getElementById('hoverGizmo');
    const rect = e.target.getBoundingClientRect();
    const container = document.getElementById('memeContainer');
    const containerRect = container.getBoundingClientRect();

    // Fit gizmo exactly to the text element without extra padding
    const gizmoLeft = rect.left - containerRect.left;
    const gizmoTop = rect.top - containerRect.top;
    const gizmoWidth = rect.width;
    const gizmoHeight = rect.height;

    gizmo.style.left = gizmoLeft + 'px';
    gizmo.style.top = gizmoTop + 'px';
    gizmo.style.width = gizmoWidth + 'px';
    gizmo.style.height = gizmoHeight + 'px';
    gizmo.style.display = 'block';
}

function hideHoverGizmo() {
    const gizmo = document.getElementById('hoverGizmo');
    gizmo.style.display = 'none';
}

function updateInputHighlights() {
    const topInput = document.getElementById('topText');
    const bottomInput = document.getElementById('bottomText');

    // Highlight selected inputs
    if (selectedTexts.has('topText')) {
        topInput.classList.add('input-primary');
        topInput.classList.remove('input-bordered');
    } else {
        topInput.classList.remove('input-primary');
        topInput.classList.add('input-bordered');
    }

    if (selectedTexts.has('bottomText')) {
        bottomInput.classList.add('input-primary');
        bottomInput.classList.remove('input-bordered');
    } else {
        bottomInput.classList.remove('input-primary');
        bottomInput.classList.add('input-bordered');
    }
}

function updateSliderValues() {
    if (selectedTexts.size === 0) return;

    // If multiple texts selected, show average values or first selected
    const firstSelected = Array.from(selectedTexts)[0];

    document.getElementById('fontSizeSlider').value = textProperties[firstSelected].fontSize;
    document.getElementById('rotationSlider').value = textProperties[firstSelected].rotation;

    // Sliders are always enabled since there's always a selection
    document.getElementById('fontSizeSlider').disabled = false;
    document.getElementById('rotationSlider').disabled = false;
}

function updateSelectedTextProperty(property, value) {
    if (selectedTexts.size === 0) return;

    // Apply property to all selected texts
    selectedTexts.forEach(textId => {
        textProperties[textId][property] = parseFloat(value);

        const element = document.querySelector(`[data-text-id="${textId}"]`);
        if (element) {
            if (property === 'fontSize') {
                element.style.fontSize = value + 'px';
            } else if (property === 'rotation') {
                element.style.transform = `translateX(-50%) rotate(${value}deg)`;
            }
        }
    });
}

function updateSliderDisplay(property, value) {
    if (property === 'fontSize') {
        document.getElementById('fontSizeValue').textContent = value + 'px';
    } else if (property === 'rotation') {
        document.getElementById('rotationValue').textContent = value + '°';
    }
}

function updateSliderDisplays() {
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const rotationSlider = document.getElementById('rotationSlider');

    updateSliderDisplay('fontSize', fontSizeSlider.value);
    updateSliderDisplay('rotation', rotationSlider.value);
}

function resetFontSize() {
    const defaultFontSize = 50;
    document.getElementById('fontSizeSlider').value = defaultFontSize;
    updateSelectedTextProperty('fontSize', defaultFontSize);
    updateSliderDisplay('fontSize', defaultFontSize);
}

function resetRotation() {
    const defaultRotation = 0;
    document.getElementById('rotationSlider').value = defaultRotation;
    updateSelectedTextProperty('rotation', defaultRotation);
    updateSliderDisplay('rotation', defaultRotation);
}

function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    currentDragElement = e.target;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const rect = currentDragElement.getBoundingClientRect();

    // Calculate offset from the center of the text element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    offsetX = clientX - centerX;
    offsetY = clientY - centerY;

    currentDragElement.style.zIndex = '1000';
}

function drag(e) {
    if (!isDragging || !currentDragElement) return;

    e.preventDefault();

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const container = document.getElementById('memeContainer');
    const containerRect = container.getBoundingClientRect();

    // Calculate new center position relative to container (accounting for the cursor being at center)
    let newCenterX = clientX - containerRect.left - offsetX;
    let newCenterY = clientY - containerRect.top - offsetY;

    // Convert center position to left position for CSS (since we use translateX(-50%))
    let newX = newCenterX;
    let newY = newCenterY;

    // Keep text center within container bounds
    const elementRect = currentDragElement.getBoundingClientRect();
    const halfWidth = elementRect.width / 2;
    const halfHeight = elementRect.height / 2;

    newX = Math.max(halfWidth, Math.min(newX, container.offsetWidth - halfWidth));
    newY = Math.max(halfHeight, Math.min(newY, container.offsetHeight - halfHeight));

    currentDragElement.style.left = newX + 'px';
    currentDragElement.style.top = newY + 'px';

    // Update text properties with new position
    const textId = currentDragElement.getAttribute('data-text-id');
    textProperties[textId].x = newX;
    textProperties[textId].y = newY;

    // Preserve rotation and centering in transform
    const rotation = textProperties[textId].rotation;
    currentDragElement.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

    // Update gizmo position during drag if element is selected
    if (selectedTexts.has(textId)) {
        updateGizmoDuringDrag(currentDragElement);
    }
}

function updateGizmoDuringDrag(element) {
    const gizmo = document.getElementById('hoverGizmo');
    const rect = element.getBoundingClientRect();
    const container = document.getElementById('memeContainer');
    const containerRect = container.getBoundingClientRect();

    // Fit gizmo exactly to the text element during drag without extra padding
    const gizmoLeft = rect.left - containerRect.left;
    const gizmoTop = rect.top - containerRect.top;
    const gizmoWidth = rect.width;
    const gizmoHeight = rect.height;

    gizmo.style.left = gizmoLeft + 'px';
    gizmo.style.top = gizmoTop + 'px';
    gizmo.style.width = gizmoWidth + 'px';
    gizmo.style.height = gizmoHeight + 'px';
    gizmo.style.display = 'block';
}

function stopDrag() {
    if (isDragging && currentDragElement) {
        currentDragElement.style.zIndex = 'auto';
        // Hide gizmo when drag stops
        hideHoverGizmo();
    }
    isDragging = false;
    currentDragElement = null;
}

function adjustFontSize() {
    // This function is no longer needed as we use the slider
    setupDraggableText();
    // Update text wrapping when image dimensions change
    setTimeout(updateTextWrapping, 100);
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

        // Get text elements and their positions
        const topTextDiv = document.getElementById('topTextDiv');
        const bottomTextDiv = document.getElementById('bottomTextDiv');
        const memeImage = document.getElementById('memeImage');
        const container = document.getElementById('memeContainer');

        const topText = document.getElementById('topText').value.toUpperCase();
        const bottomText = document.getElementById('bottomText').value.toUpperCase();

        // Calculate scale factor
        const scaleX = img.width / memeImage.getBoundingClientRect().width;
        const scaleY = img.height / memeImage.getBoundingClientRect().height;

        ctx.textAlign = 'left';

        // Draw top text at custom position with individual properties
        if (topText && topTextDiv) {
            const topProps = textProperties.topText;
            const fontSize = topProps.fontSize * scaleX;

            ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = fontSize / 15;

            const topRect = topTextDiv.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const x = (topRect.left - containerRect.left) * scaleX;
            const y = (topRect.top - containerRect.top + topProps.fontSize) * scaleY;

            // Apply rotation
            if (topProps.rotation !== 0) {
                ctx.save();
                ctx.translate(x + (fontSize * topText.length / 4), y - fontSize/2);
                ctx.rotate((topProps.rotation * Math.PI) / 180);
                ctx.strokeText(topText, -(fontSize * topText.length / 4), fontSize/2);
                ctx.fillText(topText, -(fontSize * topText.length / 4), fontSize/2);
                ctx.restore();
            } else {
                ctx.strokeText(topText, x, y);
                ctx.fillText(topText, x, y);
            }
        }

        // Draw bottom text at custom position with individual properties
        if (bottomText && bottomTextDiv) {
            const bottomProps = textProperties.bottomText;
            const fontSize = bottomProps.fontSize * scaleX;

            ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = fontSize / 15;

            const bottomRect = bottomTextDiv.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const x = (bottomRect.left - containerRect.left) * scaleX;
            const y = (bottomRect.top - containerRect.top + bottomProps.fontSize) * scaleY;

            // Apply rotation
            if (bottomProps.rotation !== 0) {
                ctx.save();
                ctx.translate(x + (fontSize * bottomText.length / 4), y - fontSize/2);
                ctx.rotate((bottomProps.rotation * Math.PI) / 180);
                ctx.strokeText(bottomText, -(fontSize * bottomText.length / 4), fontSize/2);
                ctx.fillText(bottomText, -(fontSize * bottomText.length / 4), fontSize/2);
                ctx.restore();
            } else {
                ctx.strokeText(bottomText, x, y);
                ctx.fillText(bottomText, x, y);
            }
        }

        // Draw watermark with drop shadow
        const watermarkFontSize = Math.max(canvas.width / 80, 8);
        ctx.font = `${watermarkFontSize}px Arial, sans-serif`;
        ctx.textAlign = 'right';
        const watermarkX = canvas.width - 10;
        const watermarkY = canvas.height - 8;

        // Draw shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillText('sundus.fun', watermarkX + 1, watermarkY + 1);

        // Draw main text
        ctx.fillStyle = 'white';
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

            // Get text elements and their positions
            const topTextDiv = document.getElementById('topTextDiv');
            const bottomTextDiv = document.getElementById('bottomTextDiv');
            const memeImage = document.getElementById('memeImage');
            const container = document.getElementById('memeContainer');

            const topText = document.getElementById('topText').value.toUpperCase();
            const bottomText = document.getElementById('bottomText').value.toUpperCase();

            // Calculate scale factor
            const scaleX = img.width / memeImage.getBoundingClientRect().width;
            const scaleY = img.height / memeImage.getBoundingClientRect().height;

            ctx.textAlign = 'left';

            // Draw top text at custom position with individual properties
            if (topText && topTextDiv) {
                const topProps = textProperties.topText;
                const fontSize = topProps.fontSize * scaleX;

                ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = fontSize / 15;

                const topRect = topTextDiv.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const x = (topRect.left - containerRect.left) * scaleX;
                const y = (topRect.top - containerRect.top + topProps.fontSize) * scaleY;

                // Apply rotation
                if (topProps.rotation !== 0) {
                    ctx.save();
                    ctx.translate(x + (fontSize * topText.length / 4), y - fontSize/2);
                    ctx.rotate((topProps.rotation * Math.PI) / 180);
                    ctx.strokeText(topText, -(fontSize * topText.length / 4), fontSize/2);
                    ctx.fillText(topText, -(fontSize * topText.length / 4), fontSize/2);
                    ctx.restore();
                } else {
                    ctx.strokeText(topText, x, y);
                    ctx.fillText(topText, x, y);
                }
            }

            // Draw bottom text at custom position with individual properties
            if (bottomText && bottomTextDiv) {
                const bottomProps = textProperties.bottomText;
                const fontSize = bottomProps.fontSize * scaleX;

                ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = fontSize / 15;

                const bottomRect = bottomTextDiv.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const x = (bottomRect.left - containerRect.left) * scaleX;
                const y = (bottomRect.top - containerRect.top + bottomProps.fontSize) * scaleY;

                // Apply rotation
                if (bottomProps.rotation !== 0) {
                    ctx.save();
                    ctx.translate(x + (fontSize * bottomText.length / 4), y - fontSize/2);
                    ctx.rotate((bottomProps.rotation * Math.PI) / 180);
                    ctx.strokeText(bottomText, -(fontSize * bottomText.length / 4), fontSize/2);
                    ctx.fillText(bottomText, -(fontSize * bottomText.length / 4), fontSize/2);
                    ctx.restore();
                } else {
                    ctx.strokeText(bottomText, x, y);
                    ctx.fillText(bottomText, x, y);
                }
            }

            // Draw watermark with drop shadow
            const watermarkFontSize = Math.max(canvas.width / 80, 8);
            ctx.font = `${watermarkFontSize}px Arial, sans-serif`;
            ctx.textAlign = 'right';
            const watermarkX = canvas.width - 10;
            const watermarkY = canvas.height - 8;

            // Draw shadow
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillText('sundus.fun', watermarkX + 1, watermarkY + 1);

            // Draw main text
            ctx.fillStyle = 'white';
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