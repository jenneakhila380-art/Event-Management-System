/* MOBILE NAVIGATION*/
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});

// Close menu after clicking a navigation link
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


/*  EVENT SEARCH*/

const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

const eventCards = document.querySelectorAll(".event-card");
const eventSection = document.getElementById("events");

// Create a message for when no events match
const noResults = document.createElement("p");

noResults.textContent = "No events found. Try another search.";
noResults.classList.add("no-results");

noResults.style.display = "none";
noResults.style.color = "#c084fc";
noResults.style.textAlign = "center";
noResults.style.marginTop = "30px";

eventSection.querySelector(".event-grid").after(noResults);


function searchEvents() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const searchLocation = locationInput.value
        .trim()
        .toLowerCase();

    let foundEvents = 0;

    eventCards.forEach(function (card) {

        const eventName = card.querySelector("h3")
            .textContent.toLowerCase();

        const eventLocation = card.querySelector(".event-location")
            .textContent.toLowerCase();

        const matchesName =
            eventName.includes(searchText);

        const matchesLocation =
            eventLocation.includes(searchLocation);

        if (matchesName && matchesLocation) {

            card.style.display = "block";
            foundEvents++;

        } else {

            card.style.display = "none";

        }

    });

    if (foundEvents === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }

    eventSection.scrollIntoView({
        behavior: "smooth"
    });

}


// Search button click
searchBtn.addEventListener("click", searchEvents);


// Search when pressing Enter
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchEvents();
    }
});

locationInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchEvents();
    }
});


/* Category click*/

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(function (category) {

    category.addEventListener("click", function () {

        const categoryName = category.querySelector("h3")
            .textContent.toLowerCase();

        searchInput.value = categoryName;

        locationInput.value = "";

        searchEvents();

    });

});




console.log("Eventify homepage loaded successfully!");