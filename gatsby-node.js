/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions: { createPage } }) => {
  var tmdbclient = require("themoviedbclient")
  var tmdb = new tmdbclient(process.env.API_KEY)

  var nextMovies = [429617, 497698, 453395, 505642, 447365]

  var nextMovie = null;
  for (let id of nextMovies){
    var movie = await tmdb.call("/movie/" + id, {});
    var date = new Date(movie.release_date);
    if (date > new Date()) {
        nextMovie = movie;
        break;
    }
  }

  createPage({
    path: `/`,
    component: require.resolve("./src/templates/index.js"),
    context: { nextMovie },
  })
}
