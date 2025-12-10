import '../css/TodoModal.css'
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { useLocation } from 'react-router-dom';

function TaskModal({ isOpen, onClose }) {
    if(!isOpen) return null;

    const {
        todo, setTodo, 
        task, setTask,
        tag, setTag,
        prio, setPrio,
        date, setDate,
        getTasks,
        handleEdit,
        currentTask, setCurrentTask,
    } = useTodo();
    
    const location = useLocation();
    const pathname = location.pathname;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('nag run to')
        if(!task || !tag || !prio) return;
    
        try{
            const res = await fetch('http://localhost:8000/todo/new/', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({task, tag, due: date, prio})
            })
            console.log(res)
            if(res.status === 201) console.log("task created")
            else console.log("Failed to create the task")
        }catch (error) {
            console.log(error)
        }

        onClose();

        setTask(prev => prev = "");
        setTag(prev => prev = "");
        setPrio(prev => prev = "");
        setDate(prev => prev = "");
        console.log("current task: ", currentTask);
        getTasks(pathname);
    }

    return <div className="todo-modal"
        onClick={(e) => e.target === e.currentTarget && onClose()} 
        >

        <form>
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
                        <option value={3}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={1}>High</option>
                    </select>
                </div>

                <div>
                    <label>Date</label>
                    <input 
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='todo-inputs-style'
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px'}}>
                    <button 
                        onClick={onClose}
                        style={{ backgroundColor: '#f44336'}}
                        className='new-task-btn'
                    >
                        Cancel
                    </button>

                    {Object.keys(currentTask).length !== 0 
                        ? <button
                            type="button"
                            onClick={handleEdit}
                            style={{ backgroundColor: '#4CAF50' }}
                            className='new-task-btn'
                        >
                            Save
                        </button>
                        : <button
                            type="button"
                            onClick={handleSubmit}
                            style={{ backgroundColor: '#4CAF50' }}
                            className='new-task-btn'
                        >
                            Add
                        </button>
                    }
                </div>
            </div>
        </form>
    </div>
}

export default TaskModal;