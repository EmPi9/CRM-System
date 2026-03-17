const API_URL = 'https://easydev.club/api/v1'
import { RequestBody, ResponseTodo } from '../types/api.types';

export async function addTask(title: string) {
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
            const data: ResponseTodo = await response.json();
            return data;
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }     

    } catch (error) {
        console.error(error);
        return false
    }
}

export async function deleateTask(taskId: number) {
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
        console.error(error);
        return false
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
        console.error(error);
        return false
    }
}

export async function getTodos(filter: string) {
    try {
        const response = await fetch(`${API_URL}/todos?filter=${filter}`, {
            method: "GET", 
            })
        
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error(`HTTP error ${response.status}`);
        } 
        
    } catch (error) {
        console.error(error);
        return false
    }
} 