// Creative Playground - Simple JavaScript that works offline for kids!

// Fun prompts for kids to try
const funImagePrompts = [
    "A happy rainbow cat with wings",
    "A magical unicorn in a flower garden",
    "A smiling robot dancing in space",
    "A friendly dragon eating ice cream",
    "A superhero banana saving the day",
    "A purple elephant with polka dots",
    "A house made of candy and cookies",
    "A flying car with rainbow wheels"
];

const funSoundPrompts = [
    "A spaceship flying through space",
    "A happy robot beeping and booping",
    "Thunder during a rainstorm",
    "A magical fairy sprinkling dust",
    "A train chugging down the tracks",
    "Ocean waves crashing on the beach",
    "A bird singing in the morning",
    "Wind blowing through the trees"
];

// Simple function to create real sounds based on descriptions
function createSoundFromDescription(description) {
    // Create new audio context each time (this is how we make sounds in the browser)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Resume audio context if it's suspended (browser requirement)
    if (audioContext.state === 'suspended') audioContext.resume();


    // Create an oscillator (sound generator) - must be new each time
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect the sound generator to the speakers
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    let soundType = 'default';

    // Analyze the description and create appropriate sounds
    if (description.includes('spaceship') || description.includes('rocket') || description.includes('flying') ||
        description.includes('airplane') || description.includes('plane') || description.includes('jet') ||
        description.includes('whoosh') || description.includes('fly')) {
        soundType = 'spaceship';
        // Spaceship/rocket sound - whoosh effect
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 1.5);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        oscillator.type = 'sine';
        } else if (description.includes('robot') || description.includes('beep') || description.includes('boop') ||
                   description.includes('machine') || description.includes('computer') || description.includes('electronic')) {
            soundType = 'robot';
            // Robot beeping sound - multiple beeps
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.15);
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.45);
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            oscillator.type = 'square';
        } else if (description.includes('thunder') || description.includes('storm') || description.includes('rain') ||
                   description.includes('rumble') || description.includes('boom') || description.includes('crash')) {
            soundType = 'thunder';
            // Thunder/storm sound - low rumbling
            oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(20, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.8);
            oscillator.frequency.setValueAtTime(40, audioContext.currentTime + 1.2);
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.8);
            oscillator.type = 'sawtooth';
        } else if (description.includes('fairy') || description.includes('magical') || description.includes('sparkle') ||
                   description.includes('magic') || description.includes('twinkle') || description.includes('bell')) {
            soundType = 'fairy';
            // Magical fairy sound - ascending twinkling
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1320, audioContext.currentTime + 0.08);
            oscillator.frequency.setValueAtTime(1760, audioContext.currentTime + 0.16);
            oscillator.frequency.setValueAtTime(2200, audioContext.currentTime + 0.24);
            gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.type = 'sine';
        } else if (description.includes('train') || description.includes('chug') || description.includes('locomotive') ||
                   description.includes('choo')) {
            soundType = 'train';
            // Train chugging sound - rhythmic chugging
            oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(120, audioContext.currentTime + 0.15);
            oscillator.frequency.setValueAtTime(80, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(120, audioContext.currentTime + 0.45);
            oscillator.frequency.setValueAtTime(80, audioContext.currentTime + 0.6);
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
            oscillator.type = 'sawtooth';
        } else if (description.includes('ocean') || description.includes('wave') || description.includes('water') ||
                   description.includes('sea') || description.includes('splash') || description.includes('swoosh')) {
            soundType = 'ocean';
            // Ocean waves sound - swooshing back and forth
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 1);
            oscillator.frequency.exponentialRampToValueAtTime(250, audioContext.currentTime + 2);
            oscillator.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 3);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
            oscillator.type = 'sine';
        } else if (description.includes('bird') || description.includes('sing') || description.includes('chirp') ||
                   description.includes('tweet') || description.includes('chicken') || description.includes('duck')) {
            soundType = 'bird';
            // Bird singing sound - varied chirping
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1400, audioContext.currentTime + 0.08);
            oscillator.frequency.setValueAtTime(900, audioContext.currentTime + 0.16);
            oscillator.frequency.setValueAtTime(1300, audioContext.currentTime + 0.24);
            oscillator.frequency.setValueAtTime(1100, audioContext.currentTime + 0.32);
            gainNode.gain.setValueAtTime(0.35, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            oscillator.type = 'sine';
        } else if (description.includes('wind') || description.includes('blow') || description.includes('breeze') ||
                   description.includes('gust') || description.includes('air')) {
            soundType = 'wind';
            // Wind blowing sound - sweeping whoosh
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.8);
            oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 1.6);
            oscillator.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 2.4);
            gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.8);
            oscillator.type = 'sawtooth';
        } else if (description.includes('car') || description.includes('engine') || description.includes('motor') ||
                   description.includes('vroom') || description.includes('vehicle') || description.includes('truck')) {
            soundType = 'car';
            // Car engine sound - revving
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(250, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(180, audioContext.currentTime + 0.6);
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.9);
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
            oscillator.type = 'sawtooth';
        } else if (description.includes('fart') || description.includes('toot') || description.includes('gas') ||
                   description.includes('poop') || description.includes('funny noise')) {
            soundType = 'fart';
            // Funny fart sound - low frequency with wobble
            oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(60, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(90, audioContext.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(50, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(70, audioContext.currentTime + 0.4);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            oscillator.type = 'sawtooth';
        } else if (description.includes('alien') || description.includes('ufo') || description.includes('space') ||
                   description.includes('weird') || description.includes('strange') || description.includes('sci-fi')) {
            soundType = 'alien';
            // Alien/UFO sound - weird frequency modulation
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(900, audioContext.currentTime + 0.6);
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.8);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
            oscillator.type = 'triangle';
        } else if (description.includes('explosion') || description.includes('explode') || description.includes('blast') ||
                   description.includes('bang') || description.includes('kaboom')) {
            soundType = 'explosion';
            // Explosion sound - sudden burst
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            oscillator.type = 'sawtooth';
        } else {
            soundType = 'default';
            // Default: Happy ascending musical scale
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C note
            oscillator.frequency.setValueAtTime(587, audioContext.currentTime + 0.15); // D note
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.3); // E note
            oscillator.frequency.setValueAtTime(698, audioContext.currentTime + 0.45); // F note
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.6); // G note
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.9);
            oscillator.type = 'square';
        }


        // Start and stop the sound
        const duration = description.includes('ocean') || description.includes('wind') ? 3 :
                        description.includes('thunder') ? 1.8 :
                        description.includes('spaceship') ? 1.5 : 1.0;

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);

}

// Pick a random item from a list
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// Generate sound based on description
function generateSound() {
    const soundBox = document.getElementById('soundResult');
    const description = document.getElementById('soundPrompt').value.trim().toLowerCase();

    if (!description) return soundBox.innerHTML = '<div style="color: #e74c3c;">Please describe what sound you want me to make! 🔊</div>';

    // Show loading message
    soundBox.innerHTML = '<div style="color: #666; font-size: 18px;">🎵 Creating your sound... 🔊</div>';

    // Play the real sound!
    createSoundFromDescription(description);

    // Wait a moment, then show the result
    setTimeout(() => {
        let soundDescription = 'Custom sound effect';
        let emoji = '🔊';

        // Give a fun description based on what they asked for
        if (description.includes('spaceship') || description.includes('rocket') || description.includes('airplane') || description.includes('plane')) {
            soundDescription = 'Whoooosh! Flying through the air!';
            emoji = '🚀';
        } else if (description.includes('robot') || description.includes('beep') || description.includes('machine')) {
            soundDescription = 'Beep boop beep! Robot sounds!';
            emoji = '🤖';
        } else if (description.includes('thunder') || description.includes('storm') || description.includes('boom')) {
            soundDescription = 'Rumble rumble! Thunder crash!';
            emoji = '⛈️';
        } else if (description.includes('fairy') || description.includes('magic') || description.includes('twinkle')) {
            soundDescription = 'Twinkle twinkle! Magical sounds!';
            emoji = '✨';
        } else if (description.includes('train') || description.includes('choo')) {
            soundDescription = 'Choo choo! All aboard!';
            emoji = '🚂';
        } else if (description.includes('ocean') || description.includes('wave') || description.includes('water')) {
            soundDescription = 'Splash splash! Ocean waves!';
            emoji = '🌊';
        } else if (description.includes('bird') || description.includes('chirp') || description.includes('tweet')) {
            soundDescription = 'Tweet tweet! Bird singing!';
            emoji = '🐦';
        } else if (description.includes('wind') || description.includes('blow')) {
            soundDescription = 'Whoosh! Wind blowing!';
            emoji = '💨';
        } else if (description.includes('car') || description.includes('engine') || description.includes('vroom')) {
            soundDescription = 'Vroom vroom! Engine revving!';
            emoji = '🚗';
        } else if (description.includes('fart') || description.includes('toot')) {
            soundDescription = 'Pffft! Funny gas sound!';
            emoji = '💨';
        } else if (description.includes('alien') || description.includes('ufo') || description.includes('weird')) {
            soundDescription = 'Weird alien noises from space!';
            emoji = '👽';
        } else if (description.includes('explosion') || description.includes('blast') || description.includes('bang')) {
            soundDescription = 'KABOOM! Big explosion!';
            emoji = '💥';
        }

        soundBox.innerHTML = `
            <div style="background: linear-gradient(45deg, #feca57, #ff9ff3); padding: 20px; border-radius: 15px; color: #333;">
                <h3>🎵 Sound Created!</h3>
                <p style="font-size: 22px; font-weight: bold;">${emoji} ${soundDescription}</p>
                <p>🔊 Listen! We just played your custom sound! 🎶</p>
                <p style="font-style: italic; color: #666;">✨ Created from: "${description}"</p>
                <p>Try describing another sound! 🔊</p>
                <button onclick="document.getElementById('soundPrompt').value = pickRandom(funSoundPrompts); generateSound();" style="background: rgba(255,255,255,0.3); border: none; padding: 10px 15px; border-radius: 10px; color: #333; cursor: pointer; margin: 5px;">
                    Random Sound! 🎲
                </button>
            </div>
        `;

        // Make the sound box flash briefly
        soundBox.style.transform = 'scale(1.05)';
        setTimeout(() => {
            soundBox.style.transform = 'scale(1)';
        }, 200);
    }, 1000);
}

// Create SVG drawings based on descriptions
function generateImage() {
    const imageBox = document.getElementById('imageResult');
    const description = document.getElementById('imagePrompt').value.trim().toLowerCase();

    if (!description) return imageBox.innerHTML = '<div style="color: #e74c3c;">Please describe what you want me to draw! 🎨</div>';

    // Show loading message
    imageBox.innerHTML = '<div style="color: #666; font-size: 18px;">🎨 Drawing your picture... ✏️</div>';

    // Wait a moment, then create the drawing
    setTimeout(() => {
        let svgContent = '';
        let backgroundColor = '#87CEEB'; // Default sky blue
        let title = 'Your Picture';

        // Check what the user wants to draw and create simple SVG
        if (description.includes('sun')) {
            backgroundColor = '#FFE4B5';
            title = 'Sunny Day';
            svgContent = `
                <!-- Sun -->
                <circle cx="150" cy="80" r="40" fill="#FFD700" stroke="#FFA500" stroke-width="3"/>
                <!-- Sun rays -->
                <line x1="150" y1="20" x2="150" y2="5" stroke="#FFD700" stroke-width="4"/>
                <line x1="190" y1="40" x2="200" y2="30" stroke="#FFD700" stroke-width="4"/>
                <line x1="210" y1="80" x2="225" y2="80" stroke="#FFD700" stroke-width="4"/>
                <line x1="190" y1="120" x2="200" y2="130" stroke="#FFD700" stroke-width="4"/>
                <line x1="150" y1="140" x2="150" y2="155" stroke="#FFD700" stroke-width="4"/>
                <line x1="110" y1="120" x2="100" y2="130" stroke="#FFD700" stroke-width="4"/>
                <line x1="90" y1="80" x2="75" y2="80" stroke="#FFD700" stroke-width="4"/>
                <line x1="110" y1="40" x2="100" y2="30" stroke="#FFD700" stroke-width="4"/>
            `;
            if (description.includes('sunglasses')) {
                svgContent += `
                    <!-- Sunglasses -->
                    <rect x="130" y="70" width="20" height="15" fill="#000" rx="5"/>
                    <rect x="150" y="70" width="20" height="15" fill="#000" rx="5"/>
                    <line x1="148" y1="77" x2="152" y2="77" stroke="#000" stroke-width="2"/>
                `;
            }
            if (description.includes('happy') || description.includes('smile')) {
                svgContent += `
                    <!-- Happy face -->
                    <circle cx="140" cy="75" r="3" fill="#000"/>
                    <circle cx="160" cy="75" r="3" fill="#000"/>
                    <path d="M 135 90 Q 150 100 165 90" stroke="#000" stroke-width="3" fill="none"/>
                `;
            }
        } else if (description.includes('house')) {
            backgroundColor = '#98FB98';
            title = 'Cozy House';
            svgContent = `
                <!-- House base -->
                <rect x="100" y="120" width="100" height="80" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <!-- Roof -->
                <polygon points="90,120 150,70 210,120" fill="#CD5C5C" stroke="#8B0000" stroke-width="2"/>
                <!-- Door -->
                <rect x="130" y="160" width="20" height="40" fill="#654321" stroke="#000" stroke-width="1"/>
                <!-- Door knob -->
                <circle cx="145" cy="180" r="2" fill="#FFD700"/>
                <!-- Windows -->
                <rect x="110" y="140" width="15" height="15" fill="#87CEEB" stroke="#000" stroke-width="1"/>
                <rect x="175" y="140" width="15" height="15" fill="#87CEEB" stroke="#000" stroke-width="1"/>
                <!-- Window crosses -->
                <line x1="117" y1="140" x2="117" y2="155" stroke="#000" stroke-width="1"/>
                <line x1="110" y1="147" x2="125" y2="147" stroke="#000" stroke-width="1"/>
                <line x1="182" y1="140" x2="182" y2="155" stroke="#000" stroke-width="1"/>
                <line x1="175" y1="147" x2="190" y2="147" stroke="#000" stroke-width="1"/>
            `;
        } else if (description.includes('tree')) {
            backgroundColor = '#E0FFFF';
            title = 'Beautiful Tree';
            svgContent = `
                <!-- Tree trunk -->
                <rect x="145" y="150" width="10" height="50" fill="#8B4513"/>
                <!-- Tree leaves -->
                <circle cx="150" cy="130" r="30" fill="#228B22" stroke="#006400" stroke-width="2"/>
                <!-- Apples or flowers -->
                <circle cx="135" cy="120" r="4" fill="#FF0000"/>
                <circle cx="165" cy="125" r="4" fill="#FF0000"/>
                <circle cx="150" cy="145" r="4" fill="#FF0000"/>
            `;
        } else if (description.includes('car')) {
            backgroundColor = '#F0F8FF';
            title = 'Cool Car';
            svgContent = `
                <!-- Car body -->
                <rect x="80" y="140" width="140" height="40" fill="#FF4500" stroke="#000" stroke-width="2" rx="5"/>
                <!-- Car top -->
                <rect x="110" y="120" width="80" height="25" fill="#FF4500" stroke="#000" stroke-width="2" rx="8"/>
                <!-- Wheels -->
                <circle cx="110" cy="185" r="15" fill="#000"/>
                <circle cx="190" cy="185" r="15" fill="#000"/>
                <!-- Wheel centers -->
                <circle cx="110" cy="185" r="8" fill="#C0C0C0"/>
                <circle cx="190" cy="185" r="8" fill="#C0C0C0"/>
                <!-- Windows -->
                <rect x="120" y="125" width="25" height="15" fill="#87CEEB" stroke="#000" stroke-width="1"/>
                <rect x="155" y="125" width="25" height="15" fill="#87CEEB" stroke="#000" stroke-width="1"/>
                <!-- Headlights -->
                <circle cx="225" cy="155" r="8" fill="#FFFF00" stroke="#000" stroke-width="1"/>
            `;
        } else if (description.includes('cat')) {
            backgroundColor = '#FFF8DC';
            title = 'Cute Cat';
            svgContent = `
                <!-- Cat body -->
                <ellipse cx="150" cy="160" rx="25" ry="35" fill="#FFA500" stroke="#000" stroke-width="2"/>
                <!-- Cat head -->
                <circle cx="150" cy="100" r="25" fill="#FFA500" stroke="#000" stroke-width="2"/>
                <!-- Cat ears -->
                <polygon points="130,85 140,70 150,85" fill="#FFA500" stroke="#000" stroke-width="2"/>
                <polygon points="150,85 160,70 170,85" fill="#FFA500" stroke="#000" stroke-width="2"/>
                <!-- Cat eyes -->
                <circle cx="142" cy="95" r="4" fill="#000"/>
                <circle cx="158" cy="95" r="4" fill="#000"/>
                <!-- Cat nose -->
                <polygon points="148,105 150,100 152,105" fill="#FF69B4"/>
                <!-- Cat mouth -->
                <path d="M 150 108 Q 145 115 140 110" stroke="#000" stroke-width="2" fill="none"/>
                <path d="M 150 108 Q 155 115 160 110" stroke="#000" stroke-width="2" fill="none"/>
                <!-- Cat tail -->
                <path d="M 125 160 Q 100 140 120 120" stroke="#FFA500" stroke-width="8" fill="none"/>
            `;
        } else {
            // Default: Create a random colorful pattern
            title = 'Abstract Art';
            svgContent = `
                <!-- Random colorful shapes -->
                <circle cx="100" cy="100" r="30" fill="#FF69B4" opacity="0.7"/>
                <rect x="150" y="80" width="50" height="40" fill="#00CED1" opacity="0.7" rx="10"/>
                <polygon points="200,120 250,100 230,150" fill="#FFD700" opacity="0.7"/>
                <circle cx="180" cy="160" r="25" fill="#98FB98" opacity="0.7"/>
                <ellipse cx="120" cy="170" rx="40" ry="20" fill="#DDA0DD" opacity="0.7"/>
            `;
        }

        // Create the complete SVG
        const completeSVG = `
            <div style="text-align: center;">
                <h3>🎨 ${title}</h3>
                <svg width="300" height="200" style="background: ${backgroundColor}; border: 3px solid #333; border-radius: 15px; margin: 10px;">
                    ${svgContent}
                </svg>
                <p style="font-style: italic; color: #666;">✨ Created from: "${description}"</p>
                <p>Try describing something else! 🖼️</p>
                <button onclick="document.getElementById('imagePrompt').value = pickRandom(funImagePrompts); generateImage();" style="background: linear-gradient(45deg, #667eea, #764ba2); border: none; padding: 10px 15px; border-radius: 10px; color: white; cursor: pointer; margin: 5px;">
                    Random Picture! 🎲
                </button>
            </div>
        `;

        imageBox.innerHTML = completeSVG;
    }, 1500);
}

// Show welcome messages when page loads
const showWelcomeMessages = () => {
    document.getElementById('imageResult').innerHTML = '<div style="color: #666; font-size: 16px; padding: 15px;">🎨 Welcome to the Creative Playground! Describe a picture above and click the button! 🖼️</div>';
    document.getElementById('soundResult').innerHTML = '<div style="color: #666; font-size: 16px; padding: 15px;">🎵 Welcome! Describe a sound above and I\'ll create it for you! 🔊</div>';
};
window.onload = showWelcomeMessages;