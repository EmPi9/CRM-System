import { useState } from "react" 
import { addTask } from '../api/todos'
import validateInput from '../helpers/validateInput'
import responseToClient from '../helpers/responseToClient'
import Button from "../ui/Button"
import Input from "../ui/Input"


export default function AddTask({ fetchData }) {
    const [taskTitle, setTaskTitle] = useState('')

    const handleInputChange = (e) => {
        setTaskTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validate = validateInput(taskTitle);
            
     
            if(validate === 'spaces'){
                alert("Ошибка валидации. Введите пожалуйста название задачи заново.");
                return 
            }
            if (validate === '<2') {
                alert("Минимальная длина текста 2 символа");
                return 
            } else if (validate === '>64') {
                alert("Максимальная длина текста 64 символа");
                return 
            }
            
            const data = await addTask(taskTitle);

            const check = responseToClient(data);
            if(check === false){
                alert('Ошибка работы сервера.')
                return
            }


            await fetchData();
            setTaskTitle('');
        } catch {

        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <Input onChange={handleInputChange} value={taskTitle} placeholder="Задача" />
                <Button type="submit" className="button">Создать</Button>
            </div>
        </form>
    )
}