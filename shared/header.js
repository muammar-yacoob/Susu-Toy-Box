function loadHeader(pageTitle = "Fun Code App") {
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
                <button onclick="window.location.href='../../index.html'" class="btn btn-primary btn-sm hover:scale-105 transition-all duration-200">
                    🏠 Home
                </button>
            </div>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}