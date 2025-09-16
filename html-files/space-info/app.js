const astronautsTemplate = `<div class="total">People in Space Right Now: {number} 👨‍🚀</div><div class="astronauts-compact">{astronauts}</div><p style="margin-top: 20px;">Want to know more about space? Visit NASA's website! 🌟</p>`;
const astronautItemTemplate = `<div class="astronaut-compact"><img src="https://img.icons8.com/color/48/astronaut.png" alt="Astronaut" class="astronaut-icon" style="transition: all 0.3s ease;" onmouseenter="this.style.animation='spin 1s linear infinite'" onmouseleave="this.style.animation='none'"><div class="astronaut-info"><div class="astronaut-name">{name}</div><div class="astronaut-craft">{craft}</div></div></div>`;
const eventsTemplate = `<div class="section-title">☄️ Space Events Calendar! ☄️</div><div style="color: #b0b0b0; font-size: 12px; margin-bottom: 15px;">Today: {currentDate} (Year: {currentYear}, Month: {currentMonth})</div><div class="events-container">{events}</div><p style="margin-top: 20px; color: #ffd700;">Mark your calendar for these amazing space events! 🌟</p>`;
const eventItemTemplate = `<div class="{eventClass}"><div class="event-type">{type}</div><div class="event-date">📅 {date}</div><div class="event-description">{description}</div></div>`;
const planetsTemplate = `<div class="section-title">🪐 Our Solar System (8 Planets + Pluto)! 🪐</div><div class="planets-container">{planets}</div><p style="margin-top: 20px; color: #ffd700; font-size: 14px;">Planet animations by <a href="https://graysea.tumblr.com/post/158035770070/the-solar-system-bonus-pluto" target="_blank" style="color: #3498db;">graysea</a> 🌟</p>`;
const planetItemTemplate = `<div class="planet-item"><div class="planet-name">{name}</div><img src="{gif}" alt="{name}" class="planet-gif" loading="lazy"><div class="planet-fact">{fact}</div><div class="planet-comparison"><div class="comparison-item"><span class="comparison-label">🌍 Size:</span> {size}</div><div class="comparison-item"><span class="comparison-label">⚖️ Gravity:</span> {gravity}</div><div class="comparison-item"><span class="comparison-label">🕐 Day:</span> {dayLength}</div><div class="comparison-item"><span class="comparison-label">🌡️ Temp:</span> {temperature}</div></div></div>`;

const planets = [{name:"Mercury",gif:"planets/Mercury.gif",fact:"Smallest planet, closest to the Sun! ☀️",gravity:"38% of Earth's gravity",size:"0.38x Earth's size",dayLength:"176 Earth days",temperature:"427°C (800°F) to -173°C (-280°F)"},{name:"Venus",gif:"planets/Venus.gif",fact:"Hottest planet in our solar system! 🔥",gravity:"91% of Earth's gravity",size:"0.95x Earth's size",dayLength:"243 Earth days",temperature:"462°C (864°F) - hotter than Mercury!"},{name:"Earth",gif:"planets/Earth.gif",fact:"Only planet with life (that we know of)! 🌍",gravity:"1.0x Earth's gravity (baseline)",size:"1.0x Earth's size (baseline)",dayLength:"24 hours",temperature:"15°C (59°F) average"},{name:"Mars",gif:"planets/Mars.gif",fact:"The Red Planet - future home of humans! 🚀",gravity:"38% of Earth's gravity",size:"0.53x Earth's size",dayLength:"24.6 hours",temperature:"-65°C (-85°F) average"},{name:"Jupiter",gif:"planets/Jupiter.gif",fact:"Largest planet - has a Great Red Spot storm! 🌀",gravity:"2.5x Earth's gravity",size:"11.2x Earth's size",dayLength:"9.9 hours",temperature:"-110°C (-166°F)"},{name:"Saturn",gif:"planets/Saturn.gif",fact:"Famous for its beautiful rings! 💍",gravity:"1.1x Earth's gravity",size:"9.4x Earth's size",dayLength:"10.7 hours",temperature:"-140°C (-220°F)"},{name:"Uranus",gif:"planets/Uranus.gif",fact:"Rotates on its side - the sideways planet! 🔄",gravity:"0.9x Earth's gravity",size:"4.0x Earth's size",dayLength:"17.2 hours",temperature:"-195°C (-320°F)"},{name:"Neptune",gif:"planets/Neptune.gif",fact:"Windiest planet - winds up to 2,100 km/h! 💨",gravity:"1.1x Earth's gravity",size:"3.9x Earth's size",dayLength:"16.1 hours",temperature:"-200°C (-328°F)"},{name:"Pluto",gif:"planets/Pluto.gif",fact:"Dwarf planet (no longer a planet since 2006)! ❤️",gravity:"6% of Earth's gravity",size:"0.18x Earth's size",dayLength:"153.3 hours (6.4 Earth days)",temperature:"-225°C (-375°F)"}];

function formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

async function getSpaceInfo() {
    const result = document.getElementById('spaceResult');
    result.innerHTML = '<div class="loading loading-spinner"></div>';
    const response = await fetch('http://api.open-notify.org/astros.json');
    const data = await response.json();
    const astronautsHtml = data.people.map(p => astronautItemTemplate.replace('{name}', p.name).replace('{craft}', p.craft)).join('');
    result.innerHTML = astronautsTemplate.replace('{number}', data.number).replace('{astronauts}', astronautsHtml);
}

function showPlanets() {
    const result = document.getElementById('spaceResult');
    const planetsHtml = planets.map(p => {
        const planetClass = p.name === 'Pluto' ? 'planet-item pluto' : 'planet-item';
        return planetItemTemplate.replace('class="planet-item"', `class="${planetClass}"`).replace(/{name}/g, p.name).replace('{gif}', p.gif).replace('{fact}', p.fact).replace('{size}', p.size).replace('{gravity}', p.gravity).replace('{dayLength}', p.dayLength).replace('{temperature}', p.temperature);
    }).join('');
    result.innerHTML = planetsTemplate.replace('{planets}', planetsHtml);
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
        if (eventDate >= today) events.push({type:`🛰️ ${e.title}`,date:formatDate(eventDate),description:e.desc});
    });

    // Meteor showers
    [{name:"Lyrids",month:4,day:22,rate:20},{name:"Eta Aquarids",month:5,day:6,rate:60},{name:"Perseids",month:8,day:12,rate:100},{name:"Orionids",month:10,day:21,rate:20},{name:"Leonids",month:11,day:17,rate:15},{name:"Geminids",month:12,day:13,rate:120},{name:"Quadrantids",month:1,day:3,rate:120}].forEach(s => {
        for (let year = currentYear; year <= currentYear + 1; year++) {
            const eventDate = new Date(year, s.month - 1, s.day);
            if (eventDate >= today) events.push({type:`☄️ ${s.name} Meteor Shower`,date:formatDate(eventDate),description:`Peak: ${formatDate(eventDate)} - up to ${s.rate} meteors per hour!`});
        }
    });

    // Eclipses
    [{type:"🌙 Lunar Eclipse",month:3,day:14,year:currentYear+1,desc:"Total Lunar Eclipse - visible from Americas, Europe, Africa, Asia"},{type:"☀️ Solar Eclipse",month:8,day:12,year:currentYear+2,desc:"Total Solar Eclipse - visible from Greenland, Iceland, Spain"},{type:"🌙 Lunar Eclipse",month:9,day:7,year:currentYear+1,desc:"Partial Lunar Eclipse - visible from Americas, Europe, Africa"},{type:"☀️ Solar Eclipse",month:4,day:8,year:currentYear+1,desc:"Total Solar Eclipse - visible from North America"}].forEach(e => {
        const eventDate = new Date(e.year, e.month - 1, e.day);
        if (eventDate >= today) events.push({type:e.type,date:formatDate(eventDate),description:e.desc});
    });

    // Northern Lights
    [12,1,2,3,4,5].forEach(month => {
        const year = month <= 3 ? currentYear + 1 : currentYear;
        const eventDate = new Date(year, month - 1, 15);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (eventDate >= today) events.push({type:"🌌 Northern Lights (Aurora Borealis)",date:`${months[month - 1]} ${year} (Best Season)`,description:"Best viewing: Northern Canada, Alaska, Scandinavia, Iceland - look for dark skies!"});
    });

    events.sort((a,b) => new Date(a.date.split(' ')[0]) - new Date(b.date.split(' ')[0]));
    const eventsHtml = events.length > 0 ? events.map(e => {
        const isBestSeason = e.description.includes('Best viewing') || e.date.includes('Best Season');
        const eventClass = isBestSeason ? 'event-item best-season' : 'event-item';
        return eventItemTemplate.replace('{eventClass}', eventClass).replace('{type}', e.type).replace('{date}', e.date).replace('{description}', e.description);
    }).join('') : '<div class="event-item"><div class="event-description">No upcoming events found. Check back later for new space events! 🌟</div></div>';
    result.innerHTML = eventsTemplate.replace('{currentDate}', currentDate).replace('{currentYear}', currentYear).replace('{currentMonth}', currentMonth).replace('{events}', eventsHtml);
}

window.onload = function() { getSpaceInfo(); };