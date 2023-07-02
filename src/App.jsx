import React,{ useState } from 'react'
import ToDoList from './todoList'


function App() {
    const currentDate = new Date().toLocaleDateString();

    const [newInput,setNewInput]=useState("");
    const [items,setItems]=useState([]);
    
     function handleChange(event){
        const newValue = event.target.value;
        setNewInput(newValue);
    }

    function handleClick(){
        setItems((prevItems)=>{
            const newItem={
                id:Date.now(),value:newInput};
            return [...prevItems,newItem]
        });   
        
    };
    function handleDelete(id){   
        setItems((prevItems)=>{
            return prevItems.filter(item=>item.id !== id)
            })};

return (
    <>
  
<h1>To do list {currentDate}</h1>
<input type="text" placeholder="insert new item" onChange={handleChange} value={newInput}></input> 

{/* /* value will be used to empty input after click */}

<div><button onClick={()=>{
    handleClick()
    setNewInput("");}} >
    <span>Add</span>
    
</button>
</div>
<div>
    <ToDoList listItems={items} handleDelete={handleDelete}/>
</div>
</>
  )
 }

export default App
