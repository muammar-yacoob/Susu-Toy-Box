// Template cache
let templates = {};

// Load templates from specific HTML files
async function loadTemplates() {
    if (Object.keys(templates).length > 0) return; // Already loaded

    const templateFiles = [
        { path: 'astronauts/templates.html', keys: ['astronauts', 'astronautitem'] },
        { path: 'events/templates.html', keys: ['events', 'eventitem'] },
        { path: 'planets/templates.html', keys: ['planets', 'planetitem'] },
        { path: 'apod/templates.html', keys: ['apod', 'apodimage', 'apodvideo'] }
    ];

    try {
        for (const file of templateFiles) {
            const response = await fetch(file.path);
            const html = await response.text();

            // Create a temporary div to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extract template contents
            const templateElements = tempDiv.querySelectorAll('template');
            templateElements.forEach(template => {
                const id = template.id.replace('-template', '').replace(/-/g, '');
                templates[id] = template.innerHTML.trim();
            });
        }
    } catch (error) {
        console.error('Failed to load templates:', error);
        // Fallback templates if loading fails
        templates = {
            astronauts: '<div class="total">People in Space Right Now: {number} 👨‍🚀</div><div class="astronauts-compact">{astronauts}</div><p style="margin-top: 20px;">Want to know more about space? Visit NASA\'s website! 🌟</p>',
            astronautitem: '<div class="astronaut-compact" onclick="showAstronautDetails(\'{name}\', \'{craft}\')" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform=\'scale(1.02)\'; startAstronautSpin(this.querySelector(\'.astronaut-icon\'))" onmouseleave="this.style.transform=\'scale(1)\'; stopAstronautSpin(this.querySelector(\'.astronaut-icon\'))"><img src="https://img.icons8.com/color/48/astronaut.png" alt="Astronaut" class="astronaut-icon" style="transition: all 0.3s ease;"><div class="astronaut-info"><div class="astronaut-name">{name}</div><div class="astronaut-craft">{craft}</div></div><img src="{flag}" alt="Country Flag" class="astronaut-flag"></div>',
            events: '<div class="section-title">☄️ Space Events Calendar! ☄️</div><div style="color: #b0b0b0; font-size: 12px; margin-bottom: 15px;">Today: {currentDate} (Year: {currentYear}, Month: {currentMonth})</div><div class="events-container">{events}</div><p style="margin-top: 20px; color: #ffd700;">Mark your calendar for these amazing space events! 🌟</p>',
            eventitem: '<div class="{eventClass}" data-type="{typeEncoded}" data-date="{googleDate}" data-description="{descriptionEncoded}" onclick="openCalendarEventData(this)" style="cursor: pointer;"><div class="event-type">{type}</div><div class="event-date">📅 {date}</div><div class="event-description">{description}</div></div>',
            planets: '<div class="section-title">🪐 Our Solar System (8 Planets + Pluto)! 🪐</div><div class="planets-container">{planets}</div><p style="margin-top: 20px; color: #ffd700; font-size: 14px;">Planet animations by <a href="https://graysea.tumblr.com/post/158035770070/the-solar-system-bonus-pluto" target="_blank" style="color: #3498db;">graysea</a> 🌟</p>',
            planetitem: '<div class="planet-item"><div class="planet-name">{name}</div><img src="{gif}" alt="{name}" class="planet-gif" loading="lazy"><div class="planet-fact">{fact}</div><div class="planet-comparison"><div class="comparison-item"><span class="comparison-label">🌍 Size:</span> {size}</div><div class="comparison-item"><span class="comparison-label">⚖️ Gravity:</span> {gravity}</div><div class="comparison-item"><span class="comparison-label">🕐 Day:</span> {dayLength}</div><div class="comparison-item"><span class="comparison-label">🌡️ Temp:</span> {temperature}</div></div></div>',
            apod: '<div class="section-title">🌌 NASA Astronomy Picture of the Day 🌌</div><div class="apod-container"><div class="apod-item"><div class="apod-title">{title}</div><div class="apod-date">📅 {date}</div><div class="apod-media-container">{media}</div><div class="apod-explanation">{explanation}</div><div class="apod-credit">{copyright}</div></div></div><p style="margin-top: 20px; color: #ffd700;">Discover the cosmos through NASA\'s daily space imagery! 🌟</p>',
            apodimage: '<img src="{url}" alt="{title}" class="apod-image" onclick="openImageFullscreen(\'{hdurl}\', \'{title}\')" style="cursor: pointer;" loading="lazy">',
            apodvideo: '<div class="apod-video-wrapper"><iframe src="{url}" class="apod-video" frameborder="0" allowfullscreen></iframe></div>'
        };
    }
}

// Template getters
const getTemplate = (name) => templates[name] || '<div class="loading">Loading... 🚀</div>';

// Open calendar event safely using data attributes
function openCalendarEventData(element) {
    const type = element.getAttribute('data-type');
    const googleDate = element.getAttribute('data-date');
    const description = element.getAttribute('data-description');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${type}&dates=${googleDate}/${googleDate}&details=${description}`;
    window.open(url, '_blank');
}

const planets = [{name:"Mercury",gif:"planets/Mercury.gif",fact:"Smallest planet, closest to the Sun! ☀️",gravity:"38% of Earth's gravity",size:"0.38x Earth's size",dayLength:"176 Earth days",temperature:"427°C (800°F) to -173°C (-280°F)"},{name:"Venus",gif:"planets/Venus.gif",fact:"Hottest planet in our solar system! 🔥",gravity:"91% of Earth's gravity",size:"0.95x Earth's size",dayLength:"243 Earth days",temperature:"462°C (864°F) - hotter than Mercury!"},{name:"Earth",gif:"planets/Earth.gif",fact:"Only planet with life (that we know of)! 🌍",gravity:"1.0x Earth's gravity (baseline)",size:"1.0x Earth's size (baseline)",dayLength:"24 hours",temperature:"15°C (59°F) average"},{name:"Mars",gif:"planets/Mars.gif",fact:"The Red Planet - future home of humans! 🚀",gravity:"38% of Earth's gravity",size:"0.53x Earth's size",dayLength:"24.6 hours",temperature:"-65°C (-85°F) average"},{name:"Jupiter",gif:"planets/Jupiter.gif",fact:"Largest planet - has a Great Red Spot storm! 🌀",gravity:"2.5x Earth's gravity",size:"11.2x Earth's size",dayLength:"9.9 hours",temperature:"-110°C (-166°F)"},{name:"Saturn",gif:"planets/Saturn.gif",fact:"Famous for its beautiful rings! 💍",gravity:"1.1x Earth's gravity",size:"9.4x Earth's size",dayLength:"10.7 hours",temperature:"-140°C (-220°F)"},{name:"Uranus",gif:"planets/Uranus.gif",fact:"Rotates on its side - the sideways planet! 🔄",gravity:"0.9x Earth's gravity",size:"4.0x Earth's size",dayLength:"17.2 hours",temperature:"-195°C (-320°F)"},{name:"Neptune",gif:"planets/Neptune.gif",fact:"Windiest planet - winds up to 2,100 km/h! 💨",gravity:"1.1x Earth's gravity",size:"3.9x Earth's size",dayLength:"16.1 hours",temperature:"-200°C (-328°F)"},{name:"Pluto",gif:"planets/Pluto.gif",fact:"Dwarf planet (no longer a planet since 2006)! ❤️",gravity:"6% of Earth's gravity",size:"0.18x Earth's size",dayLength:"153.3 hours (6.4 Earth days)",temperature:"-225°C (-375°F)"}];

function formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function formatGoogleDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

function getCountryFlagByNationality(nationality) {
    const nationalityFlags = {
        'american': 'https://img.icons8.com/color/32/usa.png',
        'usa': 'https://img.icons8.com/color/32/usa.png',
        'united states': 'https://img.icons8.com/color/32/usa.png',
        'russian': 'https://img.icons8.com/color/32/russian-federation.png',
        'russia': 'https://img.icons8.com/color/32/russian-federation.png',
        'chinese': 'https://img.icons8.com/color/32/china.png',
        'china': 'https://img.icons8.com/color/32/china.png',
        'japanese': 'https://img.icons8.com/color/32/japan.png',
        'japan': 'https://img.icons8.com/color/32/japan.png',
        'french': 'https://img.icons8.com/color/32/france.png',
        'france': 'https://img.icons8.com/color/32/france.png',
        'italian': 'https://img.icons8.com/color/32/italy.png',
        'italy': 'https://img.icons8.com/color/32/italy.png',
        'german': 'https://img.icons8.com/color/32/germany.png',
        'germany': 'https://img.icons8.com/color/32/germany.png',
        'canadian': 'https://img.icons8.com/color/32/canada.png',
        'canada': 'https://img.icons8.com/color/32/canada.png',
        'british': 'https://img.icons8.com/color/32/great-britain.png',
        'uk': 'https://img.icons8.com/color/32/great-britain.png',
        'united kingdom': 'https://img.icons8.com/color/32/great-britain.png',
        'swiss': 'https://img.icons8.com/color/32/switzerland.png',
        'switzerland': 'https://img.icons8.com/color/32/switzerland.png',
        'spanish': 'https://img.icons8.com/color/32/spain.png',
        'spain': 'https://img.icons8.com/color/32/spain.png',
        'dutch': 'https://img.icons8.com/color/32/netherlands.png',
        'netherlands': 'https://img.icons8.com/color/32/netherlands.png',
        'belgian': 'https://img.icons8.com/color/32/belgium.png',
        'belgium': 'https://img.icons8.com/color/32/belgium.png',
        'swedish': 'https://img.icons8.com/color/32/sweden.png',
        'sweden': 'https://img.icons8.com/color/32/sweden.png',
        'danish': 'https://img.icons8.com/color/32/denmark.png',
        'denmark': 'https://img.icons8.com/color/32/denmark.png',
        'norwegian': 'https://img.icons8.com/color/32/norway.png',
        'norway': 'https://img.icons8.com/color/32/norway.png'
    };

    if (!nationality || nationality === 'Unknown') {
        return 'https://img.icons8.com/color/32/earth-planet.png';
    }

    const key = nationality.toLowerCase().trim();
    console.log('Looking up flag for nationality:', nationality, '-> key:', key);
    const flag = nationalityFlags[key] || 'https://img.icons8.com/color/32/earth-planet.png';
    console.log('Flag found:', flag);
    return flag;
}

// Fallback nationality detection based on name patterns and spacecraft
function getFallbackNationality(name, craft) {
    // Spacecraft-based detection
    if (craft === 'Tiangong') {
        return 'Chinese';  // Chinese space station
    }

    // Name pattern detection (common patterns for when API is unavailable)
    const namePatterns = {
        // Russian patterns
        'Russian': ['Oleg', 'Sergey', 'Alexander', 'Dmitri', 'Andrey', 'Mikhail', 'Yuri', 'Viktor', 'Anatoly', 'Gennady', 'Nikolai', 'Pavel', 'Alexey'],
        // American patterns
        'American': ['Michael', 'Robert', 'David', 'John', 'James', 'William', 'Richard', 'Christopher', 'Matthew', 'Daniel', 'Thomas', 'Mark', 'Steven', 'Paul', 'Andrew', 'Frank', 'Scott', 'Tracy', 'Jeanette', 'Sunita', 'Butch'],
        // Japanese patterns
        'Japanese': ['Akihiko', 'Koichi', 'Satoshi', 'Takuya', 'Soichi', 'Kimiya'],
        // European patterns
        'Italian': ['Luca', 'Paolo', 'Roberto', 'Samantha'],
        'French': ['Thomas', 'Jean-Jacques', 'Philippe', 'Claudie', 'Leopold'],
        'German': ['Alexander', 'Matthias', 'Gerhard'],
        // Chinese patterns
        'Chinese': ['Yang', 'Zhai', 'Liu', 'Jing', 'Wang', 'Nie', 'Fei', 'Li', 'Ye', 'Chen', 'Tang', 'Deng']
    };

    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').pop();

    // Check patterns
    for (const [nationality, patterns] of Object.entries(namePatterns)) {
        if (patterns.some(pattern => firstName.includes(pattern) || lastName.includes(pattern))) {
            return nationality;
        }
    }

    // Additional specific name checks
    if (name.includes('Kononenko') || name.includes('Chub') || name.includes('Grebenkin')) return 'Russian';
    if (name.includes('Williams') || name.includes('Wilmore') || name.includes('Dyson') || name.includes('Dominick') || name.includes('Barratt') || name.includes('Epps')) return 'American';
    if (name.includes('Guangsu') || name.includes('Guangfu') || name.includes('Cong')) return 'Chinese';

    return 'Unknown';
}

async function getSpaceInfo() {
    const result = document.getElementById('spaceResult');
    result.innerHTML = '<div class="loading loading-spinner"></div>';

    try {
        // Get current people in space
        const currentResponse = await fetch('http://api.open-notify.org/astros.json');
        const currentData = await currentResponse.json();

        // Get detailed astronaut information from Launch Library API
        const astronautsWithDetails = await Promise.all(
            currentData.people.map(async (person) => {
                try {
                    // Search for astronaut by name in Launch Library API
                    const searchResponse = await fetch(`https://ll.thespacedevs.com/2.2.0/astronaut/?search=${encodeURIComponent(person.name)}&limit=1`);
                    const searchData = await searchResponse.json();

                    // Check for API error (like rate limiting)
                    if (searchData.detail && searchData.detail.includes('throttled')) {
                        console.log(`API throttled for ${person.name} - using fallback nationality detection`);
                        const fallbackNationality = getFallbackNationality(person.name, person.craft);
                        return {
                            ...person,
                            nationality: fallbackNationality,
                            profile_image: 'https://img.icons8.com/color/48/astronaut.png',
                            bio: '',
                            age: null,
                            agency: ''
                        };
                    }

                    if (searchData.results && searchData.results.length > 0) {
                        const astronaut = searchData.results[0];
                        console.log(`Found astronaut data for ${person.name}:`, astronaut);
                        console.log(`Nationality: "${astronaut.nationality}"`);
                        return {
                            ...person,
                            nationality: astronaut.nationality || 'Unknown',
                            profile_image: astronaut.profile_image_thumbnail || astronaut.profile_image || 'https://img.icons8.com/color/48/astronaut.png',
                            bio: astronaut.bio || '',
                            age: astronaut.age || null,
                            agency: astronaut.agency?.name || ''
                        };
                    } else {
                        console.log(`No astronaut data found for ${person.name} - using fallback nationality detection`);
                    }
                    const fallbackNationality = getFallbackNationality(person.name, person.craft);
                    return {
                        ...person,
                        nationality: fallbackNationality,
                        profile_image: 'https://img.icons8.com/color/48/astronaut.png',
                        bio: '',
                        age: null,
                        agency: ''
                    };
                } catch (error) {
                    console.warn(`Failed to fetch details for ${person.name}:`, error);

                    // Check if it's a rate limiting error
                    if (error.message && error.message.includes('throttled')) {
                        console.log('API rate limited - using fallback nationality detection');
                    }

                    const fallbackNationality = getFallbackNationality(person.name, person.craft);
                    return {
                        ...person,
                        nationality: fallbackNationality,
                        profile_image: 'https://img.icons8.com/color/48/astronaut.png',
                        bio: '',
                        age: null,
                        agency: ''
                    };
                }
            })
        );

        const astronautsHtml = astronautsWithDetails.map(astronaut => {
            const flag = getCountryFlagByNationality(astronaut.nationality);
            return getTemplate('astronautitem')
                .replace(/{name}/g, astronaut.name)
                .replace(/{craft}/g, astronaut.craft)
                .replace('{flag}', flag);
        }).join('');

        result.innerHTML = getTemplate('astronauts').replace('{number}', currentData.number).replace('{astronauts}', astronautsHtml);

        // Store astronaut details globally for modal use
        window.currentAstronauts = astronautsWithDetails;

    } catch (error) {
        console.error('Failed to fetch astronaut data:', error);
        result.innerHTML = '<div class="loading">Failed to load astronaut data. Please try again later.</div>';
    }
}

function showPlanets() {
    const result = document.getElementById('spaceResult');
    const planetsHtml = planets.map(p => {
        const planetClass = p.name === 'Pluto' ? 'planet-item pluto' : 'planet-item';
        return getTemplate('planetitem').replace('class="planet-item"', `class="${planetClass}"`).replace(/{name}/g, p.name).replace('{gif}', p.gif).replace('{fact}', p.fact).replace('{size}', p.size).replace('{gravity}', p.gravity).replace('{dayLength}', p.dayLength).replace('{temperature}', p.temperature);
    }).join('');
    result.innerHTML = getTemplate('planets').replace('{planets}', planetsHtml);
}

function showUpcomingEvents() {
    const result = document.getElementById('spaceResult');
    const today = new Date();
    const currentDate = today.toLocaleDateString();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const events = [];

    // NASA events
    [{month:3,day:15,title:'Mars Rover Mission Update',desc:'Latest discoveries from the Red Planet exploration'},{month:6,day:20,title:'International Space Station Expedition',desc:'New crew arrives at the ISS for 6-month mission'},{month:9,day:10,title:'James Webb Space Telescope Discovery',desc:'New exoplanet findings from deep space observations'},{month:12,day:5,title:'Artemis Moon Mission Update',desc:'Progress on NASA\'s return to the Moon program'}].forEach(e => {
        const eventDate = new Date(currentYear, e.month - 1, e.day);
        if (eventDate >= today) events.push({type:`🛰️ ${e.title}`,date:formatDate(eventDate),googleDate:formatGoogleDate(eventDate),description:e.desc});
    });

    // Meteor showers
    [{name:"Lyrids",month:4,day:22,rate:20},{name:"Eta Aquarids",month:5,day:6,rate:60},{name:"Perseids",month:8,day:12,rate:100},{name:"Orionids",month:10,day:21,rate:20},{name:"Leonids",month:11,day:17,rate:15},{name:"Geminids",month:12,day:13,rate:120},{name:"Quadrantids",month:1,day:3,rate:120}].forEach(s => {
        for (let year = currentYear; year <= currentYear + 1; year++) {
            const eventDate = new Date(year, s.month - 1, s.day);
            if (eventDate >= today) events.push({type:`☄️ ${s.name} Meteor Shower`,date:formatDate(eventDate),googleDate:formatGoogleDate(eventDate),description:`Peak: ${formatDate(eventDate)} - up to ${s.rate} meteors per hour!`});
        }
    });

    // Eclipses
    [{type:"🌙 Lunar Eclipse",month:3,day:14,year:currentYear+1,desc:"Total Lunar Eclipse - visible from Americas, Europe, Africa, Asia"},{type:"☀️ Solar Eclipse",month:8,day:12,year:currentYear+2,desc:"Total Solar Eclipse - visible from Greenland, Iceland, Spain"},{type:"🌙 Lunar Eclipse",month:9,day:7,year:currentYear+1,desc:"Partial Lunar Eclipse - visible from Americas, Europe, Africa"},{type:"☀️ Solar Eclipse",month:4,day:8,year:currentYear+1,desc:"Total Solar Eclipse - visible from North America"}].forEach(e => {
        const eventDate = new Date(e.year, e.month - 1, e.day);
        if (eventDate >= today) events.push({type:e.type,date:formatDate(eventDate),googleDate:formatGoogleDate(eventDate),description:e.desc});
    });

    // Northern Lights
    [12,1,2,3,4,5].forEach(month => {
        const year = month <= 3 ? currentYear + 1 : currentYear;
        const eventDate = new Date(year, month - 1, 15);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (eventDate >= today) events.push({type:"🌌 Northern Lights (Aurora Borealis)",date:`${months[month - 1]} ${year} (Best Season)`,googleDate:formatGoogleDate(eventDate),description:"Best viewing: Northern Canada, Alaska, Scandinavia, Iceland - look for dark skies!"});
    });

    events.sort((a,b) => new Date(a.date.split(' ')[0]) - new Date(b.date.split(' ')[0]));
    const eventsHtml = events.length > 0 ? events.map(e => {
        const isBestSeason = e.description.includes('Best viewing') || e.date.includes('Best Season');
        const eventClass = isBestSeason ? 'event-item best-season' : 'event-item';
        const typeEncoded = encodeURIComponent(e.type);
        const descriptionEncoded = encodeURIComponent(e.description);
        return getTemplate('eventitem').replace(/{eventClass}/g, eventClass).replace(/{type}/g, e.type).replace(/{date}/g, e.date).replace(/{googleDate}/g, e.googleDate).replace(/{description}/g, e.description).replace(/{typeEncoded}/g, typeEncoded).replace(/{descriptionEncoded}/g, descriptionEncoded);
    }).join('') : '<div class="event-item"><div class="event-description">No upcoming events found. Check back later for new space events! 🌟</div></div>';
    result.innerHTML = getTemplate('events').replace('{currentDate}', currentDate).replace('{currentYear}', currentYear).replace('{currentMonth}', currentMonth).replace('{events}', eventsHtml);
}

// Load modal template once on page load
function getAstronautModalTemplate() {
    return `
        <div style="text-align: center;">
            <img src="{photo}" alt="{name}" style="width: 64px; height: 64px; border-radius: 50%; margin-bottom: 10px;">
            <div style="font-size: 18px; font-weight: bold; color: #ffd700; margin-bottom: 8px;">{name}</div>
            <div style="font-size: 14px; color: #e0e0e0; margin-bottom: 5px;">Nationality: {nationality}</div>
            {ageSection}
            <div style="font-size: 14px; color: #3498db; margin-bottom: 5px;">Mission: {craft}</div>
            {agencySection}
        </div>
    `;
}

// Simple astronaut details message box
function showAstronautDetails(name, craft) {
    // Find astronaut in stored data
    const astronaut = window.currentAstronauts?.find(a => a.name === name) || {
        name,
        craft,
        nationality: 'Unknown',
        profile_image: 'https://img.icons8.com/color/64/astronaut.png',
        age: null,
        agency: ''
    };

    // Load template and populate with data
    const template = getAstronautModalTemplate();
    const ageSection = astronaut.age ? `<div style="font-size: 14px; color: #e0e0e0; margin-bottom: 5px;">Age: ${astronaut.age}</div>` : '';
    const agencySection = astronaut.agency ? `<div style="font-size: 12px; color: #b0b0b0;">Agency: ${astronaut.agency}</div>` : '';

    const modalContent = template
        .replace(/{name}/g, astronaut.name)
        .replace(/{nationality}/g, astronaut.nationality)
        .replace(/{craft}/g, astronaut.craft)
        .replace(/{photo}/g, astronaut.profile_image)
        .replace(/{ageSection}/g, ageSection)
        .replace(/{agencySection}/g, agencySection);

    // Create small message box
    const messageBox = document.createElement('div');
    messageBox.id = 'astronautMessage';
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border: 2px solid #ffd700;
        border-radius: 15px;
        padding: 20px;
        z-index: 1000;
        color: white;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.7);
        max-width: 300px;
        width: 90%;
    `;

    messageBox.innerHTML = modalContent;

    // Add overlay
    const overlay = document.createElement('div');
    overlay.id = 'astronautOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 999;
    `;
    overlay.onclick = closeAstronautMessage;

    document.body.appendChild(overlay);
    document.body.appendChild(messageBox);
}

function closeAstronautMessage() {
    const message = document.getElementById('astronautMessage');
    const overlay = document.getElementById('astronautOverlay');
    if (message) message.remove();
    if (overlay) overlay.remove();
}


// Astronaut icon animation functions
function startAstronautSpin(element) {
    element.classList.remove('scale-out', 'scale-in');
    element.classList.add('spinning');
}

function stopAstronautSpin(element) {
    // Get current rotation to continue seamlessly
    const computedStyle = window.getComputedStyle(element);
    const matrix = computedStyle.transform;
    let currentRotation = 0;

    if (matrix && matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        currentRotation = Math.atan2(b, a) * (180/Math.PI);
    }

    // Set CSS custom property for current rotation
    element.style.setProperty('--current-rotation', `${currentRotation}deg`);

    // Continue rotation while scaling to 0
    element.classList.remove('spinning');
    element.classList.add('scale-out');

    // After scaling to 0, wait a moment then fade back in
    setTimeout(() => {
        element.classList.remove('scale-out');
        element.style.removeProperty('--current-rotation');
        element.classList.add('scale-in');
    }, 1800); // 1200ms scale + 600ms delay
}

// NASA APOD functions
async function showAPOD() {
    const result = document.getElementById('spaceResult');
    result.innerHTML = '<div class="loading loading-spinner"></div>';

    try {
        await loadTemplates();

        // Get NASA APOD data (demo key allows 30 requests per hour)
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const data = await response.json();

        // Determine media type and create appropriate template
        let mediaTemplate = '';
        if (data.media_type === 'image') {
            mediaTemplate = getTemplate('apodimage')
                .replace('{url}', data.url || '')
                .replace('{hdurl}', data.hdurl || data.url || '')
                .replace('{title}', data.title || '');
        } else if (data.media_type === 'video') {
            mediaTemplate = getTemplate('apodvideo')
                .replace('{url}', data.url || '');
        }

        // Format date nicely
        const dateObj = new Date(data.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create copyright text
        const copyrightText = data.copyright ?
            `© ${data.copyright}` :
            'Image Credit: NASA';

        const apodHtml = getTemplate('apod')
            .replace('{title}', data.title || 'NASA Astronomy Picture of the Day')
            .replace('{date}', formattedDate)
            .replace('{media}', mediaTemplate)
            .replace('{explanation}', data.explanation || 'No description available.')
            .replace('{copyright}', copyrightText);

        result.innerHTML = apodHtml;

    } catch (error) {
        console.error('Error fetching APOD:', error);
        result.innerHTML = `
            <div class="section-title">🌌 NASA Photo of the Day 🌌</div>
            <div class="apod-container">
                <div class="apod-item">
                    <div class="apod-title">Service Temporarily Unavailable</div>
                    <div class="apod-explanation">
                        Sorry, we couldn't load today's astronomy picture. This could be due to:
                        <br>• NASA API rate limits
                        <br>• Network connectivity issues
                        <br>• Service maintenance
                        <br><br>Please try again in a few minutes! 🚀
                    </div>
                </div>
            </div>
        `;
    }
}

// Fullscreen image viewer
function openImageFullscreen(imageUrl, title) {
    if (!imageUrl) return;

    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.onclick = () => modal.remove();

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    img.onclick = (e) => e.stopPropagation(); // Prevent modal close when clicking image

    modal.appendChild(img);
    document.body.appendChild(modal);
}

async function initApp() {
    await loadTemplates();
    getSpaceInfo();
}