import React, { createContext, useReducer, useState, useEffect } from "react";
import FetchData from "./Components/FetchData";
import InputZone from "./Components/InputZone";
import styles from "./Styling/colors.css";

export const AppContext = createContext();

export const ACTIONS = {
  ADD_POST: "add-post",
  DELETE_POST: "delete-post",
  UPDATE_POST: "update-post",
  ADD_TOTAL_POSTS: "add-total-post",
};

export function reducer(posts, action) {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return [action.payload, ...posts];

    case ACTIONS.DELETE_POST:
      return posts.filter((post) => post.id !== action.payload.id);

    case ACTIONS.UPDATE_POST:
      console.log(posts);
      console.log(action.payload);
      return posts.map((post
        ) =>
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
  // const [userId, setUserId] = useState("");
  // const [title, setTitle] = useState("");

  return (
    <AppContext.Provider value={{ posts, dispatch }}>
      <div className={styles.container}>
        <FetchData />
        <InputZone />
      </div>
    </AppContext.Provider>
  );
}

export default App;
