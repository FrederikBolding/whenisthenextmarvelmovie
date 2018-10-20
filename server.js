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

app.get("/api/nextmovie", (req, res) => {
  getNextMovie(0);

  function getNextMovie(index) {
    tmdb.call("/movie/" + nextMovies[index], {})
      .then(function (movie) {
        var date = new Date(movie.release_date);
        if (date > new Date()) {
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