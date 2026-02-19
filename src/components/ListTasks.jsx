import { useState } from "react";
import iconEdit from "../assets/icons/fi-rr-edit.svg"
import iconTrash from "../assets/icons/fi-rs-trash.svg"
import deleateTask from "../api/deleateTask"
import editTask from "../api/editTask"
import ValidateInput from "../helpers/validateInput";

export default function ListTasks({ fetchData, dataTasks, viewStatus }) {
    const [editingId, setEditingId] = useState(null)
    const [inputValue, setInputValue] = useState('')

    const handleDeleate = async (taskId) =>  {
        const data = await deleateTask(taskId);
        await fetchData(viewStatus);
    }
    
    const startEditing = (id, title) => {
        setEditingId(id);
        setInputValue(title);
    }

    const saveEditings = async (taskId, taskDone) =>  {
        const validate = ValidateInput(inputValue);
        
        if(validate == false){
            return
        }

        await editTask(taskId, inputValue, taskDone, false);
        await fetchData(viewStatus);
        setEditingId(null)
    }

    const completeTask = async (taskId, taskTitle, taskDone) => {
        await editTask(taskId, taskTitle, taskDone);
        await fetchData(viewStatus);
    }

    return <>
        <div className="container">
           {dataTasks.map(item => {
            return (
                 <div key={item.id} className="task">
                    <input type="checkbox" className="round-checkbox" checked={item.isDone} onChange={() => completeTask(item.id, item.title, item.isDone)}  />
                    { editingId === item.id 
                    ? (<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />) 
                    : (<div className={item.isDone == true ? 'completed' : 'opened'}>{item.title}</div>) 
                    }
                    <div className="task-butts">
                        { editingId === item.id 
                        ? ( <><button className="butt" onClick={() => saveEditings(item.id, item.isDone)}>Сохранить</button> 
                            <button className="butt red" onClick={() => setEditingId(null)}>Отмена</button> </>)
                        : (<><button className="icon" onClick={() => startEditing(item.id, item.title)}><img src={iconEdit} alt="edit" /></button>
                            <button className="icon" onClick={() => handleDeleate(item.id)}><img src={iconTrash} alt="trash" /></button> </>) 
                        }
                    </div> 
                </div>
            )})}
        </div>
    </>
}