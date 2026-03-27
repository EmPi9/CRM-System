import Button from "../ui/Button/Button"
import { Flex } from 'antd'
import { Dispatch, SetStateAction } from "react";
import { MetaResponse, Todo, TodoInfo, FilterProps } from '../types/components.types'
export interface FilterTaskProps {
    filter: FilterProps, 
    todos: MetaResponse<Todo, TodoInfo>, 
    setFilter: Dispatch<SetStateAction<FilterProps>>,
}


export default function FilterTask({ filter, todos, setFilter }: FilterTaskProps) {

    const handleChangeFilter = (filter: FilterProps) => {
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