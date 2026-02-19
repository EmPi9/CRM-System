export default async function editTask(taskId, inputValue, isDone, isChange) {
    isChange == false ? isDone = !isDone : isDone;
    
    try {
        let response = await fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: inputValue,
            isDone: !isDone,
            })
        })
    } catch {
        console.log(data)
    }
} 