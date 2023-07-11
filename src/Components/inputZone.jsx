import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext, ACTIONS } from "../App.jsx";
import * as yup from "yup";
import styles from "../Styling/colors.css";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

export default function InputZone() {
  const { posts, dispatch } = useContext(AppContext);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [updateUserId, setUpdateUserId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const schema = yup.object().shape({
    userId: yup
      .number()
      .positive()
      .integer()
      .required("Your usedId is required"),
    title: yup.string().min(5).required("Please enter a To Do"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (e) => {
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

  const handleOpenModal = (id, userId, title) => {
    setSelectedPostId(id);
    setUpdateUserId(userId); //work with the previous states
    setUpdateTitle(title);
    setIsOpen(true);
  };

  return (
    <>
      <div>
        <h2 className={styles.heading}>Add new Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="userId">User ID</label>
          <input
            {...register("userId")}
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={styles.input}
          />

          <p className="errorMessage">{errors.userId?.message}</p>
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            placeholder="Enter Post Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <p className="errorMessage">{errors.title?.message}</p>
          <input type="submit" className={styles.button} />
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
                onClick={() =>
                  handleOpenModal(post.id, post.userId, post.title)
                }
                className={styles.updateButton}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isOpen}
        setUpdateUserId={setUpdateUserId}
        setUpdateTitle={setUpdateTitle}
        updateUserId={updateUserId}
        updateTitle={updateTitle}
        setIsOpen={setIsOpen}
        selectedPostId={selectedPostId}
      />
    </>
  );
}
