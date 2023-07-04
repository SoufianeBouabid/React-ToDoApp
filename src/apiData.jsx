import React, { useEffect, useState } from "react";

function GetData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const jsonData = await response.json();

        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  function handleDeleteItem(id) {
    setData(data.filter((receivedData) => receivedData.id !== id));
  }
  return (
    <>
      <h2>Fetched Data</h2>
      <ul>
        {data.map((receivedData) => (
          <li key={receivedData.id}>
            <p>
              userId:{receivedData.userId} commentId:{receivedData.id} Title:
              {receivedData.title}
            </p>
            <button
              style={{ backgroundColor: "red" }}
              onClick={function () {
                handleDeleteItem(receivedData.id);
              }}
            >
              Delete
            </button>
            {/* pk utiliser une fonction dans le onClick et pas directement  error too ùany re-renders*/}
            {/* HOW TO KEEP THE DELETED ITEMS FETCHED DELETED IF POSSIBLE  */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetData;
