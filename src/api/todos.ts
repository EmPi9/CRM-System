import { MetaResponse, Filters, Todo, TodoInfo } from '../types/todos.models.types'
import axios, { AxiosResponse }  from 'axios';

const API_URL = 'https://easydev.club/api/v1'

interface RequestBody {
    title?: string;
    isDone?: boolean;
}

type EditTaskBody = {
    title: string,
    isDone: boolean
}

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



export async function addTask(title: string) {
        const payload: RequestBody = {
            title,
            isDone: false
        };

        const response = await apiClient.post<MetaResponse<Todo, TodoInfo>>(
            '/todos',
            payload
        )

        return response.data;
}


export async function deleteTask(taskId: number): Promise<string> {
        const response = await apiClient.delete(
            `/todos/${taskId}`
        )

        return response.data;
}

export async function editTask(taskId: number, title: string, isDone: boolean): Promise<Todo | string> {
        const editBodyRequest: EditTaskBody = { title, isDone };

        const response = await apiClient.put<Todo, AxiosResponse<Todo>>(
            `/todos/${taskId}`,
            editBodyRequest
        )

        return response.data;

}

export async function getTodos(filter: Filters): Promise<Todo |string>  {

        const response = await apiClient.get(
            `/todos`, {
                params: {
                    filter: filter
                }
            }
        )
        return response.data;

} 