import '../css/TaskCard.css';
import { useTodo } from '../contexts/TodoContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TaskCard() {
    const {todo, setTodo, handleDone} = useTodo();
    const [sortCondition, setSortCondition] = useState("dateAdded")
    const [sortedTodo, setSortedTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true)

        let sorted = [];
        console.log(location.pathname);

        switch(location.pathname) {
            case "/": 
                sorted = [...todo].filter(a => 
                    a && new Date(a.due).getTime() > Date.now() && !a.isDone
                ); break;
            case "/missed": 
                sorted = [...todo].filter(a => 
                    a && new Date(a.due).getTime() < Date.now() && !a.isDone
                ); break;
            case "/completed":
                sorted = [...todo].filter(a => a.isDone === true);
        }

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

    const DueDate = ({date}) => {
        const due = new Date(date);
        return <p>{due.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</p>
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

            {isLoading ? <div>Loading...</div> : 
                <div>
                    {sortedTodo.map((t, i) => (
                        <div key={i} className={`task-card priority${t.priority}`}>
                            <div className='task-card-content'>
                                <b>{t.taskName}</b>
                                <p>{t.tag} - {priorityInWord(t.priority)}</p>
                                <DueDate date={t.due}/>
                            </div>
                            {location.pathname !== "/completed" && (
                                <button onClick={() => handleDone(t.id)}>Done</button>
                            )}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default TaskCard;