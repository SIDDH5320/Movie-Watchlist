// MovieCard.js
import React from "react";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type }) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>
      
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      ) : (
        <div className="filler-poster" />
      )}

      {/* Movie Overview */}
      <div className="movie-overview">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>

      <MovieControls movie={movie} type={type} />
    </div>
  );
};

export default MovieCard;
