// import React, { useState, useEffect, useContext } from "react";
// import { MyContext } from "./App";

// function InputZone() {
//   const { posts, setPosts } = useContext(MyContext);

//   const handleSubmit = (e) => {
//     e.preventDefault(); //to prevent refreshing
//     console.log(e);

//     fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       body: JSON.stringify({
//         title: e.target.title.value,
//         userId: e.target.userId.value,
//       }),
//       headers: {
//         "Content-type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((post) => {
//         setPosts((posts) => [post, ...posts]);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   return (
//     <div>
//       <h2>Add new To Do</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="userId">UserId</label>
//         <input
//           type="text"
//           placeholder="insert your UserID title"
//           id="userId"
//           name="userId"
//         />
//         <label htmlFor="title">Title</label>
//         <textarea
//           placeholder="insert a new Todo title"
//           id="title"
//           name="title"
//           //Each input element should have a unique name attribute so that the data entered in the input can be identified and accessed on the server-side when the form is submitted
//         ></textarea>
//         <button type="submit">
//           <span>Add</span>
//         </button>
//       </form>
//     </div>
//   );
// }

// export default InputZone; //nom de fichier et component majucule
// //validation fu form avant de pusher via react hook form pour validation de formulaire
// //userId number title required
// //tout géré par contexte api
// //delete and patch call api
