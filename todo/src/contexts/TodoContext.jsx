import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({children}) => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('todo');
        if(saved) {
        setTodo(JSON.parse(saved));
        console.log("first render: ", JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo));
        console.log("change todo: ", todo);
    }, [todo])

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