import Tab from "../ui/Tab";

export default function FilterTask({ filter, todos, setFilter }) {

    const handleChangeFilter = async (filter) => {
        await setFilter(filter);
    }

    return (
        <div className="container">
            <Tab className={`button_status ${filter === 'all' ? 'active' : ''}`} onClick={() => handleChangeFilter('all')}>Все ({todos.info.all})</Tab>
            <Tab className={`button_status ${filter === 'inWork' ? 'active' : ''}`} onClick={() => handleChangeFilter('inWork')}>В работе ({todos.info.inWork})</Tab>
            <Tab className={`button_status ${filter === 'completed' ? 'active' : ''}`} onClick={() => handleChangeFilter('completed')}>Сделано ({todos.info.completed})</Tab>
        </div> 
    )
}