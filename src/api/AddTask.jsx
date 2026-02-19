import ValidateInput from '../helpers/validateInput'

export default async function addTask (taskTitle) {
    const validate = ValidateInput(taskTitle);
     
    if(validate == false){
        return
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