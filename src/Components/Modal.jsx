import React, { useContext, useState } from "react";
import ReactModal from "react-modal";
import { AppContext, ACTIONS } from "../App.jsx";

export default function Modal({
  isOpen,
  setIsOpen,
  updateUserId,
  setUpdateUserId,
  updateTitle,
  setUpdateTitle,
  selectedPostId,
}) {
  const { posts, dispatch } = useContext(AppContext);

  async function onSubmit(id) {
    try {
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            userId: updateUserId,
            title: updateTitle,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      ); //use in component

      const updatedPost = await result.json();
      console.log(updatedPost);
      dispatch({ type: ACTIONS.UPDATE_POST, payload: { ...updatedPost, id } });
      setIsOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <ReactModal isOpen={isOpen}>
      <input
        type="text"
        placeholder="User ID"
        value={updateUserId}
        onChange={(e) => setUpdateUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={updateTitle}
        onChange={(e) => setUpdateTitle(e.target.value)}
      />
      <button onClick={() => onSubmit(selectedPostId)}>Update</button>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </ReactModal>
  );
}

// import React from "react";

// export default function Modal({ children, open, onClose }) {
//   if (!open) return null;

// //   return (
// //     <div>
// //       <button onClick={onClose}>Close Modal</button>
// //       {children}
// //     </div>
// //   );
// }

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };
//check tag dialogue
