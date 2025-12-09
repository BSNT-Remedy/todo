import '../css/TaskCard.css';
import { useTodo } from '../contexts/TodoContext';
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ConfirmModal from '../modals/ConfirmModal';

function TaskCard() {
    const {
        todo, setTodo, 
        handleDone, handleDelete, 
        showConfirmModal, setShowConfirmModal,
        currentTask, setCurrentTask,
    } = useTodo();

    const [sortCondition, setSortCondition] = useState("dateAdded")
    const location = useLocation();

    const sortedTodo = useMemo(() => {
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

        return sorted
    }, [sortCondition, todo])

    function DueDate({date}) {
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

            <div>
                {sortedTodo.map((t, i) => (
                    <div key={t.id} className={`task-card priority${t.priority}`}>
                        <div className='task-card-content'>
                            <b>{t.taskName}</b>
                            <p>{t.tag} - {priorityInWord(t.priority)}</p>
                            <DueDate date={t.due}/>
                        </div>
                        <div className="buttons">
                            {/* {location.pathname !== "/completed" ? (
                                <button onClick={() => handleDone(t.id)}>Done</button>
                            ) : (
                                <button onClick={() => handleDone(t.id)}>Undo</button>
                            )} */}
                            <button onClick={() => handleDone(t.id)}>
                                {location.pathname === "/completed" 
                                    ? "Undo" : "Done"
                                }
                            </button>
                            <button onClick={() => (
                                setShowConfirmModal(true),
                                setCurrentTask(t)
                            ) }>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {showConfirmModal && <ConfirmModal/>}
        </div>
    )
}

export default TaskCard;