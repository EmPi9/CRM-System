import { useEffect, useState } from "react";
import updateTask from "../api/updateTask"
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import ListTasks from "../components/ListTasks";

export default function TodoListPage() {
    const [dataTasks, setDataTasks] = useState([])
    const [taskTitle, setTaskTitle] = useState('')
    const [viewStatus, setViewStatus] = useState('all')
    const [counts, setCounts] = useState([]);

    const fetchData = async (viewStatus) => {
        try {
            const data = await updateTask(viewStatus);
            const tasksCount = await updateTask();
            
            setCounts([
                tasksCount.length,
                tasksCount.filter(task => !task.isDone).length,
                tasksCount.filter(task => task.isDone).length
              ]);
            
            setDataTasks(data);
        } catch (err) {
            console.log('ошибка обновления')
        }
    }

    useEffect(() => {
        fetchData(viewStatus);
    }, [])


    return <>
        <AddTask taskTitle={taskTitle} setTaskTitle={setTaskTitle} fetchData={fetchData} viewStatus={viewStatus} />
        <FilterTask viewStatus={viewStatus} counts={counts} fetchData={fetchData} setViewStatus={setViewStatus} />
        <ListTasks fetchData={fetchData} dataTasks={dataTasks} viewStatus={viewStatus}  />

    </>
}