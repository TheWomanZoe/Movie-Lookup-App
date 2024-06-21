import { OMDB_API_KEY } from "./module.js";

const apiKey = atob(OMDB_API_KEY);

document.querySelector(".search-form button").addEventListener("click", function(event) {
    event.preventDefault();
    const movieTitle = document.getElementById("title").value;
    const releaseYear = document.getElementById("year").value;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}&y=${releaseYear}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("movie-title").textContent = data.Title;
            document.getElementById("release-date").textContent = data.Released;
            
            const existingBanner = document.getElementById("movie-banner");
            if (existingBanner) {
                existingBanner.remove();
            }
            
            const movieBanner = document.createElement("img");
            movieBanner.id = "movie-banner";
            movieBanner.src = data.Poster;

            document.querySelector(".other-info").prepend(movieBanner);
            document.getElementById("genre").textContent = `Genre: ${data.Genre}`;
            document.getElementById("runtime").textContent = `Runtime: ${data.Runtime}`;
            document.getElementById("plot").textContent = `Plot: ${data.Plot}`;
            document.getElementById("rating").textContent = `Rating: ${data.imdbRating}`;
            document.getElementById("director").textContent = `Director: ${data.Director}`;
    })
        .catch(error => {
            alert("An error has occured while fetching the movie data");
        });
});
