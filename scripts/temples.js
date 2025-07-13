// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year and last modified date
    setFooterInfo();
    
    // Initialize hamburger menu functionality
    initializeHamburgerMenu();
});

// Function to set footer information
function setFooterInfo() {
    // Set current year
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
    
    // Set last modified date
    const lastModified = new Date(document.lastModified);
    const lastModifiedElement = document.getElementById('lastmodified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Function to initialize hamburger menu
function initializeHamburgerMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navigation = document.getElementById('navigation');
    const hamburger = document.getElementById('hamburger');
    
    if (menuToggle && navigation && hamburger) {
        menuToggle.addEventListener('click', function() {
            // Toggle navigation visibility
            navigation.classList.toggle('open');
            
            // Toggle hamburger icon
            if (navigation.classList.contains('open')) {
                hamburger.textContent = '✖';
                menuToggle.setAttribute('aria-label', 'Close navigation menu');
            } else {
                hamburger.textContent = '☰';
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        });
        
        // Close menu when clicking on navigation links (for mobile)
        const navLinks = navigation.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    navigation.classList.remove('open');
                    hamburger.textContent = '☰';
                    menuToggle.setAttribute('aria-label', 'Open navigation menu');
                }
            });
        });
        
        // Close menu when resizing to larger screen
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                navigation.classList.remove('open');
                hamburger.textContent = '☰';
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        });
    }
}

// Optional: Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Add lazy loading support for older browsers
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    console.log('Native lazy loading supported');
} else {
    // Fallback for browsers that don't support lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.removeAttribute('loading');
    });
}