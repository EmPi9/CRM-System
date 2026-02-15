export default async function AddTask (taskTitle) {
    const spaces = checkSpaces(taskTitle);
    if(!spaces){
        alert("Ошибка валидации. Введите пожалуйста название задачи заново.");
        return
    }
    if (taskTitle.length <= 2) {
        alert("Минимальная длина текста 2 символа");
        return
    } else if (taskTitle.length > 64) {
        alert("Максимальная длина текста 64 символа");
        return
    }

    function checkSpaces(str) {
        return str.trim() !== '';
    }

    try {
        const response = await fetch("https://easydev.club/api/v1/todos", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
              "isDone": false,
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