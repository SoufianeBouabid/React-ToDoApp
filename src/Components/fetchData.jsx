import React, { useContext, useEffect } from "react";
import { AppContext, ACTIONS } from "../App.jsx";

export default function FetchData() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const jsonData = await response.json();
        dispatch({ type: ACTIONS.ADD_TOTAL_POSTS, payload: jsonData });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dispatch]);

  return null;
}
