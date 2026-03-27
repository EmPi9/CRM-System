const API_URL = 'https://easydev.club/api/v1'
import { Todos, FilterProps, Todo, TodoInfo } from '../types/components.types'
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

export async function addTask(title: string): Promise<Todos<Todo, TodoInfo>> {
    try {
        const payload: RequestBody = {
            title,
            isDone: false
        };

        const response = await apiClient.post<Todos<Todo, TodoInfo>>(
            '/todos',
            payload
        )

        if(response.status >= 200 && response.status < 300){
            return response.data;
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }     

    } catch (error) {     
        throw error;
    }
}

export async function deleteTask(taskId: number){
    try {
        const response = await apiClient.delete(
            `/todos/${taskId}`
        )

        if(response.status >= 200 && response.status < 300){
            return
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }

    } catch (error) {
        throw error;
    }
}

export async function editTask(taskId: number, title: string, isDone: boolean) {
    try {
        const editBodyRequest = {
            title,
            isDone
        }

        const response = await apiClient.put(
            `/todos/${taskId}`,
            editBodyRequest
        )

        if(response.status >= 200 && response.status < 300){
            return
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }

    } catch (error) {
        throw error;
    }
}

export async function getTodos(filter: FilterProps): Promise<Todos<Todo, TodoInfo>> {
    try {
        const response = await apiClient.get(
            `/todos?filter=${filter}`
        )
        
        if(response.status >= 200 && response.status < 300){
            return response.data;
        } else {
            throw new Error(`HTTP error ${response.status}`);
        } 
        
    } catch (error) {

        throw error;
    }
} 