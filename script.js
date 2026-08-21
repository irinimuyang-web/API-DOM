// Store the fetched countries in memory
let countries = [];

// Get elements from the HTML
const loadButton = document.getElementById("loadCountries");
const countriesContainer = document.getElementById("countriesContainer");
const statusMessage = document.getElementById("status");
const searchInput = document.getElementById("searchInput");

// API URL
const apiURL =
    "https://countries.dev/countries?fields=name,capital,population,flag";


// ===============================
// FETCH COUNTRIES
// ===============================

function fetchCountries() {

    console.log("Starting fetch()...");

    // Disable the button while loading
    loadButton.disabled = true;
    loadButton.textContent = "Loading...";

    statusMessage.textContent = "Loading country information...";

    fetch(apiURL)

        .then(function(response) {

            console.log("Response received:", response);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(
                    "Network response was not successful"
                );
            }

            // Convert response to JSON
            return response.json();
        })

        .then(function(data) {

            console.log("Parsed JSON data:");
            console.log(data);

            // Store the fetched data in memory
            countries = data;

            // Display all countries
            displayCountries(countries);

            // Update status message
            statusMessage.textContent =
                "Country information loaded successfully!";
        })

        .catch(function(error) {

            console.error("Error:", error);

            statusMessage.textContent =
                "Sorry, there was an error loading the data.";
        })

        .finally(function() {

            // Enable the button again
            loadButton.disabled = false;

            loadButton.textContent = "Load Countries";
        });
}


// ===============================
// DISPLAY COUNTRIES
// ===============================

function displayCountries(data) {

    // Clear the old cards
    countriesContainer.innerHTML = "";

    // Check if there are no matching countries
    if (data.length === 0) {

        countriesContainer.innerHTML =
            "<p>No countries found.</p>";

        return;
    }

    // Create a card for each country
    data.forEach(function(country) {

        const card = document.createElement("div");

        card.classList.add("country-card");

        card.innerHTML = `
            <img 
                src="${country.flag}" 
                alt="Flag of ${country.name}"
            >

            <h2>${country.name}</h2>

            <p>
                <strong>Capital:</strong>
                ${country.capital || "N/A"}
            </p>

            <p>
                <strong>Population:</strong>
                ${country.population
                    ? country.population.toLocaleString()
                    : "N/A"}
            </p>
        `;

        countriesContainer.appendChild(card);
    });
}


// ===============================
// LOAD BUTTON
// ===============================

loadButton.addEventListener("click", function() {

    fetchCountries();

});


// ===============================
// SEARCH / FILTER
// ===============================

searchInput.addEventListener("input", function() {

    // Get what the user typed
    const searchTerm =
        searchInput.value.toLowerCase().trim();

    // Filter the countries already stored in memory
    const filteredCountries = countries.filter(function(country) {

        return country.name
            .toLowerCase()
            .includes(searchTerm);

    });

    // Display the filtered results
    displayCountries(filteredCountries);

});

// ==========================================
// BUTTON EVENT
// ==========================================

loadButton.addEventListener(
    "click",
    function() {

        console.log(
            "Load Countries button clicked."
        );

        loadButton.disabled = true;

        loadButton.textContent =
            " Loading...";

        statusMessage.textContent =
            "Fetching country information...";


        // Fetch using .then()
        fetchCountries();


        // Demonstrate async/await
        fetchCountriesAsync();

    }
);