import React, { useState, useEffect } from "react";

function InputZone() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const jsonData = await response.json();

        setPosts(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); //to prevent refreshing

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: e.target.title.value,
        userId: e.target.userId.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setPosts((posts) => [post, ...posts]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <>
      <div>
        <h2>Add new To Do</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userId">UserId</label>
          <input
            type="text"
            placeholder="insert your UserID title"
            id="userId"
          />
          <label htmlFor="title">Title</label>
          <textarea placeholder="insert a new Todo title" id="title"></textarea>
          <button type="submit">
            <span>Add</span>
          </button>
        </form>
      </div>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <p>{post.userId}</p>
              <h2>{post.title}</h2>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default InputZone;
