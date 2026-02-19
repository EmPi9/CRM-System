export default function FilterTask({ viewStatus, counts, fetchData, setViewStatus }) {

    
    const updateTasks = (viewStatus) => {
        setViewStatus(viewStatus)
        fetchData(viewStatus);
    }

    return <>
        <div className="container">
            <button className={viewStatus == 'all' ? "butt_status active" : "butt_status"} onClick={() => updateTasks('all')}>Все ({counts[0]})</button>
            <button className={viewStatus == 'inWork' ? "butt_status active" : "butt_status"} onClick={() => updateTasks('inWork')}>В работе ({counts[1]})</button>
            <button className={viewStatus == 'completed' ? "butt_status active" : "butt_status"} onClick={() => updateTasks('completed')}>Сделано ({counts[2]})</button>
        </div> 
    </>;
}