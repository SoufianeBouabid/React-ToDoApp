import React,{ useState } from 'react'

function InputZone(props){
    const [newInput,setNewInput]=useState("");

    function handleChange(event){
        const newValue = event.target.value;
        setNewInput(newValue);
    }
    
    return( 
    <>
<input type="text" placeholder="insert new item" onChange={handleChange} value={newInput}></input> 

{/* /* value will be used to empty input after click */}

<div><button onClick={()=>{
    props.handleClick(newInput)
    setNewInput("");}} >
    <span>Add</span>
</button>
</div>
</>
)
}

export default InputZone;