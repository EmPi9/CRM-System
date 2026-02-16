export default async function updateTask(status) {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`, {
            method: "GET", 
            })
        const result = await response.json()

        if(response.ok && (result.length !== 0)){
            return result.data
        }

        return [];
    } catch {
        console.log(error)
    }
} 