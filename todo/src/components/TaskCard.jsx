import '../css/TaskCard.css';
import { useTodo } from '../contexts/TodoContext';
import { useState, useEffect } from 'react';

function TaskCard() {

    const {todo, setTodo} = useTodo();
    const [sortCondition, setSortCondition] = useState("dateAdded")
    const [sortedTodo, setSortedTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)

        let sorted = [...todo];

        switch (sortCondition) {
            case "dueDate":
                sorted.sort((a, b) => new Date(a.due) - new Date(b.due)); break;
            case "priority":
                sorted.sort((a, b) => a.priority - b.priority);
                break;
            case "dateAdded":
                break;
        }

        setSortedTodo(sorted);
        setIsLoading(false);
    }, [sortCondition, todo])

    const handleDone = (index) => {
        setTodo(prev => prev.filter((_, i) => i !== index));
    }

    const DueDate = ({date}) => {
        const due = new Date(date);
        return <p>{due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
    }

    function priorityInWord(level) {
        switch (Number(level)) {
            case 3: return "Low";
            case 2: return "Medium";
            case 1: return "High";
        }
    }

    console.log("todo: ", todo)

    return (
        <div className="task-div">
            <div>
                Filter by: 
                <select value={sortCondition} onChange={(e) => setSortCondition(e.target.value)}>
                    <option value="dateAdded">Date added</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
            <p>sort condition: {sortCondition}</p>
            {isLoading ? <div>Loading...</div> : 
                <div>
                    {sortedTodo.map((t, i) => (
                        <div key={i} className={`task-card priority${t.priority}`}>
                            <div className='task-card-content'>
                                <b>{t.taskName}</b>
                                <p>{t.tag} - {priorityInWord(t.priority)}</p>
                                <DueDate date={t.due}/>
                            </div>
                            <button onClick={() => handleDone(i)}>Done</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default TaskCard;