import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from 'react-router-dom';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({children}) => {
    const [todo, setTodo] = useState([]);
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        getTasks(pathname);
    }, [location])

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

    const value = {
        todo,
        setTodo,
        handleDone,
        getTasks,
    }

    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}