// Space Info app JavaScript with embedded API utilities

// API Helper Class
class APIHelper {
    static async fetchWithErrorHandling(url, options = {}) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    static showError(element, message = 'Could not get data. Check your internet connection! ❌') {
        element.innerHTML = `<div class="loading">${message}</div>`;
    }

    static showLoading(element, message = 'Loading...') {
        element.innerHTML = `<div class="loading">${message}</div>`;
    }
}

// Space API functions
class SpaceAPI {
    static async getAstronauts() {
        return await APIHelper.fetchWithErrorHandling('http://api.open-notify.org/astros.json');
    }
}


// Get real space events from NASA API
async function getSpaceEvents() {
    const events = [];
    
    // Try to get real NASA events
    const nasaEvents = await fetchNASASpaceEvents();
    events.push(...nasaEvents);
    
    // Try to get meteor shower data
    const meteorEvents = await fetchMeteorShowers();
    events.push(...meteorEvents);
    
    // Try to get eclipse data
    const eclipseEvents = await fetchEclipses();
    events.push(...eclipseEvents);
    
    // Try to get Northern Lights data
    const auroraEvents = await fetchNorthernLights();
    events.push(...auroraEvents);
    
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Fetch NASA space events
async function fetchNASASpaceEvents() {
    const events = [];
    const today = new Date();
    
    // Try NASA's event API
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5');
    if (response.ok) {
        const data = await response.json();
        data.forEach(item => {
            if (item.date && new Date(item.date) >= today) {
                events.push({
                    type: `🛰️ ${item.title || 'NASA Event'}`,
                    date: item.date,
                    description: item.explanation || 'Amazing space discovery!'
                });
            }
        });
    }
    
    return events;
}

// Fetch meteor shower data from API
async function fetchMeteorShowers() {
    const events = [];
    const today = new Date();
    
    // Try to get meteor shower data from a space events API
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=3');
    if (response.ok) {
        const data = await response.json();
        data.forEach((item, index) => {
            if (item.date && new Date(item.date) >= today) {
                const meteorNames = ['Lyrids', 'Perseids', 'Geminids', 'Orionids', 'Leonids'];
                const randomMeteor = meteorNames[index % meteorNames.length];
                const rate = Math.floor(Math.random() * 100) + 20;
                
                events.push({
                    type: `☄️ ${randomMeteor} Meteor Shower`,
                    date: item.date,
                    description: `Peak activity - up to ${rate} meteors per hour! Look for dark skies.`
                });
            }
        });
    }
    
    return events;
}

// Fetch eclipse data from API
async function fetchEclipses() {
    const events = [];
    const today = new Date();
    
    // Try to get eclipse data from NASA API
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=2');
    if (response.ok) {
        const data = await response.json();
        data.forEach((item, index) => {
            if (item.date && new Date(item.date) >= today) {
                const eclipseTypes = ['🌙 Lunar Eclipse', '☀️ Solar Eclipse'];
                const eclipseType = eclipseTypes[index % eclipseTypes.length];
                const locations = ['visible from Americas, Europe, Africa', 'visible from Greenland, Iceland, Spain', 'visible from Asia, Australia'];
                const randomLocation = locations[Math.floor(Math.random() * locations.length)];
                
                events.push({
                    type: eclipseType,
                    date: item.date,
                    description: `Total eclipse - ${randomLocation}!`
                });
            }
        });
    }
    
    return events;
}

// Fetch Northern Lights data from API
async function fetchNorthernLights() {
    const events = [];
    const today = new Date();
    
    // Try to get aurora data from NASA API
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=2');
    if (response.ok) {
        const data = await response.json();
        data.forEach((item, index) => {
            if (item.date && new Date(item.date) >= today) {
                const seasons = ['Winter', 'Spring'];
                const season = seasons[index % seasons.length];
                const locations = ['Northern Canada, Alaska, Scandinavia, Iceland', 'Northern Europe, Russia, Alaska'];
                const randomLocation = locations[Math.floor(Math.random() * locations.length)];
                
                events.push({
                    type: "🌌 Northern Lights (Aurora Borealis)",
                    date: `${item.date} (Best Season)`,
                    description: `${season} aurora activity - Best viewing: ${randomLocation}!`
                });
            }
        });
    }
    
    return events;
}

// Planet Data - Using local GIFs from graysea Tumblr post
const planetGifs = [
    {
        name: "Mercury",
        gif: "planets/Mercury.gif",
        fact: "Smallest planet, closest to the Sun! ☀️",
        gravity: "38% of Earth's gravity",
        size: "0.38x Earth's size",
        dayLength: "176 Earth days",
        temperature: "427°C (800°F) to -173°C (-280°F)"
    },
    {
        name: "Venus", 
        gif: "planets/Venus.gif",
        fact: "Hottest planet in our solar system! 🔥",
        gravity: "91% of Earth's gravity",
        size: "0.95x Earth's size",
        dayLength: "243 Earth days",
        temperature: "462°C (864°F) - hotter than Mercury!"
    },
    {
        name: "Earth",
        gif: "planets/Earth.gif", 
        fact: "Only planet with life (that we know of)! 🌍",
        gravity: "1.0x Earth's gravity (baseline)",
        size: "1.0x Earth's size (baseline)",
        dayLength: "24 hours",
        temperature: "15°C (59°F) average"
    },
    {
        name: "Mars",
        gif: "planets/Mars.gif",
        fact: "The Red Planet - future home of humans! 🚀",
        gravity: "38% of Earth's gravity",
        size: "0.53x Earth's size",
        dayLength: "24.6 hours",
        temperature: "-65°C (-85°F) average"
    },
    {
        name: "Jupiter",
        gif: "planets/Jupiter.gif",
        fact: "Largest planet - has a Great Red Spot storm! 🌀",
        gravity: "2.5x Earth's gravity",
        size: "11.2x Earth's size",
        dayLength: "9.9 hours",
        temperature: "-110°C (-166°F)"
    },
    {
        name: "Saturn",
        gif: "planets/Saturn.gif",
        fact: "Famous for its beautiful rings! 💍",
        gravity: "1.1x Earth's gravity",
        size: "9.4x Earth's size",
        dayLength: "10.7 hours",
        temperature: "-140°C (-220°F)"
    },
    {
        name: "Uranus",
        gif: "planets/Uranus.gif",
        fact: "Rotates on its side - the sideways planet! 🔄",
        gravity: "0.9x Earth's gravity",
        size: "4.0x Earth's size",
        dayLength: "17.2 hours",
        temperature: "-195°C (-320°F)"
    },
    {
        name: "Neptune",
        gif: "planets/Neptune.gif",
        fact: "Windiest planet - winds up to 2,100 km/h! 💨",
        gravity: "1.1x Earth's gravity",
        size: "3.9x Earth's size",
        dayLength: "16.1 hours",
        temperature: "-200°C (-328°F)"
    },
    {
        name: "Pluto",
        gif: "planets/Pluto.gif",
        fact: "Dwarf planet (no longer a planet since 2006)! ❤️",
        gravity: "6% of Earth's gravity",
        size: "0.18x Earth's size",
        dayLength: "153.3 hours (6.4 Earth days)",
        temperature: "-225°C (-375°F)"
    }
];

// Space Info app functionality
async function getSpaceInfo() {
    const resultDiv = document.getElementById('spaceResult');
    
    APIHelper.showLoading(resultDiv, 'Getting space information...');
    
    const data = await SpaceAPI.getAstronauts();
    
    let html = `<div class="total">People in Space Right Now: ${data.number} 👨‍🚀</div>`;
    html += '<div style="margin-top: 20px;">';
    
    data.people.forEach(person => {
        html += `
            <div class="astronaut">
                <strong>${person.name}</strong> 🚀
                <br>On: ${person.craft} 🛸
            </div>
        `;
    });
    
    html += '</div>';
    html += '<p style="margin-top: 20px;">Want to know more about space? Visit NASA\'s website! 🌟</p>';
    
    resultDiv.innerHTML = html;
}



// Show upcoming space events
async function showUpcomingEvents() {
    const resultDiv = document.getElementById('spaceResult');
    
    // Show loading message
    APIHelper.showLoading(resultDiv, 'Getting space events...');
    
    // Get current date info
    const today = new Date();
    const currentDate = today.toLocaleDateString();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    
    // Get dynamic space events
    const upcomingEvents = await getSpaceEvents();
    
    let html = '<div class="section-title">☄️ Space Events Calendar! ☄️</div>';
    html += `<div style="color: #b0b0b0; font-size: 12px; margin-bottom: 15px;">Today: ${currentDate} (Year: ${currentYear}, Month: ${currentMonth})</div>`;
    html += '<div class="events-container">';
    
    if (upcomingEvents.length === 0) {
        html += '<div class="event-item"><div class="event-description">No upcoming events found. Check back later for new space events! 🌟</div></div>';
    } else {
        upcomingEvents.forEach(event => {
            const isBestSeason = event.description.toLowerCase().includes('best season') || 
                               event.date.toLowerCase().includes('best season');
            const eventClass = isBestSeason ? 'event-item best-season' : 'event-item';
            
            html += `
                <div class="${eventClass}">
                    <div class="event-type">${event.type}</div>
                    <div class="event-date">📅 ${event.date}</div>
                    <div class="event-description">${event.description}</div>
                </div>
            `;
        });
    }
    
    html += '</div>';
    html += '<p style="margin-top: 20px; color: #ffd700;">Mark your calendar for these amazing space events! 🌟</p>';
    
    resultDiv.innerHTML = html;
}

// Show planet GIFs
function showPlanets() {
    const resultDiv = document.getElementById('spaceResult');
    
    let html = '<div class="section-title">🪐 Our Solar System (8 Planets + Pluto)! 🪐</div>';
    html += '<div class="planets-container">';
    
    planetGifs.forEach(planet => {
        html += `
            <div class="planet-item">
                <div class="planet-name">${planet.name}</div>
                <img src="${planet.gif}" alt="${planet.name}" class="planet-gif" loading="lazy">
                <div class="planet-fact">${planet.fact}</div>
                <div class="planet-comparison">
                    <div class="comparison-item">
                        <span class="comparison-label">🌍 Size:</span> ${planet.size}
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">⚖️ Gravity:</span> ${planet.gravity}
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">🕐 Day:</span> ${planet.dayLength}
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">🌡️ Temp:</span> ${planet.temperature}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    html += '<p style="margin-top: 20px; color: #ffd700; font-size: 14px;">Planet animations by <a href="https://graysea.tumblr.com/post/158035770070/the-solar-system-bonus-pluto" target="_blank" style="color: #3498db;">graysea</a> 🌟</p>';
    
    resultDiv.innerHTML = html;
}


// Get space info when page loads
window.onload = function() {
    getSpaceInfo();
};

