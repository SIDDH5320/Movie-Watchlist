// GlobalState.js
import { createContext, useEffect, useReducer } from "react";
import { AppReducer } from "./AppReducer";

// Initial State
const initialState = {
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

// create Context
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCH_LIST", payload: movie });
  };

  const removeMovieFromWatchList = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  // New actions for rating and reviewing
  const rateMovie = (id, rating) => {
    dispatch({ type: "RATE_MOVIE", payload: { id, rating } });
  };

  const reviewMovie = (id, review) => {
    dispatch({ type: "REVIEW_MOVIE", payload: { id, review } });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchList: state.watchList,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchList,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
        rateMovie, // expose new actions
        reviewMovie, // expose new actions
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
