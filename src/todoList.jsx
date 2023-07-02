import React from'react';

function ToDoList(props){
    return(
        <ul>
    
        {props.listItems.map(
           (listElement,id)=>{ 
            return (
            <div key= {listElement.id}>
            <li>
                {listElement.value} 
        <button 
            style={{backgroundColor:"red"}} 
            onClick={()=>props.handleDelete(listElement.id)}>
               Delete
            </button>
            </li>
        </div>
          ) })}
        </ul>
        
)}

export default ToDoList;