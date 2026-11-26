document.addEventListener("DOMContentLoaded", function () {

    // Event cards from Explore Events HTML
    const eventCards = document.querySelectorAll(".explore-event-card");

    // Search elements
    const eventSearch = document.getElementById("eventSearch");
    const eventLocation = document.getElementById("eventLocation");
    const searchBtn = document.getElementById("searchBtn");

    // Category buttons from Explore Events HTML
    const categoryButtons = document.querySelectorAll(".filter-btn");

    // Filter and sorting elements
    const priceFilter = document.getElementById("priceFilter");
    const sortEvents = document.getElementById("sortEvents");

    // Other elements
    const noEvents = document.getElementById("noEvents");
    const eventCount = document.getElementById("eventCount");
    const eventGrid = document.getElementById("eventGrid");

    // Read category only when homepage sends one
    const urlParams = new URLSearchParams(window.location.search);
    const requestedCategory = urlParams.get("category");

    let selectedCategory = "all";

    const validCategories = [
        "technology",
        "music",
        "education",
        "arts",
        "business"
    ];

    if (validCategories.includes(requestedCategory)) {
        selectedCategory = requestedCategory;
    }

    // Filter and display events
    function filterEvents() {

        const searchText = eventSearch.value.toLowerCase().trim();
        const locationText = eventLocation.value.toLowerCase().trim();
        const selectedPrice = priceFilter.value;

        let visibleEvents = [];

        eventCards.forEach(function (card) {

            const eventName = card.dataset.name.toLowerCase();
            const eventLocationName = card.dataset.location.toLowerCase();
            const eventCategory = card.dataset.category;
            const eventPrice = Number(card.dataset.price);

            const matchesSearch = eventName.includes(searchText);

            const matchesLocation =
                eventLocationName.includes(locationText);

            const matchesCategory =
                selectedCategory === "all" ||
                eventCategory === selectedCategory;

            let matchesPrice = true;

            if (selectedPrice === "free") {
                matchesPrice = eventPrice === 0;
            }

            if (selectedPrice === "paid") {
                matchesPrice = eventPrice > 0;
            }

            const shouldShow =
                matchesSearch &&
                matchesLocation &&
                matchesCategory &&
                matchesPrice;

            if (shouldShow) {
                card.style.display = "";
                visibleEvents.push(card);
            } else {
                card.style.display = "none";
            }

        });

        // Sort events
        const sortValue = sortEvents.value;

        if (sortValue === "name") {
            visibleEvents.sort(function (a, b) {
                return a.dataset.name.localeCompare(b.dataset.name);
            });
        }

        if (sortValue === "price-low") {
            visibleEvents.sort(function (a, b) {
                return Number(a.dataset.price) -
                       Number(b.dataset.price);
            });
        }

        if (sortValue === "price-high") {
            visibleEvents.sort(function (a, b) {
                return Number(b.dataset.price) -
                       Number(a.dataset.price);
            });
        }

        // Arrange visible events
        visibleEvents.forEach(function (card) {
            eventGrid.appendChild(card);
        });

        // Update event count
        eventCount.textContent = visibleEvents.length;

        // Show or hide no-results message
        if (visibleEvents.length === 0) {
            noEvents.style.display = "block";
        } else {
            noEvents.style.display = "none";
        }
    }

    // Search button
    searchBtn.addEventListener("click", filterEvents);

    // Search while typing
    eventSearch.addEventListener("input", filterEvents);
    eventLocation.addEventListener("input", filterEvents);

    // Category buttons
    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory = button.dataset.category;

            // All Events clears other filters
            if (selectedCategory === "all") {

                eventSearch.value = "";
                eventLocation.value = "";
                priceFilter.value = "all";

            }

            filterEvents();
        });

    });

    // Price filter
    priceFilter.addEventListener("change", filterEvents);

    // Sorting
    sortEvents.addEventListener("change", filterEvents);

    // Mobile navigation
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // Set correct category button on page opening
    categoryButtons.forEach(function (button) {

        button.classList.remove("active");

        if (button.dataset.category === selectedCategory) {
            button.classList.add("active");
        }

    });

    // Display events when page opens
    filterEvents();

});