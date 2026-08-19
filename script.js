// ==========================================
// GET HTML ELEMENTS
// ==========================================

const loadButton = document.getElementById("loadCountries");
const countriesContainer =
    document.getElementById("countriesContainer");
const statusMessage =
    document.getElementById("status");


// ==========================================
// PUBLIC API URL
// ==========================================

// Free API - no API key required
const apiURL =
    "https://countries.dev/countries?fields=name,capital,population,flag";


// ==========================================
// FETCH USING .THEN()
// ==========================================

function fetchCountries() {

    console.log("Starting fetch()...");

    fetch(apiURL)

        .then(function(response) {

            console.log("Response received:", response);

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

            // Display the countries
            displayCountries(data);

            statusMessage.textContent =
                "Country information loaded successfully!";

        })

        .catch(function(error) {

            console.error("Error:", error);

            statusMessage.textContent =
                "Sorry, there was an error loading the data.";

        })

        .finally(function() {

            loadButton.disabled = false;

            loadButton.textContent =
                "Load Countries";

        });
}


// ==========================================
// ASYNC/AWAIT VERSION
// ==========================================

async function fetchCountriesAsync() {

    console.log("Starting async/await fetch()...");

    try {

        const response = await fetch(apiURL);

        console.log(
            "Async/Await response received:",
            response
        );

        if (!response.ok) {
            throw new Error(
                "Network response was not successful"
            );
        }

        const data = await response.json();

        console.log(
            "Async/Await parsed JSON:"
        );

        console.log(data);

    }

    catch (error) {

        console.error(
            "Async/Await Error:",
            error
        );

    }
}


// ==========================================
// DISPLAY COUNTRIES
// ==========================================

function displayCountries(countries) {

    countriesContainer.innerHTML = "";

    // Sort countries alphabetically
    countries.sort(function(a, b) {

        return a.name.localeCompare(b.name);

    });


    // Show the first 12 countries
    const selectedCountries =
        countries.slice(0, 12);


    selectedCountries.forEach(function(country) {

        const card =
            document.createElement("div");

        card.classList.add("country-card");


        const countryName =
            country.name || "Unknown";


        const capital =
            country.capital || "No capital information";


        const population =
            country.population
                ? Number(country.population).toLocaleString()
                : "Unknown";


        const flag =
            country.flag || "";


        card.innerHTML = `

            <img
                src="${flag}"
                alt="Flag of ${countryName}"
            >

            <div class="country-info">

                <h3>${countryName}</h3>

                <p>
                    <strong>Capital:</strong>
                    ${capital}
                </p>

                <p>
                    <strong>👥 Population:</strong>
                    ${population}
                </p>

            </div>

        `;


        countriesContainer.appendChild(card);

    });
}


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