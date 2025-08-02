// Product array as specified in the assignment
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Reactor" },
    { id: "jj-1969", name: "Warp Equalizer" }
];

// Populate product select options
function populateProducts() {
    const select = document.getElementById('productName');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

// Add visual feedback for radio buttons
function setupRatingInteraction() {
    const ratingItems = document.querySelectorAll('.rating-item');
    ratingItems.forEach(item => {
        const radio = item.querySelector('input[type="radio"]');
        const stars = item.querySelector('.stars');

        radio.addEventListener('change', function () {
            // Remove checked class from all items
            ratingItems.forEach(i => i.classList.remove('checked'));
            // Add checked class to selected item
            if (this.checked) {
                item.classList.add('checked');
                stars.style.color = '#f39c12';
            }
        });
    });
}

// Add visual feedback for checkboxes
function setupCheckboxInteraction() {
    const checkboxItems = document.querySelectorAll('.checkbox-item');
    checkboxItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                item.classList.add('checked');
            } else {
                item.classList.remove('checked');
            }
        });
    });
}

// Handle form submission and localStorage counter
function setupFormSubmission() {
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', function (e) {
        // Get current count from localStorage or start at 0
        let reviewCount = parseInt(localStorage.getItem('reviewCount') || '0');
        // Increment count
        reviewCount++;
        // Store updated count
        localStorage.setItem('reviewCount', reviewCount.toString());
    });
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function () {
    populateProducts();
    setupRatingInteraction();
    setupCheckboxInteraction();
    setupFormSubmission();
});