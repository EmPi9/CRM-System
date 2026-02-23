const API_URL = 'https://easydev.club/api/v1'

export async function addTask (title) {
    try {
        const response = await fetch(`${API_URL}/todos`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
              "isDone": false,
              "title": title
          }) 
        })

        const data = await response.json();
        return data;
    } catch {
        return false
    }
}

export async function deleateTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/todos/${taskId}`, {
        method: "DELETE", 
        })
    } catch {
        return false
    }
}

export async function editTask(taskId, title, isDone) {
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
    } catch {
        return false
    }
}

export async function getTodos(filter) {
    try {
        const response = await fetch(`${API_URL}/todos?filter=${filter}`, {
            method: "GET", 
            })
        const result = await response.json()

        if(response.ok){
            return result
        }

        return [];
    } catch {
        return false
    }
} 