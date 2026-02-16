import { useEffect, useState } from "react";
import iconEdit from "../assets/icons/fi-rr-edit.svg"
import iconTrash from "../assets/icons/fi-rs-trash.svg"
import AddTask from "../api/AddTask";
import updateTask from "../api/updateTask";

export default function ViewAllTasks() {
    const [dataTasks, setDataTasks] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [viewStatus, setViewStatus] = useState('all')
    const [counts, setCounts] = useState([]);

    const fetchData = async (viewStatus) => {
        try {
            const data = await updateTask(viewStatus);
            const tasksCount = await updateTask();
            
            setCounts([
                tasksCount.length,
                tasksCount.filter(task => !task.isDone).length,
                tasksCount.filter(task => task.isDone).length
              ]);
            
            setDataTasks(data);
        } catch (err) {
            console.log('ошибка')
        }
    }

    const handleInputChange = (e) => {
        setTaskTitle(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const data = await AddTask(taskTitle);
            await fetchData(viewStatus);
            setTaskTitle('');
        } catch {
            console.log(data)
        }
    }

    useEffect(() => {
        fetchData(viewStatus);
    }, [])

    const handleDeleate = async (taskId) =>  {
        try {
            let response = await fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
            method: "DELETE", 
            })
        } catch {
            console.log(data)
        }

        fetchData();
    }

    const startEditing = (id, title) => {
        setEditingId(id);
        setInputValue(title);
    }

    const saveEditings = async (taskId) =>  {
        const spaces = checkSpaces(inputValue);

        if(!spaces){
            alert("Ошибка валидации. Введите пожалуйста название задачи заново.");
            return
        }
        if (inputValue.length <= 2) {
            alert("Минимальная длина текста 2 символа");
            return
        } else if (inputValue.length > 64) {
            alert("Максимальная длина текста 64 символа");
            return
        }

        function checkSpaces(str) {
            return str.trim() !== '';
        }

        try {
            let response = await fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: inputValue,
                completed: false
                })
            })

            if(response.ok) {
                fetchData(viewStatus)
            }

        } catch {
            console.log(data)
        }
        setEditingId(null)
    }

    const completeTask = async (taskId, taskTitle, taskDone) => {
        try {
            let response = await fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: taskTitle,
                completed: true,
                isDone: !taskDone
                })
            })

            if(response.ok) {
                fetchData(viewStatus)
            }

        } catch (error) {
            console.log('Ошибка при удалении задачи:', error);
        } 
    }

    const updateTasks = (viewStatus) => {
        setViewStatus(viewStatus)
        fetchData(viewStatus);
    }

    return <>
        <div className="container">
            <input type="text" onChange={handleInputChange} value={taskTitle} placeholder="Задача" />
            <button onClick={handleSubmit} type="submit" className="butt">Создать</button>
        </div>

        <div className="container">
            <button className={viewStatus == 'all' ? "butt_status active" : "butt_status"} onClick={() => updateTasks('all')}>Все ({counts[0]})</button>
            <button className={viewStatus == 'inWork' ? "butt_status active" : "butt_status"} onClick={() => updateTasks('inWork')}>В работе ({counts[1]})</button>
            <button className={viewStatus == 'completed' ? "butt_status active" : "butt_status"} onClick={() => updateTasks('completed')}>Сделано ({counts[2]})</button>
        </div>

        <div className="container">
           {dataTasks.map(item => {
            if(viewStatus) {
                return <>
                 <div key={item.id} className="task">
                    <input type="checkbox" className="round-checkbox" checked={item.isDone} onChange={() => completeTask(item.id, item.title, item.isDone)}  />
                    { editingId === item.id 
                    ? (<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />) 
                    : (<div className={item.isDone == true ? 'completed' : 'opened'}>{item.title}</div>) 
                    }
                    <div className="task-butts">
                        { editingId === item.id 
                        ? ( <><button className="butt" onClick={() => saveEditings(item.id)}>Сохранить</button> 
                            <button className="butt red" onClick={() => setEditingId(null)}>Отмена</button> </>)
                        : (<><button className="icon" onClick={() => startEditing(item.id, item.title)}><img src={iconEdit} alt="edit" /></button>
                            <button className="icon" onClick={() => handleDeleate(item.id)}><img src={iconTrash} alt="trash" /></button> </>) 
                        }
                    </div> 
                </div>
            </>
            }})}
        </div>
    </>
}