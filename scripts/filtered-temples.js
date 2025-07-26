
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Monterrey Mexico",
        location: "Monterrey, Nuevo León, Mexico",
        dedicated: "2002, April, 28",
        area: 10700,
        imageUrl: "images/mty-temple.jpg"
    },
    {
        templeName: "Hermosillo Mexico",
        location: "Hermosillo, Sonora, Mexico",
        dedicated: "2000, February, 27",
        area: 10890,
        imageUrl: "images/hermosillo-temple.jpg"
    },
    {
        templeName: "Oaxaca Mexico",
        location: "Oaxaca, Oaxaca, Mexico",
        dedicated: "2000, March, 11",
        area: 10700,
        imageUrl: "images/oaxaca-temple.jpg"
    },
    {
        templeName: "Tuxtla Gutierrez Mexico",
        location: "Tuxtla Gutiérrez, Chiapas, Mexico",
        dedicated: "2000, March, 12",
        area: 10890,
        imageUrl: "images/tuxtla-temple.jpg"
    },
    {
        templeName: "Ciudad Juarez Mexico",
        location: "Ciudad Juárez, Chihuahua, Mexico",
        dedicated: "2000, February, 26",
        area: 10890,
        imageUrl: "images/cd-juarez-temple.jpg"
    },
    {
        templeName: "Tijuana Mexico",
        location: "Tijuana, Baja California, Mexico",
        dedicated: "2015, December, 13",
        area: 33367,
        imageUrl: "images/tijuana-temple.jpg"
    },
    {
        templeName: "Puebla Mexico",
        location: "Puebla, Puebla, Mexico",
        dedicated: "2024, October, 21",
        area: 10890,
        imageUrl: "images/puebla-temple.jpg"
    },
    {
        templeName: "Guadalajara Mexico",
        location: "Guadalajara, Jalisco, Mexico",
        dedicated: "2001, April, 29",
        area: 10000,
        imageUrl: "images/guadalajara-temple.jpg"
    }
];

// Function to create temple cards
function createTempleCard(temple) {
    return `
        <div class="temple-card">
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
            <div class="temple-info">
                <h3>${temple.templeName}</h3>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </div>
        </div>
    `;
}

// Function to display temples
function displayTemples(templeArray) {
    const container = document.getElementById('temple-container');
    container.innerHTML = templeArray.map(temple => createTempleCard(temple)).join('');
}

// Function to update active navigation
function updateActiveNav(activeId) {
    // Remove active class from all nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    // Add active class to clicked link
    document.getElementById(activeId).classList.add('active');
}

// Function to update filter title
function updateFilterTitle(title) {
    document.getElementById('filter-title').textContent = title;
}

// Filter functions
function filterOldTemples() {
    const oldTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
    });
    displayTemples(oldTemples);
    updateFilterTitle('Old Temples (Before 1900)');
    updateActiveNav('old');
}

function filterNewTemples() {
    const newTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
    });
    displayTemples(newTemples);
    updateFilterTitle('New Temples (After 2000)');
    updateActiveNav('new');
}

function filterLargeTemples() {
    const largeTemples = temples.filter(temple => temple.area > 90000);
    displayTemples(largeTemples);
    updateFilterTitle('Large Temples (> 90,000 sq ft)');
    updateActiveNav('large');
}

function filterSmallTemples() {
    const smallTemples = temples.filter(temple => temple.area < 10000);
    displayTemples(smallTemples);
    updateFilterTitle('Small Temples (< 10,000 sq ft)');
    updateActiveNav('small');
}

function showAllTemples() {
    displayTemples(temples);
    updateFilterTitle('All Temples');
    updateActiveNav('home');
}

// Event listeners for navigation
document.addEventListener('DOMContentLoaded', function () {
    // Display all temples initially
    showAllTemples();

    // Add event listeners to navigation links
    document.getElementById('home').addEventListener('click', function (e) {
        e.preventDefault();
        showAllTemples();
    });

    document.getElementById('old').addEventListener('click', function (e) {
        e.preventDefault();
        filterOldTemples();
    });

    document.getElementById('new').addEventListener('click', function (e) {
        e.preventDefault();
        filterNewTemples();
    });

    document.getElementById('large').addEventListener('click', function (e) {
        e.preventDefault();
        filterLargeTemples();
    });

    document.getElementById('small').addEventListener('click', function (e) {
        e.preventDefault();
        filterSmallTemples();
    });

    // Footer functionality
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastmodified').textContent = lastModified;
});