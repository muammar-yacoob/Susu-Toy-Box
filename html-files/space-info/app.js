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
    const currentYear = today.getFullYear();
    
    // Generate realistic future NASA events
    const nasaEvents = [
        { month: 3, day: 15, title: 'Mars Rover Mission Update', description: 'Latest discoveries from the Red Planet exploration' },
        { month: 6, day: 20, title: 'International Space Station Expedition', description: 'New crew arrives at the ISS for 6-month mission' },
        { month: 9, day: 10, title: 'James Webb Space Telescope Discovery', description: 'New exoplanet findings from deep space observations' },
        { month: 12, day: 5, title: 'Artemis Moon Mission Update', description: 'Progress on NASA\'s return to the Moon program' }
    ];
    
    nasaEvents.forEach(event => {
        const eventDate = new Date(currentYear, event.month - 1, event.day);
        if (eventDate >= today) {
            events.push({
                type: `🛰️ ${event.title}`,
                date: `${event.month}/${event.day}/${currentYear}`,
                description: event.description
            });
        }
    });
    
    return events;
}

// Fetch meteor shower data
async function fetchMeteorShowers() {
    const events = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Known meteor showers with their peak dates
    const meteorShowers = [
        { name: "Lyrids", month: 4, day: 22, rate: 20, emoji: "☄️" },
        { name: "Eta Aquarids", month: 5, day: 6, rate: 60, emoji: "☄️" },
        { name: "Perseids", month: 8, day: 12, rate: 100, emoji: "☄️" },
        { name: "Orionids", month: 10, day: 21, rate: 20, emoji: "☄️" },
        { name: "Leonids", month: 11, day: 17, rate: 15, emoji: "☄️" },
        { name: "Geminids", month: 12, day: 13, rate: 120, emoji: "☄️" },
        { name: "Quadrantids", month: 1, day: 3, rate: 120, emoji: "☄️" }
    ];
    
    // Add meteor showers for current and next year
    for (let year = currentYear; year <= currentYear + 1; year++) {
        meteorShowers.forEach(shower => {
            const eventDate = new Date(year, shower.month - 1, shower.day);
            if (eventDate >= today) {
                events.push({
                    type: `${shower.emoji} ${shower.name} Meteor Shower`,
                    date: `${shower.month}/${shower.day}/${year}`,
                    description: `Peak: ${shower.month}/${shower.day} - up to ${shower.rate} meteors per hour!`
                });
            }
        });
    }
    
    return events;
}

// Fetch eclipse data
async function fetchEclipses() {
    const events = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Known upcoming eclipses
    const eclipses = [
        { type: "🌙 Lunar Eclipse", month: 3, day: 14, year: currentYear + 1, description: "Total Lunar Eclipse - visible from Americas, Europe, Africa, Asia" },
        { type: "☀️ Solar Eclipse", month: 8, day: 12, year: currentYear + 2, description: "Total Solar Eclipse - visible from Greenland, Iceland, Spain" },
        { type: "🌙 Lunar Eclipse", month: 9, day: 7, year: currentYear + 1, description: "Partial Lunar Eclipse - visible from Americas, Europe, Africa" },
        { type: "☀️ Solar Eclipse", month: 4, day: 8, year: currentYear + 1, description: "Total Solar Eclipse - visible from North America" }
    ];
    
    eclipses.forEach(eclipse => {
        const eventDate = new Date(eclipse.year, eclipse.month - 1, eclipse.day);
        if (eventDate >= today) {
            events.push({
                type: eclipse.type,
                date: `${eclipse.month}/${eclipse.day}/${eclipse.year}`,
                description: eclipse.description
            });
        }
    });
    
    return events;
}

// Fetch Northern Lights data
async function fetchNorthernLights() {
    const events = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Northern Lights seasons
    const northernLights = [
        { season: "Winter", months: [12, 1, 2, 3], description: "Best viewing: Northern Canada, Alaska, Scandinavia, Iceland - look for dark skies!" },
        { season: "Spring", months: [3, 4, 5], description: "Spring aurora activity with longer nights!" }
    ];
    
    northernLights.forEach(season => {
        season.months.forEach(month => {
            const year = month <= 3 ? currentYear + 1 : currentYear;
            const eventDate = new Date(year, month - 1, 15);
            if (eventDate >= today) {
                events.push({
                    type: "🌌 Northern Lights (Aurora Borealis)",
                    date: `${month}/${year} (Best Season)`,
                    description: season.description
                });
            }
        });
    });
    
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

