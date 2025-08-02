// Get URL parameters and display review details
function displayReviewDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewDetails = document.getElementById('reviewDetails');

    // Product Name
    const productName = urlParams.get('productName');
    if (productName) {
        // Find the product name by ID
        const products = [
            { id: "fc-1888", name: "Flux Capacitor" },
            { id: "fc-2050", name: "Power Laces" },
            { id: "fs-1987", name: "Time Circuits" },
            { id: "ac-2000", name: "Low Voltage Reactor" },
            { id: "jj-1969", name: "Warp Equalizer" }
        ];
        const product = products.find(p => p.id === productName);
        const displayName = product ? product.name : productName;
        addSummaryItem('Product', displayName);
    }

    // Rating
    const rating = urlParams.get('rating');
    if (rating) {
        const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
        addSummaryItem('Rating', `${stars} (${rating}/5)`);
    }

    // Installation Date
    const installDate = urlParams.get('installDate');
    if (installDate) {
        const date = new Date(installDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        addSummaryItem('Installation Date', formattedDate);
    }

    // Features
    const features = urlParams.getAll('features');
    if (features.length > 0) {
        addSummaryItem('Useful Features', features.join(', '));
    }

    // Written Review
    const writtenReview = urlParams.get('writtenReview');
    if (writtenReview && writtenReview.trim()) {
        addSummaryItem('Written Review', `"${writtenReview}"`);
    }

    // User Name
    const userName = urlParams.get('userName');
    if (userName && userName.trim()) {
        addSummaryItem('Reviewer', userName);
    }
}

function addSummaryItem(label, value) {
    const reviewDetails = document.getElementById('reviewDetails');
    const item = document.createElement('div');
    item.className = 'summary-item';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'summary-label';
    labelSpan.textContent = label + ':';

    const valueSpan = document.createElement('span');
    valueSpan.className = 'summary-value';
    valueSpan.textContent = value;

    item.appendChild(labelSpan);
    item.appendChild(valueSpan);
    reviewDetails.appendChild(item);
}

// Update and display review counter
function updateReviewCounter() {
    // Get current count from localStorage
    let reviewCount = parseInt(localStorage.getItem('reviewCount') || '0');

    // Display the count
    document.getElementById('reviewCounter').textContent = reviewCount;
}

// Initialize page when loaded
document.addEventListener('DOMContentLoaded', function () {
    displayReviewDetails();
    updateReviewCounter();
});