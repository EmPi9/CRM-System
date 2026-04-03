const API_URL = 'https://easydev.club/api/v1'
import { MetaResponse, FilterProps, Todo, TodoInfo } from '../types/components.models.types'
import axios from 'axios';

export interface RequestBody {
    title?: string;
    isDone?: boolean;
}

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function addTask(title: string) {
    try {
        const payload: RequestBody = {
            title,
            isDone: false
        };

        const response = await apiClient.post<MetaResponse<Todo, TodoInfo>>(
            '/todos',
            payload
        )

        if(response.status >= 200 && response.status < 300){
            return response.data;
        }  

    } catch (error) {
        alert('Ошибка работы сервера.') 
        throw error;
    }
}

export async function deleteTask(taskId: number){
    try {
        await apiClient.delete(
            `/todos/${taskId}`
        )

    } catch (error) {
        alert('Ошибка работы сервера.')
        throw error;
    }
}

export async function editTask(taskId: number, title: string, isDone: boolean) {
    try {
        const editBodyRequest = {
            title,
            isDone
        }

        await apiClient.put(
            `/todos/${taskId}`,
            editBodyRequest
        )

    } catch (error) {
        alert('Ошибка работы сервера.')
        throw error;
    }
}

export async function getTodos(filter: FilterProps) {
    try {
        const response = await apiClient.get(
            `/todos`, {
                params: {
                    filter: filter
                }
            }
        )
        
        if(response.status >= 200 && response.status < 300){
            return response.data;
        }
        
    } catch (error) {
        alert('Ошибка работы сервера.')
        throw error;
    }
} 