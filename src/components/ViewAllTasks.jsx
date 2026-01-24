import { useEffect, useState } from "react";

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
            <div key={item.id} className="task">{item.title}</div>
           ))}
        </div>
    </>

           

}