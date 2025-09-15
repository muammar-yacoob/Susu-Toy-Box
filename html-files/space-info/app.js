// Space Info app JavaScript with embedded API utilities

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

// Space API functions
class SpaceAPI {
    static async getAstronauts() {
        return await APIHelper.fetchWithErrorHandling('http://api.open-notify.org/astros.json');
    }
}

// Space Info app functionality
async function getSpaceInfo() {
    const resultDiv = document.getElementById('spaceResult');
    
    APIHelper.showLoading(resultDiv, 'Getting space information...');
    
    try {
        const data = await SpaceAPI.getAstronauts();
        
        let html = `<div class="total">People in Space Right Now: ${data.number} 👨‍🚀</div>`;
        html += '<div style="margin-top: 20px;">';
        
        data.people.forEach(person => {
            html += `
                <div class="astronaut">
                    <strong>${person.name}</strong> 🚀
                    <br>On: ${person.craft} 🛸
                </div>
            `;
        });
        
        html += '</div>';
        html += '<p style="margin-top: 20px;">Want to know more about space? Visit NASA\'s website! 🌟</p>';
        
        resultDiv.innerHTML = html;
    } catch (error) {
        APIHelper.showError(resultDiv);
    }
}

// Get space info when page loads
window.onload = function() {
    getSpaceInfo();
};

