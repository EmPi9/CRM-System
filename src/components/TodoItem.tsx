import { useState } from "react";
import { deleateTask, editTask } from '../api/todos'
import CheckBox from '../ui/CheckBox/CheckBox'
import IconButton from '../ui/IconButton/IconButton'
import iconEdit from "../assets/icons/fi-rr-edit.svg"
import iconTrash from "../assets/icons/fi-rs-trash.svg"
import iconAdd from '../assets/icons/fi-rr-add.svg'
import iconCross from '../assets/icons/fi-rr-cross.svg'
import validateInput from "../helpers/validateInput";
import responseToClient from '../helpers/responseToClient'
import { TodoItemProps } from "../../src/types/components.types"


export default function TodoItem({ fetchData, item }: TodoItemProps) {
    const [editing, setEditing] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleDeleate = async (taskId: number) =>  {
        const data = await deleateTask(taskId);

        const check = responseToClient(data);
        if(check === false){
            alert('Ошибка работы сервера.')
            return
        }

        fetchData();
    }
    
    const handleStartEditing = (title: string) => {
        setEditing(true);
        setInputValue(title);
    }

    const handleSaveEditings = async (taskId: number, taskDone: boolean) =>  {
        const validate = validateInput(inputValue);

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

        const data = await editTask(taskId, inputValue, taskDone);

        const check = responseToClient(data);
        if(check === false){
            alert('Ошибка работы сервера.')
            return
        }
        await fetchData();
        setEditing(false)
    }

    const handleCompleteTask = async (taskId: number, taskTitle: string, taskDone: boolean) => {
        taskDone = !taskDone
        const data = await editTask(taskId, taskTitle, taskDone);

        const check = responseToClient(data);
        if(check === false){
            alert('Ошибка работы сервера.')
            return
        }
        await fetchData();
    }

    return (
        <div key={item.id} className="task">
            <CheckBox checked={item.isDone} onChange={() => handleCompleteTask(item.id, item.title, item.isDone)}  />
            { editing === true 
            ? (<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />) 
            : (<div className={item.isDone == true ? 'completed' : 'opened'}>{item.title}</div>) 
            }
            <div className="task-butts">
                { editing === true 
                ? ( <><IconButton onClick={() => handleSaveEditings(item.id, item.isDone)} icon={iconAdd} />
                <IconButton onClick={() => setEditing(false)} icon={iconCross} /> </>)
                : (<><IconButton onClick={() => handleStartEditing(item.title)} icon={iconEdit} />
                    <IconButton color="danger" onClick={() => handleDeleate(item.id)} icon={iconTrash}  /> </>) 
                }
            </div> 
        </div> 
    );
}