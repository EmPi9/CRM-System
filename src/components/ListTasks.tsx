import TodoItem from "./TodoItem"
import { FetchDataProp, Todo, MetaResponse, TodoInfo } from "../../src/types/components.types"
import { Flex } from 'antd'
import { Dispatch, SetStateAction } from "react";

export interface ListTaskProps {
    fetchData: FetchDataProp, 
    todos: MetaResponse<Todo, TodoInfo>
    setNeedUpadete: Dispatch<SetStateAction<boolean>>,
}

export default function ListTasks({ fetchData, todos, setNeedUpadete }: ListTaskProps) {
    return (
        <Flex gap="medium" justify="center" vertical>
           {todos.data.map(item => {
            return (
                <TodoItem key={item.id} fetchData={fetchData} item={item} setNeedUpadete={setNeedUpadete}  />
            )})}
        </Flex>
    )
}