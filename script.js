/* MOBILE NAVIGATION */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
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
}


/* HOMEPAGE SEARCH → EXPLORE EVENTS */

const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

function goToExploreEvents() {

    const searchText = searchInput.value.trim();
    const locationText = locationInput.value.trim();

    const params = new URLSearchParams();

    if (searchText) {
        params.set("search", searchText);
    }

    if (locationText) {
        params.set("location", locationText);
    }

    window.location.href =
        "pages/events.html?" + params.toString();
}


// Search button click
if (searchBtn && searchInput && locationInput) {

    searchBtn.addEventListener("click", goToExploreEvents);

    // Search when pressing Enter
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            goToExploreEvents();
        }
    });

    locationInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            goToExploreEvents();
        }
    });

}

console.log("Eventify homepage loaded successfully!");