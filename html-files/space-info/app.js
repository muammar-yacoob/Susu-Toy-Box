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
             astronautitem: '<div class="astronaut-compact" onclick="showAstronautDetails(\'{name}\', \'{craft}\', \'{nasaImage}\')" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform=\'scale(1.02)\'; startAstronautSpin(this.querySelector(\'.astronaut-icon\'))" onmouseleave="this.style.transform=\'scale(1)\'; stopAstronautSpin(this.querySelector(\'.astronaut-icon\'))"><img src="{nasaImage}" alt="Astronaut" class="astronaut-icon" style="transition: all 0.3s ease; border-radius: 50%; width: 48px; height: 48px; object-fit: cover;" onerror="this.src=\'https://img.icons8.com/color/48/astronaut.png\'"><div class="astronaut-info"><div class="astronaut-name">{name}</div><div class="astronaut-craft">{craft}</div></div><img src="{flag}" alt="Country Flag" class="astronaut-flag"></div>',
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

// NASA API configuration
const NASA_IMAGE_API_URL = 'https://images-api.nasa.gov/search';

// Cache for astronaut data to prevent multiple API calls
const astronautCache = new Map();

// Pre-populate cache with demo APOD data for when API is unavailable
function initializeDemoCache() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Add some demo APOD entries with working image URLs
    const demoAPODs = [
        {
            date: today,
            title: "The NGC 6914 Complex",
            explanation: "This cosmic vista spans about 40 light-years through the nebula-rich constellation of Cygnus the Swan. In the center lies NGC 6914, a reflection nebula with striking red emission regions and intricate dark dust lanes. The interstellar clouds of gas and dust in this region are illuminated by the light of hot, young stars.",
            media_type: "image",
            url: "https://apod.nasa.gov/apod/image/2509/NGC6914_1024.jpg",
            hdurl: "https://apod.nasa.gov/apod/image/2509/NGC6914_2048.jpg"
        },
        {
            date: yesterdayStr,
            title: "Saturn's Rings in Natural Color",
            explanation: "What do Saturn's rings look like in natural color? The featured image shows Saturn's rings in the most accurate natural color reconstruction possible using images from the robotic Cassini spacecraft that orbited Saturn from 2004 to 2017. The colors are subtle and result from different types of ring particles reflecting sunlight differently.",
            media_type: "image",
            url: "https://apod.nasa.gov/apod/image/1710/saturn_cassini_960.jpg",
            hdurl: "https://apod.nasa.gov/apod/image/1710/saturn_cassini_4800.jpg"
        }
    ];

    demoAPODs.forEach(apod => {
        const cacheKey = `apod_${apod.date}`;
        if (!astronautCache.has(cacheKey)) {
            astronautCache.set(cacheKey, apod);
            console.log('Added demo APOD data for', apod.date);
        }
    });
}

async function getNasaAstronautImage(astronautName) {
    // Check cache first
    const cacheKey = `image_${astronautName}`;
    if (astronautCache.has(cacheKey)) {
        return astronautCache.get(cacheKey);
    }

    try {
        // Search NASA Image and Video Library for astronaut photos (no API key needed for this endpoint)
        const searchQuery = encodeURIComponent(astronautName + ' astronaut portrait');

        // Add timeout for NASA API calls
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response = await fetch(`${NASA_IMAGE_API_URL}?q=${searchQuery}&media_type=image&year_start=2020`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`NASA API request failed: ${response.status}`);
        }

        const data = await response.json();
        let imageUrl = null;

        if (data.collection && data.collection.items && data.collection.items.length > 0) {
            // Find the first image that looks like a portrait
            const portraitItem = data.collection.items.find(item =>
                item.links && item.links[0] &&
                (item.data[0].description.toLowerCase().includes('portrait') ||
                 item.data[0].description.toLowerCase().includes('astronaut'))
            );

            if (portraitItem && portraitItem.links[0]) {
                imageUrl = portraitItem.links[0].href;
            } else if (data.collection.items[0].links[0]) {
                // Fallback to first image
                imageUrl = data.collection.items[0].links[0].href;
            }
        }

        // Cache the result (even if null)
        astronautCache.set(cacheKey, imageUrl);
        return imageUrl;
    } catch (error) {
        console.warn('Failed to fetch NASA image for', astronautName, error);
        // Cache the failed result to prevent retries
        astronautCache.set(cacheKey, null);
        return null;
    }
}

async function getNasaAstronautData(astronautName) {
    // Check cache first
    const cacheKey = `data_${astronautName}`;
    if (astronautCache.has(cacheKey)) {
        return astronautCache.get(cacheKey);
    }

    try {
        // Search NASA Image and Video Library for comprehensive astronaut data
        const searchQuery = encodeURIComponent(astronautName + ' astronaut');

        // Add timeout for NASA API calls
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response = await fetch(`${NASA_IMAGE_API_URL}?q=${searchQuery}&media_type=image&year_start=2010`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`NASA API request failed: ${response.status}`);
        }

        const data = await response.json();
        let astronautData = null;

        if (data.collection && data.collection.items && data.collection.items.length > 0) {
            // Get the most relevant item (usually the first one)
            const item = data.collection.items[0];
            const itemData = item.data[0];

            astronautData = {
                title: itemData.title || '',
                description: itemData.description || '',
                keywords: itemData.keywords || [],
                dateCreated: itemData.date_created || '',
                center: itemData.center || '',
                photographer: itemData.photographer || '',
                location: itemData.location || '',
                nasaId: itemData.nasa_id || '',
                mediaType: itemData.media_type || 'image',
                imageUrl: item.links[0].href || '',
                additionalImages: data.collection.items.slice(1, 4).map(img => ({
                    title: img.data[0].title,
                    url: img.links[0].href,
                    description: img.data[0].description
                }))
            };
        }

        // Cache the result (even if null)
        astronautCache.set(cacheKey, astronautData);
        return astronautData;
    } catch (error) {
        console.warn('Failed to fetch NASA astronaut data for', astronautName, error);
        // Cache the failed result to prevent retries
        astronautCache.set(cacheKey, null);
        return null;
    }
}

function getCountryFlag(astronaut) {
    const name = astronaut.name.toLowerCase();
    const craft = astronaut.craft.toLowerCase();
    
    // Common astronaut countries and their flag codes
    const countryFlags = {
        'usa': 'https://img.icons8.com/color/32/usa.png',
        'united states': 'https://img.icons8.com/color/32/usa.png',
        'russia': 'https://img.icons8.com/color/32/russian-federation.png',
        'russian': 'https://img.icons8.com/color/32/russian-federation.png',
        'china': 'https://img.icons8.com/color/32/china.png',
        'chinese': 'https://img.icons8.com/color/32/china.png',
        'japan': 'https://img.icons8.com/color/32/japan.png',
        'japanese': 'https://img.icons8.com/color/32/japan.png',
        'europe': 'https://img.icons8.com/color/32/european-union.png',
        'european': 'https://img.icons8.com/color/32/european-union.png',
        'italy': 'https://img.icons8.com/color/32/italy.png',
        'italian': 'https://img.icons8.com/color/32/italy.png',
        'germany': 'https://img.icons8.com/color/32/germany.png',
        'german': 'https://img.icons8.com/color/32/germany.png',
        'france': 'https://img.icons8.com/color/32/france.png',
        'french': 'https://img.icons8/color/32/france.png',
        'canada': 'https://img.icons8.com/color/32/canada.png',
        'canadian': 'https://img.icons8.com/color/32/canada.png',
        'uk': 'https://img.icons8.com/color/32/great-britain.png',
        'britain': 'https://img.icons8.com/color/32/great-britain.png',
        'british': 'https://img.icons8.com/color/32/great-britain.png'
    };
    
    // Check craft first (ISS, Tiangong, etc.)
    if (craft.includes('iss') || craft.includes('international space station')) {
        return countryFlags['usa']; // Default to USA for ISS
    }
    if (craft.includes('tiangong') || craft.includes('shenzhou')) {
        return countryFlags['china'];
    }
    
    // Check names for common patterns
    for (const [country, flag] of Object.entries(countryFlags)) {
        if (name.includes(country) || craft.includes(country)) {
            return flag;
        }
    }
    
    // Default flag (Earth/International)
    return 'https://img.icons8.com/color/32/earth-planet.png';
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
        // Try the main astronaut API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://api.open-notify.org/astros.json', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Process astronauts - load NASA data efficiently in background
        const astronautsWithDetails = await Promise.all(
            data.people.map(async (astronaut) => {
                const flag = getCountryFlag(astronaut);

                // Check if we already have cached data for this astronaut
                const cacheKey = `complete_${astronaut.name}`;
                if (astronautCache.has(cacheKey)) {
                    return astronautCache.get(cacheKey);
                }

                // Create astronaut object with default image
                const astronautObj = {
                    ...astronaut,
                    nasaImage: 'https://img.icons8.com/color/48/astronaut.png',
                    nasaData: 'loading', // Mark as loading
                    flag
                };

                // Load NASA data in background without blocking UI
                setTimeout(async () => {
                    try {
                        const nasaData = await getNasaAstronautData(astronaut.name);
                        if (nasaData && nasaData.imageUrl) {
                            astronautObj.nasaImage = nasaData.imageUrl;
                            // Keep astronaut icon on cards, real photo only for modal
                        }
                        astronautObj.nasaData = nasaData;
                        // Cache the complete astronaut object
                        astronautCache.set(cacheKey, astronautObj);
                    } catch (error) {
                        console.warn('Failed to load NASA data for', astronaut.name);
                        astronautObj.nasaData = null;
                        astronautCache.set(cacheKey, astronautObj);
                    }
                }, 100); // Small delay to render UI first

                return astronautObj;
            })
        );

        const astronautsHtml = astronautsWithDetails.map(astronaut => {
            return getTemplate('astronautitem')
                .replace(/{name}/g, astronaut.name)
                .replace(/{craft}/g, astronaut.craft)
                .replace('{flag}', astronaut.flag)
                .replace('{nasaImage}', astronaut.nasaImage)
                .replace(/onclick="([^"]*)"/, `data-astronaut="${astronaut.name}" onclick="$1"`);
        }).join('');

        result.innerHTML = getTemplate('astronauts').replace('{number}', data.number).replace('{astronauts}', astronautsHtml);

        // Store detailed astronaut data for modal use
        window.currentAstronauts = astronautsWithDetails;

        // Refresh particles after content change
        refreshParticles();

    } catch (error) {
        console.error('Error fetching space info:', error);

        // Fallback to demo data when API is unavailable
        console.log('Using fallback astronaut data due to API issues');
        const fallbackData = {
            message: "success",
            number: 7,
            people: [
                {name: "Oleg Kononenko", craft: "ISS"},
                {name: "Nikolai Chub", craft: "ISS"},
                {name: "Tracy C. Dyson", craft: "ISS"},
                {name: "Butch Wilmore", craft: "ISS"},
                {name: "Sunita Williams", craft: "ISS"},
                {name: "Li Guangsu", craft: "Tiangong"},
                {name: "Li Cong", craft: "Tiangong"}
            ]
        };

        // Process fallback astronauts the same way
        const astronautsWithDetails = await Promise.all(
            fallbackData.people.map(async (astronaut) => {
                const flag = getCountryFlag(astronaut);

                // Check if we already have cached data for this astronaut
                const cacheKey = `complete_${astronaut.name}`;
                if (astronautCache.has(cacheKey)) {
                    return astronautCache.get(cacheKey);
                }

                // Create astronaut object with default image
                const astronautObj = {
                    ...astronaut,
                    nasaImage: 'https://img.icons8.com/color/48/astronaut.png',
                    nasaData: 'loading', // Mark as loading
                    flag
                };

                // Load NASA data in background without blocking UI
                setTimeout(async () => {
                    try {
                        const nasaData = await getNasaAstronautData(astronaut.name);
                        if (nasaData && nasaData.imageUrl) {
                            astronautObj.nasaImage = nasaData.imageUrl;
                            // Keep astronaut icon on cards, real photo only for modal
                        }
                        astronautObj.nasaData = nasaData;
                        // Cache the complete astronaut object
                        astronautCache.set(cacheKey, astronautObj);
                    } catch (error) {
                        console.warn('Failed to load NASA data for', astronaut.name);
                        astronautObj.nasaData = null;
                        astronautCache.set(cacheKey, astronautObj);
                    }
                }, 100); // Small delay to render UI first

                return astronautObj;
            })
        );

        const astronautsHtml = astronautsWithDetails.map(astronaut => {
            return getTemplate('astronautitem')
                .replace(/{name}/g, astronaut.name)
                .replace(/{craft}/g, astronaut.craft)
                .replace('{flag}', astronaut.flag)
                .replace('{nasaImage}', astronaut.nasaImage)
                .replace(/onclick="([^"]*)"/, `data-astronaut="${astronaut.name}" onclick="$1"`);
        }).join('');

        const fallbackNotice = '<div style="color: #ffa500; font-size: 12px; margin-bottom: 10px;">⚠️ Live data unavailable - showing cached astronaut information</div>';
        result.innerHTML = fallbackNotice + getTemplate('astronauts').replace('{number}', fallbackData.number).replace('{astronauts}', astronautsHtml);

        // Store detailed astronaut data for modal use
        window.currentAstronauts = astronautsWithDetails;

        // Refresh particles after content change
        refreshParticles();
    }
}

function showPlanets() {
    const result = document.getElementById('spaceResult');
    const planetsHtml = planets.map(p => {
        const planetClass = p.name === 'Pluto' ? 'planet-item pluto' : 'planet-item';
        return getTemplate('planetitem').replace('class="planet-item"', `class="${planetClass}"`).replace(/{name}/g, p.name).replace('{gif}', p.gif).replace('{fact}', p.fact).replace('{size}', p.size).replace('{gravity}', p.gravity).replace('{dayLength}', p.dayLength).replace('{temperature}', p.temperature);
    }).join('');
    result.innerHTML = getTemplate('planets').replace('{planets}', planetsHtml);

    // Refresh particles after content change
    refreshParticles();
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

    // Refresh particles after content change
    refreshParticles();
}

// Load modal template once on page load
function getAstronautModalTemplate() {
    return `
        <div style="text-align: center; max-width: 500px;">
            <img src="{photo}" alt="{name}" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 15px; object-fit: cover; border: 3px solid #3498db;" onerror="this.src='https://img.icons8.com/color/120/astronaut.png'">
            <div style="font-size: 20px; font-weight: bold; color: #ffd700; margin-bottom: 10px;">{name}</div>
            <div style="font-size: 16px; color: #3498db; margin-bottom: 15px;">🚀 Currently on: {craft}</div>
            
            {nasaDataSection}
            
            <div style="font-size: 14px; color: #b0b0b0; line-height: 1.5; margin-top: 15px;">
                This brave explorer is currently living in space! 🌌<br>
                They see 16 sunrises and sunsets every day from the ISS! ☀️🌙
            </div>
        </div>
    `;
}

// Simple astronaut details message box
async function showAstronautDetails(name, craft, nasaImage) {
    // Find astronaut in stored data
    const astronaut = window.currentAstronauts?.find(a => a.name === name) || {
        name,
        craft,
        nasaImage: nasaImage || 'https://img.icons8.com/color/64/astronaut.png',
        nasaData: null
    };

    // Use cached NASA image if available, otherwise fallback
    const profileImage = astronaut.nasaImage || 'https://img.icons8.com/color/64/astronaut.png';

    // Use cached NASA data - no new API calls needed
    let nasaDataSection = '';
    if (astronaut.nasaData === 'loading') {
        // Still loading
        nasaDataSection = `
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin: 15px 0;">
                <div style="font-size: 14px; color: #b0b0b0;">📸 Loading NASA archive data...</div>
            </div>
        `;

        // Wait for data to load and update modal
        const checkForData = setInterval(() => {
            if (astronaut.nasaData !== 'loading') {
                clearInterval(checkForData);
                const modal = document.getElementById('astronautMessage');
                if (modal) {
                    updateAstronautModalContent(astronaut, profileImage);
                }
            }
        }, 500);
    } else if (astronaut.nasaData && astronaut.nasaData !== null) {
        const data = astronaut.nasaData;
        nasaDataSection = `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 15px 0; text-align: left;">
                <div style="font-size: 16px; color: #3498db; font-weight: bold; margin-bottom: 10px;">📸 NASA Archive Data</div>
                ${data.title ? `<div style="font-size: 14px; color: #ffd700; margin-bottom: 8px;"><strong>Title:</strong> ${data.title}</div>` : ''}
                ${data.description ? `<div style="font-size: 13px; color: #e0e0e0; margin-bottom: 8px; line-height: 1.4;"><strong>Description:</strong> ${data.description.substring(0, 200)}${data.description.length > 200 ? '...' : ''}</div>` : ''}
                ${data.center ? `<div style="font-size: 13px; color: #b0b0b0; margin-bottom: 5px;"><strong>NASA Center:</strong> ${data.center}</div>` : ''}
                ${data.location ? `<div style="font-size: 13px; color: #b0b0b0; margin-bottom: 5px;"><strong>Location:</strong> ${data.location}</div>` : ''}
                ${data.dateCreated ? `<div style="font-size: 13px; color: #b0b0b0; margin-bottom: 5px;"><strong>Date:</strong> ${new Date(data.dateCreated).toLocaleDateString()}</div>` : ''}
                ${data.nasaId ? `<div style="font-size: 12px; color: #888; margin-top: 8px;"><strong>NASA ID:</strong> ${data.nasaId}</div>` : ''}
            </div>
        `;
    } else {
        nasaDataSection = `
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin: 15px 0;">
                <div style="font-size: 14px; color: #b0b0b0;">📸 NASA archive data not available for this astronaut</div>
            </div>
        `;
    }

    // Load template and populate with data
    const template = getAstronautModalTemplate();
    const modalContent = template
        .replace(/{name}/g, astronaut.name)
        .replace(/{craft}/g, astronaut.craft)
        .replace(/{photo}/g, profileImage)
        .replace('{nasaDataSection}', nasaDataSection);

    // Create message box with larger size for more content
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
        padding: 25px;
        z-index: 1000;
        color: white;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.7);
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
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

// Helper function to update modal content when NASA data loads
function updateAstronautModalContent(astronaut, profileImage) {
    let nasaDataSection = '';
    if (astronaut.nasaData) {
        const data = astronaut.nasaData;
        nasaDataSection = `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 15px 0; text-align: left;">
                <div style="font-size: 16px; color: #3498db; font-weight: bold; margin-bottom: 10px;">📸 NASA Archive Data</div>
                ${data.title ? `<div style="font-size: 14px; color: #ffd700; margin-bottom: 8px;"><strong>Title:</strong> ${data.title}</div>` : ''}
                ${data.description ? `<div style="font-size: 13px; color: #e0e0e0; margin-bottom: 8px; line-height: 1.4;"><strong>Description:</strong> ${data.description.substring(0, 200)}${data.description.length > 200 ? '...' : ''}</div>` : ''}
                ${data.center ? `<div style="font-size: 13px; color: #b0b0b0; margin-bottom: 5px;"><strong>NASA Center:</strong> ${data.center}</div>` : ''}
                ${data.location ? `<div style="font-size: 13px; color: #b0b0b0; margin-bottom: 5px;"><strong>Location:</strong> ${data.location}</div>` : ''}
                ${data.dateCreated ? `<div style="font-size: 13px; color: #b0b0b0; margin-bottom: 5px;"><strong>Date:</strong> ${new Date(data.dateCreated).toLocaleDateString()}</div>` : ''}
                ${data.nasaId ? `<div style="font-size: 12px; color: #888; margin-top: 8px;"><strong>NASA ID:</strong> ${data.nasaId}</div>` : ''}
            </div>
        `;
    } else {
        nasaDataSection = `
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin: 15px 0;">
                <div style="font-size: 14px; color: #b0b0b0;">📸 NASA archive data not available for this astronaut</div>
            </div>
        `;
    }

    const template = getAstronautModalTemplate();
    const modalContent = template
        .replace(/{name}/g, astronaut.name)
        .replace(/{craft}/g, astronaut.craft)
        .replace(/{photo}/g, profileImage)
        .replace('{nasaDataSection}', nasaDataSection);

    const modal = document.getElementById('astronautMessage');
    if (modal) {
        modal.innerHTML = modalContent;
    }
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

        // Check cache first for today's APOD
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const cacheKey = `apod_${today}`;

        let data;
        if (astronautCache.has(cacheKey)) {
            console.log('Using cached APOD data for', today);
            data = astronautCache.get(cacheKey);
        } else {
            // Get NASA APOD data with timeout and fallback
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`NASA APOD API failed: ${response.status}`);
            }

            data = await response.json();

            // Cache the result for 24 hours
            astronautCache.set(cacheKey, data);
            console.log('Cached APOD data for', today);
        }

        // Determine media type and create appropriate template
        let mediaTemplate = '';
        if (data.media_type === 'image') {
            mediaTemplate = getTemplate('apodimage')
                .replace('{url}', data.url || '')
                .replace('{hdurl}', data.hdurl || data.url || '')
                .replace(/\{title\}/g, data.title || '');
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

        // Refresh particles after content change
        refreshParticles();

    } catch (error) {
        console.error('Error fetching APOD:', error);

        // Check if we have any cached APOD data from previous days
        const today = new Date().toISOString().split('T')[0];
        let fallbackData = null;

        // Look for recent cached APOD data (within last 7 days)
        for (let i = 1; i <= 7; i++) {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - i);
            const pastDateStr = pastDate.toISOString().split('T')[0];
            const pastCacheKey = `apod_${pastDateStr}`;

            if (astronautCache.has(pastCacheKey)) {
                fallbackData = astronautCache.get(pastCacheKey);
                console.log('Using fallback APOD data from', pastDateStr);
                break;
            }
        }

        if (fallbackData) {
            // Use cached data with a fallback notice
            let mediaTemplate = '';
            if (fallbackData.media_type === 'image') {
                mediaTemplate = getTemplate('apodimage')
                    .replace('{url}', fallbackData.url || '')
                    .replace('{hdurl}', fallbackData.hdurl || fallbackData.url || '')
                    .replace(/\{title\}/g, fallbackData.title || '');
            } else if (fallbackData.media_type === 'video') {
                mediaTemplate = getTemplate('apodvideo')
                    .replace('{url}', fallbackData.url || '');
            }

            const dateObj = new Date(fallbackData.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const copyrightText = fallbackData.copyright ?
                `© ${fallbackData.copyright}` :
                'Image Credit: NASA';

            const fallbackNotice = '<div style="color: #ffa500; font-size: 12px; margin-bottom: 10px;">⚠️ Live APOD unavailable - showing recent cached content</div>';

            const apodHtml = fallbackNotice + getTemplate('apod')
                .replace('{title}', fallbackData.title || 'NASA Astronomy Picture of the Day')
                .replace('{date}', formattedDate)
                .replace('{media}', mediaTemplate)
                .replace('{explanation}', fallbackData.explanation || 'No description available.')
                .replace('{copyright}', copyrightText);

            result.innerHTML = apodHtml;
        } else {
            // No cached data available, use demo APOD data
            console.log('Using demo APOD data as final fallback');
            const demoApodData = {
                title: "The Orion Nebula in Stars, Dust, and Gas",
                date: "2024-01-15",
                explanation: "Few cosmic vistas excite the imagination like the Orion Nebula, an immense stellar nursery some 1,500 light-years away. This stunning false-color view spans about 40 light-years across the region, constructed using infrared data from the Spitzer Space Telescope. Compared to its visual wavelength appearance, the infrared image shows warmer dust clouds that glow at infrared wavelengths, along with many stellar nurseries where new stars are born.",
                media_type: "image",
                url: "https://apod.nasa.gov/apod/image/1312/orion_hubble_960.jpg",
                hdurl: "https://apod.nasa.gov/apod/image/1312/orion_hubble_6000.jpg"
            };

            const mediaTemplate = getTemplate('apodimage')
                .replace('{url}', demoApodData.url)
                .replace('{hdurl}', demoApodData.hdurl)
                .replace(/\{title\}/g, demoApodData.title);

            const dateObj = new Date(demoApodData.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const fallbackNotice = '<div style="color: #ffa500; font-size: 12px; margin-bottom: 10px;">⚠️ NASA API unavailable - showing demo space content</div>';

            const apodHtml = fallbackNotice + getTemplate('apod')
                .replace('{title}', demoApodData.title)
                .replace('{date}', formattedDate)
                .replace('{media}', mediaTemplate)
                .replace('{explanation}', demoApodData.explanation)
                .replace('{copyright}', 'Image Credit: NASA/ESA Hubble Space Telescope');

            result.innerHTML = apodHtml;
        }

        // Refresh particles after content change
        refreshParticles();
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

// Initialize particles with proper canvas handling
function initParticles() {
    particlesJS.load('background', 'nasa-particles.json', function() {
        console.log('Particles loaded successfully!');

        // Ensure canvas maintains proper aspect ratio
        const canvas = document.querySelector('#background canvas');
        if (canvas) {
            // Force canvas to maintain proper dimensions and prevent stretching
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.objectFit = 'cover';
            canvas.style.pointerEvents = 'none';

            // Set actual canvas dimensions to match container
            const container = document.getElementById('background');
            if (container) {
                const resizeCanvas = () => {
                    canvas.width = container.offsetWidth;
                    canvas.height = container.offsetHeight;
                };
                resizeCanvas();

                // Handle window resize to prevent stretching
                const resizeHandler = function() {
                    setTimeout(() => {
                        try {
                            resizeCanvas();
                            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                                // Update particle system dimensions
                                if (window.pJSDom[0].pJS.canvas && window.pJSDom[0].pJS.canvas.size) {
                                    window.pJSDom[0].pJS.canvas.size.height = container.offsetHeight;
                                    window.pJSDom[0].pJS.canvas.size.width = container.offsetWidth;
                                }
                                if (window.pJSDom[0].pJS.fn && window.pJSDom[0].pJS.fn.particlesRefresh) {
                                    window.pJSDom[0].pJS.fn.particlesRefresh();
                                }
                            }
                        } catch (error) {
                            console.warn('Failed to handle resize for particles:', error);
                        }
                    }, 100);
                };

                window.addEventListener('resize', resizeHandler);

                // Also listen for content changes using MutationObserver
                const observer = new MutationObserver(function(mutations) {
                    let shouldRefresh = false;
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList' && mutation.target.id === 'spaceResult') {
                            shouldRefresh = true;
                        }
                    });
                    if (shouldRefresh) {
                        setTimeout(() => refreshParticles(), 200);
                    }
                });

                const spaceResult = document.getElementById('spaceResult');
                if (spaceResult) {
                    observer.observe(spaceResult, {
                        childList: true,
                        subtree: true
                    });
                }
            }
        }
    });
}

// Refresh particles to prevent stretching during content changes
function refreshParticles() {
    setTimeout(() => {
        try {
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const canvas = document.querySelector('#background canvas');
                const container = document.getElementById('background');

                if (canvas && container) {
                    // Force container to recalculate its layout
                    container.style.height = 'auto';
                    container.style.minHeight = '100vh';

                    // Wait for layout to settle
                    setTimeout(() => {
                        const newWidth = container.offsetWidth;
                        const newHeight = Math.max(container.offsetHeight, window.innerHeight);

                        // Update canvas actual dimensions
                        canvas.width = newWidth;
                        canvas.height = newHeight;

                        // Update canvas style dimensions with proper scaling
                        canvas.style.width = '100%';
                        canvas.style.height = '100%';
                        canvas.style.position = 'absolute';
                        canvas.style.top = '0';
                        canvas.style.left = '0';
                        canvas.style.transform = 'scale(1)'; // Prevent any scaling
                        canvas.style.transformOrigin = 'top left';

                        // Refresh the particles system with new dimensions
                        if (window.pJSDom[0].pJS.canvas && window.pJSDom[0].pJS.canvas.size) {
                            window.pJSDom[0].pJS.canvas.size.height = newHeight;
                            window.pJSDom[0].pJS.canvas.size.width = newWidth;
                        }

                        // Force particles to redistribute
                        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
                            window.pJSDom[0].pJS.particles.array.forEach(particle => {
                                if (particle.x > newWidth) particle.x = Math.random() * newWidth;
                                if (particle.y > newHeight) particle.y = Math.random() * newHeight;
                            });
                        }

                        if (window.pJSDom[0].pJS.fn && window.pJSDom[0].pJS.fn.particlesRefresh) {
                            window.pJSDom[0].pJS.fn.particlesRefresh();
                        }

                        console.log('Particles refreshed for new dimensions:', newWidth, 'x', newHeight);
                    }, 50);
                }
            }
        } catch (error) {
            console.warn('Failed to refresh particles:', error);
        }
    }, 200); // Longer delay to allow content to fully render
}

async function initApp() {
    // Initialize demo cache first
    initializeDemoCache();
    await loadTemplates();
    getSpaceInfo();
}