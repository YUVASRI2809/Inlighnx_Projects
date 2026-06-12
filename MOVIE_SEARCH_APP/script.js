// ===============================
// OMDb API Key
// ===============================
const API_KEY = "5584c491";

// ===============================
// DOM Elements
// ===============================
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const movieDetailsDiv = document.getElementById("movieDetails");
const errorMessage = document.getElementById("errorMessage");

// Placeholder image for missing posters
const PLACEHOLDER_IMAGE =
    "https://via.placeholder.com/300x450?text=No+Image";

// ===============================
// Event Listeners
// ===============================

// Search button click
searchButton.addEventListener("click", handleSearch);

// Press Enter to search
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// ===============================
// Handle Search
// ===============================
function handleSearch() {
    const searchTerm = searchInput.value.trim();

    // Clear previous messages
    errorMessage.textContent = "";
    movieDetailsDiv.classList.remove("active");
    movieDetailsDiv.innerHTML = "";

    // Empty search validation
    if (searchTerm === "") {
        errorMessage.textContent =
            "Please enter a movie title.";
        return;
    }

    searchMovies(searchTerm);
}

// ===============================
// Search Movies
// ===============================
async function searchMovies(query) {
    try {
        resultsDiv.innerHTML =
            `<p class="loading">Loading movies...</p>`;

        const response = await fetch(
            `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
        );

        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            resultsDiv.innerHTML =
                `<p class="no-results">${data.Error}</p>`;
        }

    } catch (error) {
        console.error("Search Error:", error);

        resultsDiv.innerHTML = `
            <p class="no-results">
                Something went wrong.
                Please try again later.
            </p>
        `;
    }
}

// ===============================
// Display Search Results
// ===============================
function displayMovies(movies) {
    resultsDiv.innerHTML = "";

    movies.forEach((movie) => {
        const movieItem = document.createElement("div");

        movieItem.classList.add("movie-item");

        const poster =
            movie.Poster !== "N/A"
                ? movie.Poster
                : PLACEHOLDER_IMAGE;

        movieItem.innerHTML = `
            <img src="${poster}" alt="${movie.Title}">

            <div class="movie-content">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
            </div>
        `;

        // Fetch details when clicked
        movieItem.addEventListener("click", () => {
            fetchMovieDetails(movie.imdbID);
        });

        resultsDiv.appendChild(movieItem);
    });
}

// ===============================
// Fetch Movie Details
// ===============================
async function fetchMovieDetails(imdbID) {
    try {
        movieDetailsDiv.classList.add("active");

        movieDetailsDiv.innerHTML = `
            <p class="loading">
                Loading movie details...
            </p>
        `;

        const response = await fetch(
            `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
        );

        const movie = await response.json();

        if (movie.Response === "True") {
            displayMovieDetails(movie);
        } else {
            movieDetailsDiv.innerHTML = `
                <p>Could not load movie details.</p>
            `;
        }

    } catch (error) {
        console.error("Details Error:", error);

        movieDetailsDiv.innerHTML = `
            <p>
                Something went wrong while
                loading movie details.
            </p>
        `;
    }
}

// ===============================
// Display Movie Details
// ===============================
function displayMovieDetails(movie) {
    const poster =
        movie.Poster !== "N/A"
            ? movie.Poster
            : PLACEHOLDER_IMAGE;

    movieDetailsDiv.classList.add("active");

    movieDetailsDiv.innerHTML = `
        <h2>${movie.Title}</h2>

        <img src="${poster}" alt="${movie.Title}">

        <p>
            <strong>Year:</strong>
            ${movie.Year}
        </p>

        <p>
            <strong>Genre:</strong>
            ${movie.Genre}
        </p>

        <p>
            <strong>Director:</strong>
            ${movie.Director}
        </p>

        <p>
            <strong>Cast:</strong>
            ${movie.Actors}
        </p>

        <p>
            <strong>IMDb Rating:</strong>
            ${movie.imdbRating}
        </p>

        <p>
            <strong>Runtime:</strong>
            ${movie.Runtime}
        </p>

        <p>
            <strong>Language:</strong>
            ${movie.Language}
        </p>

        <p>
            <strong>Plot:</strong>
            ${movie.Plot}
        </p>
    `;

    // Scroll to details section
    movieDetailsDiv.scrollIntoView({
        behavior: "smooth"
    });
}