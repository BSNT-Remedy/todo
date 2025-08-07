import '../css/TodoModal.css'
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TaskModal({ isOpen, onClose }) {
    if(!isOpen) return null;

    const {setTodo} = useTodo();
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");
    const [prio, setPrio] = useState("");

    const handleSubmit = () => {
        console.log('nag run to')
        if(!task || !tag || !prio) return;
        setTodo(prev => [...prev, {taskName: task, tag: tag, priority: prio}]);
    
        setTask(prev => prev = "");
        setPrio(prev => prev = "");
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
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
                    autoFocus
                />
            </div>

            <div>
                <label>Tag</label>
                <select 
                    value={tag} 
                    onChange={(e) => setTag(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
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
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
                >
                    <option disabled value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px'}}>
                <button 
                    onClick={onClose}
                    style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Cancel
                </button>

                <button 
                    onClick={handleSubmit}
                    style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Add
                </button>
                
            </div>
        </div>
    </div>
}

export default TaskModal;