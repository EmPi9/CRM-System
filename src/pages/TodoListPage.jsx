import { useEffect, useState } from "react";
import { getTodos } from '../api/todos'
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import ListTasks from "../components/ListTasks";

export default function TodoListPage() {
    const [todos, setTodos] = useState({
        data: [],
        info: { all: 0, completed: 0, inWork: 0 },
        meta: { totalAmount: 0 } })
    const [filter, setFilter] = useState('all')

    const fetchData = async () => {
        try {
            const data = await getTodos(filter);
            setTodos(data);
        } catch {
            alert('Ошибка работы сервера.')              
        }
    }

    useEffect(() => {
        fetchData(filter);
    }, [filter])


    return <>
        <AddTask fetchData={fetchData} />
        <FilterTask filter={filter} todos={todos} setFilter={setFilter} />
        <ListTasks fetchData={fetchData} todos={todos}  />
    </>
}