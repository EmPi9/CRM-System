export default async function AddTask (taskTitle) {
    if (taskTitle.length <= 2) {
        alert("Минимальная длина текста 2 символа");
        return
    } else if (taskTitle.length > 64) {
        alert("Максимальная длина текста 64 символа");
        return
    }

    try {
        const response = await fetch("https://easydev.club/api/v1/todos", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
              "isDone": true,
              "title": taskTitle
          }) 
        })

        const data = await response.json();
        console.log('Задача добавлена:', data);
        return data;
    } catch {
        console.log("ошибка")
    }


}