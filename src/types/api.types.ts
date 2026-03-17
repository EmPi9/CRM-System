export interface RequestBody {
    title?: string;
    isDone?: boolean;
}

export interface ResponseTodo {
    created: string;
    id: number;
    isDone: boolean;
    title: string;
}