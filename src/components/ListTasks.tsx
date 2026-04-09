import TodoItem from "./TodoItem"
import { FetchDataProp, Todo, MetaResponse, TodoInfo } from "../types/todos.models.types"
import { Flex } from 'antd'
import { Dispatch, SetStateAction } from "react";

export interface ListTaskProps {
    fetchData: FetchDataProp, 
    todos: MetaResponse<Todo, TodoInfo>
    setIsNeedUpadete: Dispatch<SetStateAction<boolean>>,
}

export default function ListTasks({ fetchData, todos, setIsNeedUpadete }: ListTaskProps) {
    return (
        <Flex gap="medium" justify="center" vertical>
           {todos.data.map(item => {
            return (
                <TodoItem key={item.id} fetchData={fetchData} item={item} setIsNeedUpadete={setIsNeedUpadete}  />
            )})}
        </Flex>
    )
}