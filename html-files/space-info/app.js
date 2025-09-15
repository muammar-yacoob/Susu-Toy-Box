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


// Upcoming Space Events Data (Mixed - Dynamic Filtering Applied)
const upcomingEvents = [
    {
        type: "☄️ Lyrids Meteor Shower",
        date: "April 16-25, 2025",
        description: "Peak: April 22 - up to 20 meteors per hour!"
    },
    {
        type: "☄️ Eta Aquarids Meteor Shower",
        date: "April 19 - May 28, 2025", 
        description: "Peak: May 6 - up to 60 meteors per hour!"
    },
    {
        type: "☄️ Perseids Meteor Shower",
        date: "July 17 - August 24, 2025",
        description: "Peak: August 12 - up to 100 meteors per hour!"
    },
    {
        type: "🌙 Partial Lunar Eclipse",
        date: "September 7, 2025",
        description: "Partial Lunar Eclipse - visible from Americas, Europe, Africa"
    },
    {
        type: "🌌 Northern Lights (Aurora Borealis)",
        date: "October 2024 - March 2025 (Best Season)",
        description: "Best viewing: Northern Canada, Alaska, Scandinavia, Iceland - look for dark skies!"
    },
    {
        type: "🌌 Northern Lights Peak Activity",
        date: "December 2024 - March 2025",
        description: "Solar maximum period - expect more frequent and intense aurora displays!"
    },
    {
        type: "☄️ Geminids Meteor Shower",
        date: "December 4-17, 2024",
        description: "Peak: December 13-14 - up to 120 meteors per hour! One of the best showers!"
    },
    {
        type: "🌌 Southern Lights (Aurora Australis)",
        date: "March - September 2025 (Best Season)",
        description: "Best viewing: Antarctica, Tasmania, New Zealand - southern hemisphere aurora!"
    },
    {
        type: "☀️ Total Solar Eclipse",
        date: "August 12, 2026",
        description: "Total Solar Eclipse - visible from Greenland, Iceland, Spain"
    },
    {
        type: "☄️ Quadrantids Meteor Shower",
        date: "December 28, 2024 - January 12, 2025",
        description: "Peak: January 3-4 - up to 120 meteors per hour!"
    },
    {
        type: "🌙 Total Lunar Eclipse",
        date: "March 14, 2025",
        description: "Total Lunar Eclipse - visible from Americas, Europe, Africa, Asia"
    },
    {
        type: "☄️ Orionids Meteor Shower",
        date: "October 2 - November 7, 2025",
        description: "Peak: October 21 - up to 20 meteors per hour!"
    }
];

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


// Helper function to check if an event is in the future
function isEventInFuture(eventDate) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
    
    // Extract year from date string (look for 4-digit year)
    const yearMatch = eventDate.match(/\b(20\d{2})\b/);
    if (!yearMatch) return true; // If no year found, assume it's future
    
    const eventYear = parseInt(yearMatch[1]);
    
    // If event year is greater than current year, it's definitely future
    if (eventYear > currentYear) return true;
    
    // If event year is less than current year, it's definitely past
    if (eventYear < currentYear) return false;
    
    // If event year is current year, check if it's a range that includes future months
    if (eventYear === currentYear) {
        // Check for month ranges in the date string
        const monthRanges = [
            { name: 'January', num: 1 }, { name: 'February', num: 2 }, { name: 'March', num: 3 },
            { name: 'April', num: 4 }, { name: 'May', num: 5 }, { name: 'June', num: 6 },
            { name: 'July', num: 7 }, { name: 'August', num: 8 }, { name: 'September', num: 9 },
            { name: 'October', num: 10 }, { name: 'November', num: 11 }, { name: 'December', num: 12 }
        ];
        
        // Check if any month in the range is current or future
        for (const month of monthRanges) {
            if (eventDate.includes(month.name)) {
                if (month.num >= currentMonth) return true;
            }
        }
        
        // Check for numeric month patterns (e.g., "April 19 - May 28" or "March - September")
        const numericMonthMatch = eventDate.match(/(\d{1,2})\s*-\s*(\d{1,2})/);
        if (numericMonthMatch) {
            const startMonth = parseInt(numericMonthMatch[1]);
            const endMonth = parseInt(numericMonthMatch[2]);
            return endMonth >= currentMonth;
        }
        
        // Check for single month patterns (e.g., "September 7")
        const singleMonthMatch = eventDate.match(/(\d{1,2})\s+\d{1,2}/);
        if (singleMonthMatch) {
            const month = parseInt(singleMonthMatch[1]);
            return month >= currentMonth;
        }
    }
    
    return false;
}

// Show upcoming space events
function showUpcomingEvents() {
    const resultDiv = document.getElementById('spaceResult');
    
    // Debug: Show current date
    const today = new Date();
    const currentDate = today.toLocaleDateString();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    
    // Filter events to only show future ones
    const futureEvents = upcomingEvents.filter(event => isEventInFuture(event.date));
    
    let html = '<div class="section-title">☄️ Space Events Calendar! ☄️</div>';
    html += `<div style="color: #b0b0b0; font-size: 12px; margin-bottom: 15px;">Today: ${currentDate} (Year: ${currentYear}, Month: ${currentMonth})</div>`;
    html += '<div class="events-container">';
    
    if (futureEvents.length === 0) {
        html += '<div class="event-item"><div class="event-description">No upcoming events found. Check back later for new space events! 🌟</div></div>';
    } else {
        futureEvents.forEach(event => {
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

