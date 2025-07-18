// Footer content
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Weather data (static values)
const temperature = 22; // °C
const windSpeed = 8; // km/h

// Wind chill calculation function
function calculateWindChill(temp, wind) {
    return Math.round((13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)) * 10) / 10;
}

// Calculate and display wind chill
function displayWindChill() {
    const windChillElement = document.getElementById('wind-chill');
    
    // Check conditions for viable wind chill calculation (metric)
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = windChill + '°C';
    } else {
        windChillElement.textContent = 'N/A';
    }
}

// Initialize wind chill calculation when page loads
window.addEventListener('load', displayWindChill);