import { useState } from "react";
import { deleateTask, editTask } from '../api/todos'
import CheckBox from '../ui/CheckBox'
import IconButton from '../ui/IconButton'
import iconEdit from "../assets/icons/fi-rr-edit.svg"
import iconTrash from "../assets/icons/fi-rs-trash.svg"
import iconAdd from '../assets/icons/fi-rr-add.svg'
import iconCross from '../assets/icons/fi-rr-cross.svg'
import validateInput from "../helpers/validateInput";
import responseToClient from '../helpers/responseToClient'


export default function TodoItem({ fetchData, item }) {
    const [editingId, setEditingId] = useState(null)
    const [inputValue, setInputValue] = useState('')

    const handleDeleate = async (taskId) =>  {
        const data = await deleateTask(taskId);

        const check = responseToClient(data);
        if(check === false){
            alert('Ошибка работы сервера.')
            return
        }
        await fetchData();
    }
    
    const handleStartEditing = (id, title) => {
        setEditingId(id);
        setInputValue(title);
    }

    const handleSaveEditings = async (taskId, taskDone) =>  {
        const validate = validateInput(inputValue);
        const data = await editTask(taskId, inputValue, taskDone);
        
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

        const check = responseToClient(data);
        if(check === false){
            alert('Ошибка работы сервера.')
            return
        }
        await fetchData();
        setEditingId(null)
    }

    const handleCompleteTask = async (taskId, taskTitle, taskDone) => {
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
            <CheckBox type="checkbox" className="round-checkbox" checked={item.isDone} onChange={() => handleCompleteTask(item.id, item.title, item.isDone)}  />
            { editingId === item.id 
            ? (<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />) 
            : (<div className={item.isDone == true ? 'completed' : 'opened'}>{item.title}</div>) 
            }
            <div className="task-butts">
                { editingId === item.id 
                ? ( <><IconButton onClick={() => handleSaveEditings(item.id, item.isDone)} icon={iconAdd} />
                <IconButton onClick={() => setEditingId(null)} icon={iconCross} /> </>)
                : (<><IconButton onClick={() => handleStartEditing(item.id, item.title)} icon={iconEdit} />
                    <IconButton className='trash' onClick={() => handleDeleate(item.id)} icon={iconTrash}  /> </>) 
                }
            </div> 
        </div> 
    );
}