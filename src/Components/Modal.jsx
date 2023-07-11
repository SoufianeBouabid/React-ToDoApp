import React from "react";
import ReactModal from "react-modal";

export default function Modal({
  isOpen,
  setIsOpen,
  updateUserId,
  setUpdateUserId,
  updateTitle,
  setUpdateTitle,
  handleUpdate,
  selectedPostId,
}) {
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
      <button onClick={() => handleUpdate(selectedPostId)}>Update</button>
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
