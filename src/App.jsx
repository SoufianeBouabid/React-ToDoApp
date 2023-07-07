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
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );

    default:
      return posts;
  }
}

function App() {
  const [posts, setPosts] = useReducer(reducer, []);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          title: title,
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

      setPosts({ type: ACTIONS.DELETE_POST, payload: { id } });
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
          "https://jsonplaceholder.typicode.com/posts"
        );
        const jsonData = await response.json();
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
        <h2>Add new Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <label htmlFor="title">Title</label>
          <textarea
            placeholder="Enter Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <button type="submit">
            <span>Add</span>
          </button>
        </form>
      </div>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <p>{post.userId}</p>
            <h2>{post.title}</h2>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <button onClick={() => handleUpdate(post.id)}>Update</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
