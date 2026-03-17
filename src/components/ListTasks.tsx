import TodoItem from "./TodoItem"
import { ListTaskProps } from "../../src/types/components.types"

export default function ListTasks({ fetchData, todos }: ListTaskProps) {
    return (
        <div className="container">
           {todos.data.map(item => {
            return (
                <TodoItem key={item.id} fetchData={fetchData} item={item}  />
            )})}
        </div>
    )
}