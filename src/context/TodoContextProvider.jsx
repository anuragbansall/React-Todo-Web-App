import React, { createContext, useContext, useEffect, useId, useMemo, useState } from "react";
import { TodoContext } from "./TodoContext";
import { v4 as uuidv4 } from 'uuid';

function TodoContextProvider({children}){
    const [todos, setTodos] = useState([])
    
    const addTodo = (todo) => {
        setTodos(prevTodos => (
            [{
                id: uuidv4(),
                ...todo
            }, ...prevTodos]
        ))
    }

    const updateTodo = (id, todo) => {
        setTodos(prevTodos => (
            prevTodos.map(item => item.id === id ? todo : item)
        ))
    }

    const deleteTodo = (id) => {
        setTodos(prevTodos => (
            prevTodos.filter(item => item.id !== id)
        ))
    }

    const toggleComplete = (id) => {
        setTodos(prevTodos => (
            prevTodos.map(item => item.id === id ? {
                ...item,
                completed: !item.completed
            } : item)
        ))
    }

    const value = useMemo(() => (
        {
            todos,
            addTodo,
            updateTodo,
            deleteTodo,
            toggleComplete
        }
    ), [todos])

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        if(todos){
            setTodos(todos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    return(
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider;