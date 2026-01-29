import { useEffect, useState } from "react";
import iconEdit from "../assets/icons/fi-rr-edit.svg"
import iconTrash from "../assets/icons/fi-rs-trash.svg"

export default function ViewAllTasks() {
    const [dataTasks, setDataTasks] = useState([]);

    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
        const result = await response.json()
        console.log(result)
        setDataTasks(result)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <>
        <div className="container">
           {dataTasks.map(item => (
            <div key={item.id} className="task">{item.title} 
                <div className="task-butts">
                    <button className="icon"><img src={iconEdit} alt="edit" /> </button>
                    <button className="icon"><img src={iconTrash} alt="trash" /></button>
                </div> 
            </div>
           ))}
        </div>
    </>

           

}