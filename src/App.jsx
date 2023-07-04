import React, { useEffect, useState } from "react";
// import ToDoList from "./todoList";
import InputZone from "./inputZone";

function App() {
  const currentDate = new Date().toLocaleDateString();

  const [items, setItems] = useState(() => {
    const localValue = localStorage.getItem("items");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(
    () => localStorage.setItem("items", JSON.stringify(items)),
    [items]
  );
  // we use useEffect o run the localStorage function everytime a change happens in the second parameter of the function
  //which is our array

  function handleClick(value) {
    setItems([
      ...items,
      {
        id: Date.now(),
        value,
      },
    ]);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <>
      <h1>To do list {currentDate}</h1>
      <InputZone handleClick={handleClick} />
      {/* <ToDoList listItems={items} handleDelete={handleDelete} /> */}
    </>
  );
}
//use async wait and todos and add or delete the todos
export default App;
