// Shared Analytics Configuration
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID

const ANALYTICS_CONFIG = {
    measurementId: 'G-5V13GSQ8CX', // Replace with your GA4 Measurement ID
    enabled: true
};

// Initialize Google Analytics if enabled
if (ANALYTICS_CONFIG.enabled && ANALYTICS_CONFIG.measurementId !== 'G-XXXXXXXXXX') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', ANALYTICS_CONFIG.measurementId);
    
    // Make gtag globally available
    window.gtag = gtag;
}

// Helper function to track custom events
function trackEvent(eventName, parameters = {}) {
    if (window.gtag) {
        gtag('event', eventName, parameters);
    }
}

// Helper function to track page views
function trackPageView(pageTitle = document.title, pagePath = window.location.pathname) {
    if (window.gtag) {
        gtag('config', ANALYTICS_CONFIG.measurementId, {
            page_title: pageTitle,
            page_location: window.location.href,
            page_path: pagePath
        });
    }
}

// Track specific app interactions
function trackAppUsage(appName, action) {
    trackEvent('app_interaction', {
        app_name: appName,
        action: action,
        timestamp: new Date().toISOString()
    });
}

// Track button clicks
function trackButtonClick(buttonName, appName = 'unknown') {
    trackEvent('button_click', {
        button_name: buttonName,
        app_name: appName,
        page: window.location.pathname
    });
}

// Make functions globally available
window.trackEvent = trackEvent;
window.trackPageView = trackPageView;
window.trackAppUsage = trackAppUsage;
window.trackButtonClick = trackButtonClick;
