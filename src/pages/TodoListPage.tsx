import { useCallback, useEffect, useState, useRef } from "react";
import { Space } from 'antd'
import { getTodos } from '../api/todos'
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import ListTasks from "../components/ListTasks";
import { MetaResponse, Filters, Todo, TodoInfo } from "../types/todos.models.types"

export default function TodoListPage() {
    const [todos, setTodos] = useState<MetaResponse<Todo, TodoInfo>>({
        data: [],
        info: { all: 0, completed: 0, inWork: 0 },
        meta: { totalAmount: 0 } })
    const [filter, setFilter] = useState<Filters>('all')
    const [isNeedUpdate, setIsNeedUpdate] = useState<boolean>(true)
    const filterRef = useRef<Filters>(filter);

    useEffect(() => {
        filterRef.current = filter;
        fetchData();
    }, [filter])


    const fetchData = useCallback(async (): Promise<void> => {
        const data = await getTodos(filterRef.current);
        setTodos(data);
    }, [])

    useEffect(() => {
        if(isNeedUpdate === true){
            
            const intervalId = setInterval(() => {
              fetchData();
            }, 5000);

            return () => clearInterval(intervalId);
        }

    }, [isNeedUpdate])

    return <>
            <Space orientation="vertical" size="medium" className="main">
                <AddTask fetchData={fetchData} />
                <FilterTask filter={filter} todos={todos} setFilter={setFilter} />
                <ListTasks fetchData={fetchData} todos={todos} setIsNeedUpdate={setIsNeedUpdate}  />
            </Space>
    </>
}