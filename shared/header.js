function loadHeader(pageTitle = "Fun Code App") {
    // Check if we're on the home page by looking at the current path
    const currentPath = window.location.pathname;
    const isHomePage = currentPath.endsWith('index.html') && !currentPath.includes('html-files');

    // Only show home button if not on home page
    const homeButton = isHomePage ? '' : `
        <button onclick="window.location.href='../../index.html'" class="btn btn-primary btn-sm hover:scale-105 transition-all duration-200">
            🏠 Home
        </button>
    `;

    const headerHTML = `
        <header class="navbar bg-base-300 shadow-lg border-b border-base-content/10 sticky top-0 z-50">
            <div class="navbar-start">
                <button onclick="window.location.href='../../index.html'" class="btn btn-ghost text-xl font-bold hover:bg-base-200 transition-all duration-200">
                    🎉 Susu's Playground
                </button>
            </div>
            <div class="navbar-center hidden lg:flex">
                <h1 class="text-lg font-semibold">${pageTitle}</h1>
            </div>
            <div class="navbar-end">
                ${homeButton}
            </div>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}