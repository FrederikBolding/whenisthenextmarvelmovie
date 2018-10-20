const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


var tmdbclient = require('themoviedbclient');
var tmdb = new tmdbclient(process.env.API_KEY);

var nextMovies = [299537, 299534, 429617]

var cachedMovie;
var cachedTime;

const oneDay = 60 * 60 * 24 * 1000;

app.get("/api/nextmovie", (req, res) => {
  if (cachedMovie && (new Date() - cachedTime) < oneDay) {
    res.json(cachedMovie);
    return;
  } else {
    getNextMovie(0);
  }

  function getNextMovie(index) {
    tmdb.call("/movie/" + nextMovies[index], {})
      .then(function (movie) {
        var date = new Date(movie.release_date);
        if (date > new Date()) {
          cachedMovie = movie;
          cachedTime = new Date();
          res.json(movie);
          return;
        } else if (index < nextMovies.length) {
          getNextMovie(index + 1);
        }
      });
  }
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});