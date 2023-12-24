const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const PORT = 3000;

let movies = [];

// Fetches the latest movies from IMDb and updates the movie list
const updateMovies = async () => {
  try {
    const response = await axios.get("https://www.imdb.com/chart/top");
    const movieList = response.data;
    // Parse the movie list and extract the movie titles
    // Modify the code here to extract the movie titles from the IMDb response
    movies = extractMovieTitles(movieList);
    console.log("Movie list updated successfully!");
  } catch (error) {
    console.error("Failed to update movie list:", error.message);
  }
};

// Schedule the movie list update every 24 hours
cron.schedule("0 0 * * *", updateMovies);

// Returns a random movie from the movie list
const getRandomMovie = () => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

app.get("/random-movie", (req, res) => {
  const randomMovie = getRandomMovie();
  res.json(randomMovie);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
