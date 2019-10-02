var express = require("express");
var router = express.Router();

const movies = require("../data/movies");
const people = require("../data/people");

// Middleware for requiring query params (all routes in router)
const queryRequired = (req, res, next) => {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.json({ msg: "Query is required" });
  } else {
    next();
  }
};

router.use(queryRequired);

// Get /search/movie
router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query;

  // Search movies with matching terms in title and overview
  const results = movies.filter(movie => {
    const found =
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  console.log(results);
  res.json(results ? { results } : {});
});

// Get /search/person
router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query;

  // Search movies with matching terms in title and overview
  const results = people.filter(person => {
    const found = person.name.includes(searchTerm);
    return found;
  });
  res.json(results ? { results } : {});
});

module.exports = router;
