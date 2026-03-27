import { useEffect, useState } from "react";
import { Space } from 'antd'
import { getTodos } from '../api/todos'
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import ListTasks from "../components/ListTasks";
import AsideMenu from "../components/AsideMenu"
import { Todos, FilterProps, Todo, TodoInfo } from "../../src/types/components.types"

export default function TodoListPage() {
    const [todos, setTodos] = useState<Todos<Todo, TodoInfo>>({
        data: [],
        info: { all: 0, completed: 0, inWork: 0 },
        meta: { totalAmount: 0 } })
    const [filter, setFilter] = useState<FilterProps>('all')

    const fetchData = async () => {
        try {
            const data = await getTodos(filter);
            setTodos(data);
        } catch(error) {
            alert('Ошибка работы сервера.')              
        }
    }

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => {
          fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [filter])


    return <>
            <AsideMenu />
            <Space orientation="vertical" size="medium" style={{ display: 'flex', alignItems: 'center' }}>
                <AddTask fetchData={fetchData} />
                <FilterTask filter={filter} todos={todos} setFilter={setFilter} />
                <ListTasks fetchData={fetchData} todos={todos}  />
            </Space>
    </>
}