// PWA Installation Prompt
let deferredPrompt;
let installButton;

// Initialize install prompt
function initInstallPrompt() {
    // Create install button
    installButton = document.createElement('button');
    installButton.innerHTML = '📱 Install App';
    installButton.className = 'btn btn-primary btn-sm fixed bottom-4 right-4 z-50 shadow-lg';
    installButton.style.display = 'none';
    installButton.onclick = installApp;
    
    // Add to page
    document.body.appendChild(installButton);
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA install prompt triggered');
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show install button
        installButton.style.display = 'block';
    });
    
    // Listen for appinstalled event
    window.addEventListener('appinstalled', (e) => {
        console.log('PWA was installed');
        installButton.style.display = 'none';
        deferredPrompt = null;
    });
}

// Install the app
function installApp() {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }
}

// Check if app is already installed
function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

// Auto-hide install button if app is already installed
if (isAppInstalled()) {
    console.log('App is already installed');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInstallPrompt);
} else {
    initInstallPrompt();
}
