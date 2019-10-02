var express = require("express");
var router = express.Router();

const movieDetails = require("../data/movieDetails");

// Middleware: check if content-type is json
const requireJSON = (req, res, next) => {
  if (req.is("application/json")) {
    res.json({ msg: "Content type must be application/json" });
  } else {
    next();
  }
};

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

// Movie routes:

// GET /movie/top_rated
router.get("/top_rated", (req, res, next) => {
  let page = req.query.page;
  if (!page) {
    page = 1;
  }

  // Descending order for movie ratings
  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });
  let indexToStart = (page - 1) * 20;
  res.json(results.slice(indexToStart, indexToStart + 20));
});

// THIS ROUTE NEEDS TO COME LAST DUE TO WILD CARD
// GET /movie/movieId
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  const results = movieDetails.find(movie => {
    return movie.id == movieId;
  });
  // If no search results, return empty object instead of undefined
  res.json(
    results ? results : { msg: "Movie ID not found", production_companies: [] }
  );
});

// POST /movie/movieId/rating
router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;
  const userRating = req.body.value;
  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: "Rating must be between 0.5 and 10" });
  } else {
    res.json({
      msg: "Thank you for submitting your rating.",
      status_code: 200
    });
  }
});

// DELETE /movie/movieId/rating
router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({ msg: "Rating deleted" });
});

module.exports = router;
