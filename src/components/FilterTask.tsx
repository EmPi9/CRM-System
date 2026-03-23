import Tab from "../ui/Tab/Tab";
import { Dispatch, SetStateAction } from "react";
import { Todos, Todo, TodoInfo, FilterProps } from '../types/components.types'
export interface FilterTaskProps {
    filter: FilterProps, 
    todos: Todos<Todo, TodoInfo>, 
    setFilter: Dispatch<SetStateAction<FilterProps>>,
}


export default function FilterTask({ filter, todos, setFilter }: FilterTaskProps) {

    const handleChangeFilter = (filter: FilterProps) => {
        setFilter(filter);
    }

    return (
        <div className="container">
            <Tab active={`${filter === 'all' ? 'active' : ''}`} onClick={() => handleChangeFilter('all')}>Все ({todos.info.all})</Tab>
            <Tab active={`${filter === 'inWork' ? 'active' : ''}`} onClick={() => handleChangeFilter('inWork' )}>В работе ({todos.info.inWork})</Tab>
            <Tab active={`${filter === 'completed' ? 'active' : ''}`}  onClick={() => handleChangeFilter('completed')}>Сделано ({todos.info.completed})</Tab>
        </div> 
    )
}