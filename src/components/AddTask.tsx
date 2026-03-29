import { useState } from "react" 
import { addTask } from '../api/todos'
import validateInput from '../helpers/validateInput'
import Button from "../ui/Button/Button"
import Input from "../ui/Input/Input"

export interface FetchDataProps {
    fetchData: () => Promise<void>;
}

export default function AddTask({ fetchData }: FetchDataProps) {
    const [taskTitle, setTaskTitle] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

            try {
                await addTask(taskTitle);
            } catch(error) {             
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
                <Button type="submit">Создать</Button>
            </div>
        </form>
    )
}