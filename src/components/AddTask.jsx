import addTask from "../api/AddTask";


export default function AddTask({ taskTitle, setTaskTitle, fetchData, viewStatus }) {

    const handleInputChange = (e) => {
        setTaskTitle(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const data = await addTask(taskTitle);
            await fetchData(viewStatus);

            setTaskTitle('');
        } catch {
            console.log('ошибка')
        }
    }


    return <>
        <div className="container">
            <input type="text" onChange={handleInputChange} value={taskTitle} placeholder="Задача" />
            <button onClick={handleSubmit} type="submit" className="butt">Создать</button>
        </div>
    </>
}