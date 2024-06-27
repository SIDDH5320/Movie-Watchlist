import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const MovieControls = ({ movie, type }) => {
  const {
    removeMovieFromWatchList,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
    rateMovie,
    reviewMovie
  } = useContext(GlobalContext);

  const [rating, setRating] = useState(movie.rating || 0);
  const [review, setReview] = useState(movie.review || "");

  const handleRatingChange = (e) => {
    const newRating = Number(e.target.value);
    setRating(newRating);
    rateMovie(movie.id, newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = () => {
    reviewMovie(movie.id, review);
  };

  return (
    <div className="inner-card-controls">
      {type === "watched" && (
        <div className="movie-interactions">
          <div className="rating">
            <label>Rate this movie:</label>
            <select value={rating} onChange={handleRatingChange}>
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Star{i + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="review">
            <label>Write a review:</label>
            <textarea
              value={review}
              onChange={handleReviewChange}
              onBlur={handleReviewSubmit}
              placeholder="Write your review here..."
            />
          </div>
        </div>
      )}

      {type === "watchList" && (
        <>
          <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
            <i className="fa-fw far fa-eye"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchList(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}

      {type === "watched" && (
        <>
          <button className="ctrl-btn" onClick={() => moveToWatchlist(movie)}>
            <i className="fa-fw far fa-eye-slash"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeFromWatched(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default MovieControls;
