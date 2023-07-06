import React, { useState, useEffect, useReducer } from "react";

const ACTIONS = {
  ADD_POST: "add-post",
  DELETE_POST: "delete-post",
  UPDATE_POST: "update-post",
};

function reducer(posts, action) {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return [action.payload, ...posts];

    case ACTIONS.DELETE_POST:
      return posts.filter((post) => post.id !== action.payload.id);

    case ACTIONS.UPDATE_POST:
      // Update the corresponding post in the array
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );

    default:
      return posts;
  }
}

function App() {
  const currentDate = new Date().toLocaleDateString();
  const [posts, setPosts] = useReducer(reducer, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const userId = e.target.userId.value;
    const id = Date.now();

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          id,
          title,
          userId,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const newPost = await res.json();

      setPosts({ type: ACTIONS.ADD_POST, payload: newPost });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });

      setPosts({ type: ACTIONS.DELETE_POST, payload: newPost });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: "Updated Title",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const updatedPost = {
        id,
        title: "Updated Title",
        userId: 1,
      };

      setPosts({ type: ACTIONS.UPDATE_POST, payload: updatedPost });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const jsonData = await response.json();
        console.log(jsonData);

        setPosts({ type: ACTIONS.ADD_POST, payload: jsonData });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Add new To Do</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userId">UserId</label>
          <input
            type="text"
            placeholder="insert your UserID title"
            name="userId"
          />
          <label htmlFor="title">Title</label>
          <textarea
            type="text"
            placeholder="insert a new Todo title"
            name="title"
          ></textarea>
          <button type="submit">
            <span>Add</span>
          </button>
        </form>
      </div>
      <div>
        {posts.map((post, index) => {
          return (
            <div key={post.id + index}>
              <p>{post.userId}</p>
              <h2>{post.title}</h2>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <button onClick={() => handleUpdate(post.id)}>Update</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
