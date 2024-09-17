import React, { createContext, useContext } from "react";


export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            title: "Buy Milk",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}    
})

export function useTodoContext(){
    return useContext(TodoContext)
}