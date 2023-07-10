import React, { useContext, useState } from "react";
import { AppContext, ACTIONS } from "../App.jsx";
import styles from "../Styling/colors.css";

export default function InputZone() {
  const { posts, dispatch } = useContext(AppContext);
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

      const newPost = { ...(await res.json()), id: Math.random() };

      dispatch({ type: ACTIONS.ADD_POST, payload: newPost });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: ACTIONS.DELETE_POST, payload: { id } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: "soufiane",
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const updatedPost = await result.json();
      console.log(updatedPost);

      dispatch({ type: ACTIONS.UPDATE_POST, payload: { ...updatedPost, id } });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h2 className={styles.heading}>Add new Post</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="title">Title</label>
        <textarea
          placeholder="Enter Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        ></textarea>
        <button type="submit" className={styles.button}>
          <span>Add</span>
        </button>
      </form>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.item}>
            <p>{post.userId}</p>
            <h2>{post.title}</h2>
            <button
              onClick={() => handleDelete(post.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdate(post.id)}
              className={styles.updateButton}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
