import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from 'react-router-dom';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({children}) => {
    const [todo, setTodo] = useState([]);
    const [task, setTask] = useState("");
    const [tag, setTag] = useState("");
    const [prio, setPrio] = useState("");
    const [date, setDate] = useState("");
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        getTasks(pathname);
    }, [location])

    useEffect(() => {
        if(Object.keys(currentTask).length !== 0){
            console.log("current task: ", currentTask)
            setTask(currentTask.taskName);
            setTag(currentTask.tag);
            setPrio(currentTask.priority);
            const utcDate = currentTask.due;
            const localDate = new Date(utcDate).toISOString().slice(0,16);
            setDate(localDate);
            console.log(localDate);
        }else {
            setTask(prev => prev = "");
            setTag(prev => prev = "");
            setPrio(prev => prev = "");
            setDate(prev => prev = "");
        }
    }, [currentTask])

    useEffect(() => {
        if(!taskModalOpen && !showConfirmModal){
            setCurrentTask({});
        }
    }, [taskModalOpen, showConfirmModal])

    const getTasks = async (pathname) => {
        let status = ''

        switch(pathname){
            case '/': status = 'ongoing'; break;
            case '/missed': status = 'missed'; break;
            case '/completed': status = 'completed'; break;
        }
        const tasks = await fetch(`http://127.0.0.1:8000/todo/?status=${status}`);
        const data = await tasks.json() 

        console.log('data: ', data);
        setTodo(data);
    }

    const handleDone = async (taskId) => {

        try {
            const res = await fetch(`http://127.0.0.1:8000/todo/done/${taskId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
        } catch (error) {
            console.error(error)
        }
        getTasks(pathname)
    }

    const handleEdit = async () => {
        console.log("current id: ", currentTask.id);
        const id = Number(currentTask.id);
        try {
            const res = await fetch(`http://127.0.0.1:8000/todo/edit/${id}/`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({task, tag, due: date, prio})
            })
            console.log(res)
            if(res.ok) {
                console.log("task updated")
                setTaskModalOpen(false);
            } else console.log("Failed to edit the task")
        } catch (error) {
            console.error(error);
        }

        getTasks(pathname);
    }

    const handleDelete = async (taskId) => {
        try{
            const res = await fetch(`http://127.0.0.1:8000/todo/delete/${taskId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
        } catch (error) {
            console.error(error)
        }
        setCurrentTask({})
        getTasks(pathname)
    }

    const value = {
        todo, setTodo,
        task, setTask,
        tag, setTag,
        prio, setPrio,
        date, setDate,
        taskModalOpen, setTaskModalOpen,
        handleDone, handleDelete, handleEdit,
        getTasks,
        showConfirmModal, setShowConfirmModal,
        currentTask, setCurrentTask,
    }

    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}