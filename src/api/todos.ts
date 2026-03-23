const API_URL = 'https://easydev.club/api/v1'
import { Todos, FilterProps, Todo, TodoInfo } from '../types/components.types'

export interface RequestBody {
    title?: string;
    isDone?: boolean;
}

export async function addTask(title: string): Promise<Todos<Todo, TodoInfo>> {
    try {
        const payload: RequestBody = {
            title,
            isDone: false
        };

        const response = await fetch(`${API_URL}/todos`, {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(payload) 
        })

        if(response.ok){
            const data: Todos<Todo, TodoInfo> = await response.json();
            return data;
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }     

    } catch (error) {     
        throw error;
    }
}

export async function deleteTask(taskId: number){
    try {
        const response = await fetch(`${API_URL}/todos/${taskId}`, {
        method: "DELETE", 
        })

        if(response.ok){
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
        const response = await fetch(`${API_URL}/todos/${taskId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            isDone: isDone,
            })
        })

        if(response.ok){
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
        const response = await fetch(`${API_URL}/todos?filter=${filter}`, {
            method: "GET", 
            })
        
        if(response.ok){
            const data: Todos<Todo, TodoInfo> = await response.json();
            return data;
        } else {
            throw new Error(`HTTP error ${response.status}`);
        } 
        
    } catch (error) {

        throw error;
    }
} 