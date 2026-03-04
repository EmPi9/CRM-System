import TodoItem from "./TodoItem"

export default function ListTasks({ fetchData, todos }) {
    return (
        <div className="container">
           {todos.data.map(item => {
            return (
                <TodoItem key={item.id} fetchData={fetchData} item={item}  />
            )})}
        </div>
    )
}