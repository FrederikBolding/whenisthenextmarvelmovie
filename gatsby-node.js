/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.sourceNodes = async ({actions, createContentDigest}) => {
  const {createNode} = actions;

  var tmdbclient = require("themoviedbclient")
  var tmdb = new tmdbclient(process.env.API_KEY)

  var nextMovies = [497698, 524434, 566525, 453395, 616037, 505642, 447365]

  for (let id of nextMovies) {
    try {
      var movie = await tmdb.call("/movie/" + id, {});
      await createNode({
        type: "backgroundImage",
        id: movie.id.toString(),
        url: `http://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
        title: movie.title,
        release_date: movie.release_date,
        children: [],
        parent: null,
        internal: {
          type: "backgroundImage",
          content: JSON.stringify(movie),
          contentDigest: createContentDigest(movie)
        }
      });
    } catch (error) {
      console.warn('error creating node', error);
    }
  }
};
