import '../css/TodoModal.css'
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TaskModal({ isOpen, onClose }) {
    if(!isOpen) return null;

    const {setTodo} = useTodo();
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");
    const [prio, setPrio] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        console.log('nag run to')
        if(!task || !tag || !prio) return;
        setTodo(prev => [...prev, {taskName: task, tag: tag, priority: prio, due: date}]);
    
        setTask(prev => prev = "");
        setPrio(prev => prev = "");
        setDate(prev => prev = "");
        onClose();
    }

    return <div className="todo-modal"
        onClick={(e) => e.target === e.currentTarget && onClose()} 
        >

        <div className='todo-inputs'>
            <div>
                <label>Task Name</label>
                <input 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)} placeholder='Enter task name...'
                    className='todo-inputs-style'
                    autoFocus
                />
            </div>

            <div>
                <label>Tag</label>
                <select 
                    value={tag} 
                    onChange={(e) => setTag(e.target.value)}
                    className='todo-inputs-style'
                >
                    <option disabled value="">Select Tag</option>
                    <option value="School">School</option>
                    <option value="Work">Work</option>
                    <option value="Leisure">Leisure</option>
                </select>
            </div>

            <div>
                <label>Priority</label>
                <select 
                    value={prio} 
                    onChange={(e) => setPrio(e.target.value)}
                    className='todo-inputs-style'
                >
                    <option disabled value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div>
                <label>Date</label>
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='todo-inputs-style'
                />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px'}}>
                <button 
                    onClick={onClose}
                    style={{
                        backgroundColor: '#f44336'
                    }}
                    className='new-task-btn'
                >
                    Cancel
                </button>

                <button 
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#4CAF50'
                    }}
                    className='new-task-btn'
                >
                    Add
                </button>
                
            </div>
        </div>
    </div>
}

export default TaskModal;