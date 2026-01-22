import { useState } from "react";

export default function InputTask() {
    const [taskTitle, setTaskTitle] = useState('')

    const handleInputChange = (e) => {
        setTaskTitle(e.target.value)
    }

    function AddTask () {
        fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
            title: taskTitle,
            isDone: false,
          }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    return <div>
        <input type="text" onChange={handleInputChange} value={taskTitle} />
        <button onClick={AddTask} type="submit">Создать задачу
        </button>
    </div>
 }