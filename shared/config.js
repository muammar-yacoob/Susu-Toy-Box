// Shared configuration for all apps
const AppConfig = {
    // Base URL for the website - matches package.json homepage
    baseUrl: 'https://sundus.fun',
    
    // Default social media card settings
    defaultCard: {
        siteName: "Susu's Playground",
        author: "Susu Apps",
        twitterSite: "@SusuApps", // Update with actual Twitter handle
        defaultImage: "/fav.png", // Default fallback image
        favicon: "/favicon.ico", // Site favicon for card branding
        type: "website"
    },
    
    // App-specific card configurations
    appCards: {
        'dog-pics': {
            title: "Dog Picture Generator - Random Dog Breeds & Photos",
            description: "Generate random dog pictures and discover different dog breeds. Fun interactive dog photo generator with breed information and beautiful dog images.",
            image: "/html-files/dog-pics/android-chrome-512x512.png",
            keywords: "dog pictures, random dogs, dog breeds, dog photos, pet images, dog generator, cute dogs"
        },
        'cat-pics': {
            title: "Cat Picture Generator - Random Cat Photos",
            description: "Get adorable random cat pictures instantly! Fun interactive cat photo generator with beautiful feline images.",
            image: "/html-files/cat-pics/android-chrome-512x512.png",
            keywords: "cat pictures, random cats, cat photos, pet images, cat generator, cute cats"
        },
        'weather': {
            title: "Weather Wizard - Real-time Weather Information",
            description: "Get current weather information for any city worldwide. Beautiful weather app with detailed forecasts and weather icons.",
            image: "/html-files/weather/android-chrome-512x512.png",
            keywords: "weather, forecast, temperature, weather app, climate"
        },
        'space-info': {
            title: "Space Explorer - Real-time Space Information",
            description: "Discover who's currently in space, upcoming space events, planets, and NASA's astronomy picture of the day. Interactive space exploration app.",
            image: "/html-files/space-info/android-chrome-512x512.png",
            keywords: "space, astronauts, NASA, planets, space station, astronomy"
        },
        'memes': {
            title: "Meme Generator - Create Custom Memes",
            description: "Create hilarious custom memes with our interactive meme generator. Add text, customize, and share your creations!",
            image: "/html-files/memes/android-chrome-512x512.png",
            keywords: "memes, meme generator, funny, humor, image editor"
        },
        'funny-names': {
            title: "Funny Name Generator - Creative Username Ideas",
            description: "Generate hilarious and creative names for games, social media, pets, and more. Fun interactive name generator with multiple categories.",
            image: "/html-files/funny-names/android-chrome-512x512.png",
            keywords: "funny names, username generator, creative names, gaming names"
        },
        'random-fact': {
            title: "Random Fact Generator - Interesting Facts",
            description: "Discover fascinating random facts and expand your knowledge! Educational and entertaining fact generator.",
            image: "/html-files/random-fact/android-chrome-512x512.png",
            keywords: "random facts, trivia, knowledge, education, interesting facts"
        },
        'pokemon': {
            title: "Pokemon Info Generator - Random Pokemon Data",
            description: "Explore random Pokemon with detailed information, stats, and images. Interactive Pokemon database and generator.",
            image: "/html-files/pokemon/android-chrome-512x512.png",
            keywords: "pokemon, pokemon generator, pokemon info, gaming, anime"
        },
        'ai-fun': {
            title: "AI Fun Generator - Creative AI Content",
            description: "Generate creative content with AI! Fun interactive AI-powered tools for entertainment and creativity.",
            image: "/html-files/ai-fun/android-chrome-512x512.png",
            keywords: "AI, artificial intelligence, creative content, AI generator"
        },
        '3d-viewer': {
            title: "3D Model Viewer - Interactive 3D Experience",
            description: "View and interact with 3D models in your browser. Immersive 3D viewer with interactive controls.",
            image: "/html-files/3d-viewer/android-chrome-512x512.png",
            keywords: "3D models, 3D viewer, interactive 3D, WebGL, 3D graphics"
        }
    },
    
    // Get the current page URL for sharing
    getCurrentPageUrl: function() {
        const currentPath = window.location.pathname;
        
        if (currentPath === '/' || currentPath.endsWith('index.html') && !currentPath.includes('html-files')) {
            return this.baseUrl;
        }
        
        return this.baseUrl + currentPath;
    },
    
    // Get app-specific URL for sharing
    getAppUrl: function(appPath) {
        return this.baseUrl + (appPath.startsWith('/') ? appPath : '/' + appPath);
    },
    
    // Get app key from current path
    getCurrentAppKey: function() {
        const path = window.location.pathname;
        const match = path.match(/html-files\/([^\/]+)/);
        return match ? match[1] : 'home';
    },
    
    // Get social media card data for current app
    getSocialCardData: function(appKey = null) {
        const currentApp = appKey || this.getCurrentAppKey();
        const appData = this.appCards[currentApp] || {};
        
        return {
            title: appData.title || `${this.defaultCard.siteName} - Fun Interactive Web Apps`,
            description: appData.description || "A collection of fun, interactive web applications built for education and entertainment.",
            image: this.baseUrl + (appData.image || this.defaultCard.defaultImage),
            favicon: this.baseUrl + this.defaultCard.favicon,
            url: this.getCurrentPageUrl(),
            siteName: this.defaultCard.siteName,
            author: this.defaultCard.author,
            twitterSite: this.defaultCard.twitterSite,
            keywords: appData.keywords || "web apps, interactive, fun, educational",
            type: this.defaultCard.type
        };
    },
    
    // Generate and inject social media meta tags
    generateSocialMetaTags: function(appKey = null) {
        const cardData = this.getSocialCardData(appKey);
        
        // Remove existing social meta tags
        this.removeSocialMetaTags();
        
        // Create new meta tags
        const metaTags = [
            // Open Graph
            { property: 'og:type', content: cardData.type },
            { property: 'og:url', content: cardData.url },
            { property: 'og:title', content: cardData.title },
            { property: 'og:description', content: cardData.description },
            { property: 'og:image', content: cardData.image },
            { property: 'og:site_name', content: cardData.siteName },
            
            // Twitter Cards
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:url', content: cardData.url },
            { name: 'twitter:title', content: cardData.title },
            { name: 'twitter:description', content: cardData.description },
            { name: 'twitter:image', content: cardData.image },
            { name: 'twitter:site', content: cardData.twitterSite },
            { name: 'twitter:creator', content: cardData.twitterSite },
            
            // Favicon and branding
            { rel: 'icon', type: 'image/x-icon', href: cardData.favicon },
            { rel: 'shortcut icon', href: cardData.favicon },
            { rel: 'apple-touch-icon', href: cardData.favicon },
            
            // SEO
            { name: 'description', content: cardData.description },
            { name: 'keywords', content: cardData.keywords },
            { name: 'author', content: cardData.author }
        ];
        
        // Inject meta tags and link elements into head
        const head = document.head;
        metaTags.forEach(tag => {
            if (tag.rel) {
                // Create link element for favicon and icons
                const link = document.createElement('link');
                link.setAttribute('rel', tag.rel);
                if (tag.type) link.setAttribute('type', tag.type);
                if (tag.href) link.setAttribute('href', tag.href);
                link.classList.add('dynamic-social-meta');
                head.appendChild(link);
            } else {
                // Create meta element for other tags
                const meta = document.createElement('meta');
                if (tag.property) meta.setAttribute('property', tag.property);
                if (tag.name) meta.setAttribute('name', tag.name);
                if (tag.content) meta.setAttribute('content', tag.content);
                meta.classList.add('dynamic-social-meta');
                head.appendChild(meta);
            }
        });
        
        // Update structured data
        this.updateStructuredData(cardData);
    },
    
    // Remove existing social meta tags
    removeSocialMetaTags: function() {
        const existingTags = document.querySelectorAll('.dynamic-social-meta, meta[property^="og:"], meta[name^="twitter:"], link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
        existingTags.forEach(tag => tag.remove());
    },
    
    // Update JSON-LD structured data
    updateStructuredData: function(cardData) {
        // Remove existing structured data
        const existing = document.querySelector('script[type="application/ld+json"]');
        if (existing) existing.remove();
        
        // Create new structured data
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": cardData.title,
            "description": cardData.description,
            "url": cardData.url,
            "image": cardData.image,
            "logo": cardData.favicon,
            "author": {
                "@type": "Person",
                "name": cardData.author
            },
            "publisher": {
                "@type": "Organization",
                "name": cardData.siteName,
                "url": this.baseUrl,
                "logo": cardData.favicon
            },
            "applicationCategory": "Entertainment",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);
    }
};

// Make it globally available
window.AppConfig = AppConfig;
