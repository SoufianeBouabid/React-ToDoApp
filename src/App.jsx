import React, { createContext, useReducer, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

import InputZone from "./Components/InputZone";
import Modal from "./Components/Modal";
import styles from "./Styling/colors.css";
import useSWR from "swr";

export const AppContext = createContext();

export const ACTIONS = {
  ADD_POST: "add-post",
  DELETE_POST: "delete-post",
  UPDATE_POST: "update-post",
  ADD_TOTAL_POSTS: "add-total-post",
};

function reducer(posts, action) {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return [action.payload, ...posts];

    case ACTIONS.DELETE_POST:
      return posts.filter((post) => post.id !== action.payload.id);

    case ACTIONS.UPDATE_POST:
      console.log(posts);
      console.log(action.payload);
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );

    case ACTIONS.ADD_TOTAL_POSTS:
      return action.payload;

    default:
      return posts;
  }
}

function App() {
  const [posts, dispatch] = useReducer(reducer, []);
  const fetcher = (url) =>
    fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });

  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/",
    fetcher
  );
  if (posts.length == 0 && data) {
    dispatch({ type: ACTIONS.ADD_TOTAL_POSTS, payload: data });
  }

  return (
    <AppContext.Provider value={{ posts, dispatch }}>
      <div className={styles.container}>
        <InputZone />
        <Modal />
      </div>
    </AppContext.Provider>
  );
}

export default App;
