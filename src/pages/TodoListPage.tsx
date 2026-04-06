import { useEffect, useState } from "react";
import { Space } from 'antd'
import { getTodos } from '../api/todos'
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import ListTasks from "../components/ListTasks";
import AsideMenu from "../components/AsideMenu"
import { MetaResponse, Filters, Todo, TodoInfo } from "../types/components.models.types"

export default function TodoListPage() {
    const [todos, setTodos] = useState<MetaResponse<Todo, TodoInfo>>({
        data: [],
        info: { all: 0, completed: 0, inWork: 0 },
        meta: { totalAmount: 0 } })
    const [filter, setFilter] = useState<Filters>('all')
    const [isNeedUpdate, setIsNeedUpadete] = useState<boolean>(true)

    const fetchData = async () => {
        try {
            const data = await getTodos(filter);
            setTodos(data);
        } catch(error) {
            return             
        }
    }

    useEffect(() => {
        fetchData();
        if(isNeedUpdate === true){
            
            const intervalId = setInterval(() => {
              fetchData();
            }, 5000);

            return () => clearInterval(intervalId);
        }

    }, [filter, isNeedUpdate])


    return <>
            <AsideMenu />
            <Space orientation="vertical" size="medium" style={{ display: 'flex', alignItems: 'center' }}>
                <AddTask fetchData={fetchData} />
                <FilterTask filter={filter} todos={todos} setFilter={setFilter} />
                <ListTasks fetchData={fetchData} todos={todos} setIsNeedUpadete={setIsNeedUpadete}  />
            </Space>
    </>
}