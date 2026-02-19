export default async function deleateTask(taskId) {
        try {
            let response = await fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
            method: "DELETE", 
            })
        } catch {
            console.log(data)
        }
}