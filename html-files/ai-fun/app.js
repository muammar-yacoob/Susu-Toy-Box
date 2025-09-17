function mainFunction() {
    generateJoke();
}

function generateDrawing() {
    const result = document.getElementById('result');

    const shapes = ['circle', 'rect', 'triangle', 'star', 'heart'];
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
    const shapes_count = Math.floor(Math.random() * 8) + 3;

    let svgContent = '';

    for (let i = 0; i < shapes_count; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * 300;
        const y = Math.random() * 200;
        const size = Math.random() * 50 + 10;

        switch(shape) {
            case 'circle':
                svgContent += `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="0.8"/>`;
                break;
            case 'rect':
                svgContent += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" opacity="0.8" rx="5"/>`;
                break;
            case 'triangle':
                svgContent += `<polygon points="${x},${y+size} ${x+size/2},${y} ${x+size},${y+size}" fill="${color}" opacity="0.8"/>`;
                break;
            case 'star':
                const points = [];
                for(let j = 0; j < 10; j++) {
                    const angle = (j * Math.PI) / 5;
                    const radius = j % 2 === 0 ? size : size/2;
                    points.push(`${x + radius * Math.cos(angle)},${y + radius * Math.sin(angle)}`);
                }
                svgContent += `<polygon points="${points.join(' ')}" fill="${color}" opacity="0.8"/>`;
                break;
            case 'heart':
                svgContent += `<path d="M${x},${y+size/4} C${x},${y} ${x-size/2},${y} ${x-size/2},${y+size/4} C${x-size/2},${y+size/2} ${x},${y+3*size/4} ${x},${y+size} C${x},${y+3*size/4} ${x+size/2},${y+size/2} ${x+size/2},${y+size/4} C${x+size/2},${y} ${x},${y} ${x},${y+size/4} Z" fill="${color}" opacity="0.8"/>`;
                break;
        }
    }

    result.innerHTML = `
        <div class="bg-base-200 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">🎨 AI Generated Art!</h3>
            <svg width="320" height="220" viewBox="0 0 320 220" class="border border-base-300 rounded bg-white">
                ${svgContent}
            </svg>
            <p class="text-sm mt-2 opacity-70">Made with ${shapes_count} random shapes!</p>
        </div>
    `;
}

function generateSound() {
    const result = document.getElementById('result');

    // Web Audio API for sound generation
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // C, D, E, F, G, A, B
    const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const melody = [];

    // Generate random melody
    for (let i = 0; i < 6; i++) {
        const noteIndex = Math.floor(Math.random() * notes.length);
        melody.push({
            frequency: notes[noteIndex],
            name: noteNames[noteIndex],
            duration: 0.3
        });
    }

    // Play the melody
    let currentTime = audioContext.currentTime;
    melody.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(note.frequency, currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);

        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);

        currentTime += note.duration;
    });

    // Visual representation
    const visualNotes = melody.map(note =>
        `<span class="inline-block bg-primary text-primary-content px-2 py-1 rounded m-1">${note.name}</span>`
    ).join('');

    result.innerHTML = `
        <div class="bg-base-200 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">🎵 AI Generated Melody!</h3>
            <div class="mb-4">
                <div class="text-2xl mb-2">♪ ♫ ♪ ♫ ♪ ♫</div>
                <div class="flex flex-wrap justify-center">
                    ${visualNotes}
                </div>
            </div>
            <button onclick="generateSound()" class="btn btn-secondary btn-sm">🔄 Play Again</button>
            <p class="text-sm mt-2 opacity-70">Listen to your unique 6-note melody!</p>
        </div>
    `;
}

function generateJoke() {
    const result = document.getElementById('result');

    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything! 🧪",
        "What do you call a fake noodle? An impasta! 🍝",
        "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
        "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks! 🦕",
        "Why don't skeletons fight each other? They don't have the guts! 💀",
        "What do you call a bear with no teeth? A gummy bear! 🐻",
        "Why don't eggs tell jokes? They'd crack each other up! 🥚",
        "What do you call a sleeping bull? A bulldozer! 🐂",
        "Why did the math book look so sad? Because it had too many problems! 📚",
        "What do you call a fish wearing a crown? A king fish! 👑🐟"
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    result.innerHTML = `
        <div class="bg-base-200 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">😂 AI Generated Joke!</h3>
            <div class="text-lg mb-4 p-4 bg-white rounded border-l-4 border-accent">
                ${randomJoke}
            </div>
            <button onclick="generateJoke()" class="btn btn-accent btn-sm">🔄 Another One!</button>
        </div>
    `;
}

function generatePattern() {
    const result = document.getElementById('result');

    const patterns = ['spiral', 'mandala', 'geometric', 'fractal'];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];

    let svgContent = '';

    switch(pattern) {
        case 'spiral':
            for (let i = 0; i < 50; i++) {
                const angle = i * 0.5;
                const radius = i * 2;
                const x = 160 + radius * Math.cos(angle);
                const y = 110 + radius * Math.sin(angle);
                const color = colors[i % colors.length];
                svgContent += `<circle cx="${x}" cy="${y}" r="3" fill="${color}" opacity="0.7"/>`;
            }
            break;

        case 'mandala':
            for (let ring = 0; ring < 5; ring++) {
                const radius = 20 + ring * 15;
                const points = 8 + ring * 2;
                for (let i = 0; i < points; i++) {
                    const angle = (i * 2 * Math.PI) / points;
                    const x = 160 + radius * Math.cos(angle);
                    const y = 110 + radius * Math.sin(angle);
                    const color = colors[ring % colors.length];
                    svgContent += `<circle cx="${x}" cy="${y}" r="${5 - ring}" fill="${color}" opacity="0.8"/>`;
                }
            }
            break;

        case 'geometric':
            for (let i = 0; i < 20; i++) {
                const size = 10 + i * 5;
                const color = colors[i % colors.length];
                svgContent += `<rect x="${160-size/2}" y="${110-size/2}" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" opacity="0.7" transform="rotate(${i*18} 160 110)"/>`;
            }
            break;

        case 'fractal':
            function drawBranch(x, y, length, angle, depth) {
                if (depth === 0) return '';
                const endX = x + length * Math.cos(angle);
                const endY = y + length * Math.sin(angle);
                const color = colors[depth % colors.length];
                let branch = `<line x1="${x}" y1="${y}" x2="${endX}" y2="${endY}" stroke="${color}" stroke-width="${depth}" opacity="0.7"/>`;

                if (depth > 1) {
                    branch += drawBranch(endX, endY, length * 0.7, angle - 0.5, depth - 1);
                    branch += drawBranch(endX, endY, length * 0.7, angle + 0.5, depth - 1);
                }
                return branch;
            }
            svgContent = drawBranch(160, 200, 50, -Math.PI/2, 5);
            break;
    }

    result.innerHTML = `
        <div class="bg-base-200 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">🌀 AI Generated Pattern!</h3>
            <svg width="320" height="220" viewBox="0 0 320 220" class="border border-base-300 rounded bg-white">
                ${svgContent}
            </svg>
            <p class="text-sm mt-2 opacity-70">Generated ${pattern} pattern with AI magic!</p>
            <button onclick="generatePattern()" class="btn btn-info btn-sm mt-2">🔄 New Pattern</button>
        </div>
    `;
}