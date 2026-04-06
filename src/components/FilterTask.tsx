import Button from "../ui/Button/Button"
import { Flex } from 'antd'
import { Dispatch, SetStateAction } from "react";
import { MetaResponse, Todo, TodoInfo, Filters } from '../types/components.models.types'
export interface FilterTaskProps {
    filter: Filters, 
    todos: MetaResponse<Todo, TodoInfo>, 
    setFilter: Dispatch<SetStateAction<Filters>>,
}


export default function FilterTask({ filter, todos, setFilter }: FilterTaskProps) {

    const handleChangeFilter = (filter: Filters) => {
        setFilter(filter);
    }

    return (
        <Flex gap="medium" justify="center">
            <Button color={`${filter === 'all' ? 'blue' : 'default'}`} type="text" variant="text" onClick={() => handleChangeFilter('all')}>Все ({todos.info.all})</Button>
            <Button color={`${filter === 'inWork' ? 'blue' : 'default'}`} type="text" variant="text" onClick={() => handleChangeFilter('inWork' )}>В работе ({todos.info.inWork})</Button>
            <Button color={`${filter === 'completed' ? 'blue' : 'default'}`} type="text" variant="text"  onClick={() => handleChangeFilter('completed')}>Сделано ({todos.info.completed})</Button>
        </Flex> 
    )
}