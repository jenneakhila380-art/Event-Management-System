document.addEventListener("DOMContentLoaded", function () {

    // Get event details from URL
    const params = new URLSearchParams(window.location.search);

    const title = params.get("title");
    const category = params.get("category");
    const date = params.get("date");
    const location = params.get("location");
    const price = params.get("price");

    // Display event details
    if (title) {
        document.getElementById("eventTitle").textContent = title;
    }

    if (category) {
        document.getElementById("eventCategory").textContent =
            category.toUpperCase();
    }

    if (date) {
        document.getElementById("eventDate").textContent = date;
    }

    if (location) {
        document.getElementById("eventLocation").textContent = location;
    }

    if (price !== null) {
        document.getElementById("eventPrice").textContent =
            price === "0" ? "Free" : "₹" + price;
    }

    // Book ticket button
    const bookTicketBtn = document.getElementById("bookTicketBtn");

    bookTicketBtn.addEventListener("click", function () {
        alert("Ticket booking will be available soon!");
    });

});