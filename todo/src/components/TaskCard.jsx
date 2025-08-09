import '../css/TaskCard.css';
import { useTodo } from '../contexts/TodoContext';

function TaskCard() {

    const {todo, setTodo} = useTodo();

    const sortedByDate = [...todo].sort((a, b) => new Date(a.due) - new Date(b.due));

    console.log("date mo to: " , sortedByDate);
    console.log("todo: ", todo)

    const handleDone = (index) => {
        console.log("nag run ba to")
        setTodo(prev => prev.filter((_, i) => i !== index));
    }

    const DueDate = ({date}) => {
        const due = new Date(date);
        console.log(due)
        return <p>{due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
    }

    return (
        <div className="task-div">
            {sortedByDate.map((t, i) => (
            <div key={i} className={`task-card ${t.priority}`}>
                <div className='task-card-content'>
                    <b>{t.taskName}</b>
                    <p>{t.tag} - {t.priority}</p>
                    <DueDate date={t.due}/>
                </div>
                <button onClick={() => handleDone(i)}>Done</button>
            </div>
            ))}
        </div>
    )
}

export default TaskCard;