import '../css/TaskCard.css';

function TaskCard({todo, setTodo}) {
    const handleDone = (index) => {
        console.log("nag run ba to")
        setTodo(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="task-div">
            {todo.map((t, i) => (
            <div key={i} className={`task-card ${t.priority}`}>
                <div className='task-card-content'>
                    <b>{t.taskName}</b>
                    <p>{t.tag} - {t.priority}</p>
                </div>
                <button onClick={() => handleDone(i)}>Done</button>
            </div>  
            ))}
        </div>
    )
}

export default TaskCard;