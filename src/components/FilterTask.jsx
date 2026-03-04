import Tab from "../ui/Tab/Tab";

export default function FilterTask({ filter, todos, setFilter }) {

    const handleChangeFilter = async (filter) => {
        await setFilter(filter);
    }

    return (
        <div className="container">
            <Tab active={`${filter === 'all' ? 'active' : ''}`} onClick={() => handleChangeFilter('all')}>Все ({todos.info.all})</Tab>
            <Tab active={`${filter === 'inWork' ? 'active' : ''}`} onClick={() => handleChangeFilter('inWork')}>В работе ({todos.info.inWork})</Tab>
            <Tab active={`${filter === 'completed' ? 'active' : ''}`}  onClick={() => handleChangeFilter('completed')}>Сделано ({todos.info.completed})</Tab>
        </div> 
    )
}