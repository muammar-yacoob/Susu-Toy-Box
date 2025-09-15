// Random Fact app JavaScript with embedded API utilities

// API Helper Class
class APIHelper {
    static async fetchWithErrorHandling(url, options = {}) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static showError(element, message = 'Could not get data. Check your internet connection! ❌') {
        element.innerHTML = `<div class="loading">${message}</div>`;
    }

    static showLoading(element, message = 'Loading...') {
        element.innerHTML = `<div class="loading">${message}</div>`;
    }
}

// Facts API functions
class FactsAPI {
    static async getRandomFact() {
        return await APIHelper.fetchWithErrorHandling('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    }
}

// Random Fact app functionality
async function getFact() {
    const resultDiv = document.getElementById('factResult');
    
    APIHelper.showLoading(resultDiv, 'Getting a random fact...');
    
    try {
        const data = await FactsAPI.getRandomFact();
        
        resultDiv.innerHTML = `
            <div class="title">Did you know? 🤔</div>
            <div class="fact">${data.text}</div>
        `;
    } catch (error) {
        APIHelper.showError(resultDiv);
    }
}

// Get a fact when page loads
window.onload = function() {
    getFact();
};

