import React, { useState } from "react";
import { createContext } from "react";
import FetchData from "./fetchData";
import InputZone from "./inputZone";

export const MyContext = createContext({ posts: [], setPost: () => {} });//useReducer

function App() {
  const currentDate = new Date().toLocaleDateString();
  const [posts, setPosts] = useState([]);

  return (
    <>
      <div>
        <MyContext.Provider value={{ posts, setPosts }}>
          <InputZone />
          <FetchData />
        </MyContext.Provider>
      </div>
      <h1>To do list {currentDate}</h1>
      <InputZone />
      <FetchData />
    </>
  );
}

export default App;
