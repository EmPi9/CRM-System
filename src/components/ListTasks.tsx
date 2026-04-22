import TodoItem from "./TodoItem"
import { FetchDataProp, Todo, MetaResponse, TodoInfo } from "../types/todos.models.types"
import { Flex } from 'antd'
import { Dispatch, SetStateAction } from "react";

interface ListTaskProps {
    fetchData: FetchDataProp, 
    todos: MetaResponse<Todo, TodoInfo>
    setIsNeedUpdate: Dispatch<SetStateAction<boolean>>,
}

export default function ListTasks({ fetchData, todos, setIsNeedUpdate }: ListTaskProps) {
    return (
        <Flex gap="medium" justify="center" vertical>
           {todos.data.map(item => {
            return (
                <TodoItem key={item.id} fetchData={fetchData} item={item} setIsNeedUpdate={setIsNeedUpdate}  />
            )})}
        </Flex>
    )
}