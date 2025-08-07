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

    const value = {
        todo,
        setTodo
    }

    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}