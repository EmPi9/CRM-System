import TodoItem from "./TodoItem"
import { FetchDataProp, Todo, MetaResponse, TodoInfo } from "../../src/types/components.types"
import { Flex } from 'antd'

export interface ListTaskProps {
    fetchData: FetchDataProp, 
    todos: MetaResponse<Todo, TodoInfo>
}

export default function ListTasks({ fetchData, todos }: ListTaskProps) {
    return (
        <Flex gap="medium" justify="center" vertical>
           {todos.data.map(item => {
            return (
                <TodoItem key={item.id} fetchData={fetchData} item={item}  />
            )})}
        </Flex>
    )
}