import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({children}) => {
    const [todo, setTodo] = useState([]);
    const location = useLocation();

    useEffect(() => {
        console.log('pathname: ', location.pathname);
        getTasks(location.pathname);
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

    const handleDone = (taskId) => {
        const updatedTodo = [...todo].map((t) => {
            if(t.id === taskId){
                return {...t, isDone: true};
            } 
            return t;
        });
        setTodo(updatedTodo);
    }

    const value = {
        todo,
        setTodo,
        handleDone
    }

    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}