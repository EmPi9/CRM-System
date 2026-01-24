import { useState } from "react";
import AddTask from "../api/AddTask";

export default function InputTask() {
    const [taskTitle, setTaskTitle] = useState('')

    const handleInputChange = (e) => {
        setTaskTitle(e.target.value)
    }

    const handleSubmit = () => {
        AddTask(taskTitle);
        setTaskTitle('')
    }

    return <div className="container">
        <input type="text" onChange={handleInputChange} value={taskTitle} placeholder="Задача" />
        <button onClick={handleSubmit} type="submit" className="butt">Создать</button>
    </div>
 }