// import React, { useEffect, useContext } from "react";
// import { MyContext } from "./App";

// function FetchData() {
//   const { posts, setPosts } = useContext(MyContext);
// //validation avant de set les post 
//   const handleDelete = (id) => {
//     setPosts(posts.filter((post) => post.id !== id));
//   };
// //swr au lieu de useffect et fetch data 
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "https://jsonplaceholder.typicode.com/posts"
//         );
//         const jsonData = await response.json();

//         setPosts(jsonData);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => {
//         return (
//           <div key={post.id}>
//             <p>{post.userId}</p>
//             <h2>{post.title}</h2>
//             <button onClick={() => handleDelete(post.id)}>Delete</button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default FetchData;
