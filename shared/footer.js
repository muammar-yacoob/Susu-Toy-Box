function loadFooter() {
    const footerHTML = `
        <footer class="footer footer-center p-6 bg-base-300 text-base-content border-t border-base-content/10 mt-auto">
            <div class="flex flex-col items-center space-y-2">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl">🎮</span>
                    <p class="text-lg font-semibold">Susu's Fun Code Playground</p>
                    <span class="text-2xl">🎮</span>
                </div>
                <p class="text-sm opacity-70">© ${new Date().getFullYear()} Susu's Toy Box. All rights reserved.</p>
                <p class="text-xs opacity-60">Made with 💖 by Susu! Educational fun for everyone! 🌟</p>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}