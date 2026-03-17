import { Dispatch, SetStateAction } from "react";

export interface FetchDataProps {
    fetchData: () => Promise<void>;
}

export type FetchDataProp = () => Promise<void>;

export type Color = 'primary' | 'secondary' | 'danger';

export type FilterProps = 'all' | 'inWork' | 'completed';

export type Size = 'large' | 'small';

export type Task = {
    created: string,
    id: number,
    isDone: boolean,
    title: string
}

export type Todos = {
        data: Task[],
        info: { all: number, 
                completed: number, 
                inWork: number },
        meta: { totalAmount: number } 
};


export interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: Size; 
    color?: Color; 
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
}

export interface InputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    placeholder?: string;
}


export interface TabProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>, 
    color?: Color,  
    active: String, 
    children: React.ReactNode,
}

export interface FilterTaskProps {
    filter: FilterProps, 
    todos: Todos, 
    setFilter: Dispatch<SetStateAction<FilterProps>>,
}

export interface ListTaskProps {
    fetchData: FetchDataProp, 
    todos: Todos
}

export interface CheckBoxProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>, 
    color?: Color,  
    checked: boolean 
}

export interface TodoItemProps {
     fetchData: FetchDataProp,
     item: Task
}

export interface IconButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>, 
    type?: "submit" | "reset" | "button", 
    icon: string, 
    size?: Size, 
    color?: Color,  
}


