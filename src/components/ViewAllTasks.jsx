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

    const fetchData = async () => {
        try {
            const data = await updateTask();
            setDataTasks(data);
            console.log(data);
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
            await fetchData();
            setTaskTitle('');
        } catch {

        }
    }

    useEffect(() => {
        fetchData();
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
                fetchData()
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
                fetchData()
            }

        } catch (error) {
            console.log('Ошибка при удалении задачи:', error);
        } 
    }

    const countTask = (typeTask) => {
        if(typeTask == 'all'){
            return dataTasks.length
        } else if (typeTask == 'inWork')  {
            return dataTasks.filter(item => (item.isDone == false)).length
        } else if (typeTask == 'completed')  {
            return dataTasks.filter(item => (item.isDone == true)).length
        }
    }   

    const filteredTask = dataTasks.filter(item => {
        if(viewStatus == 'all'){
            return true;
        } else if(viewStatus == 'inWork') {
            return item.isDone == false
        } else if (viewStatus == 'completed'){
            return item.isDone == true
        } else {
            return true
        }
    }

    )

    return <>
        <div className="container">
            <input type="text" onChange={handleInputChange} value={taskTitle} placeholder="Задача" />
            <button onClick={handleSubmit} type="submit" className="butt">Создать</button>
        </div>

        <div className="container">
            <button className={viewStatus == 'all' ? "butt_status active" : "butt_status"} onClick={() => setViewStatus('all')}>Все ({countTask('all')})</button>
            <button className={viewStatus == 'inWork' ? "butt_status active" : "butt_status"} onClick={() => setViewStatus('inWork')}>В работе ({countTask('inWork')})</button>
            <button className={viewStatus == 'completed' ? "butt_status active" : "butt_status"} onClick={() => setViewStatus('completed')}>Сделано ({countTask('completed')})</button>
        </div>

        <div className="container">
           {filteredTask.map(item => {
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