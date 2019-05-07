import uuid from 'uuid'
import { renderTodos } from "./views"


// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
// Return value: none
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch(e) {
        return []
    }
}

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = todos => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = todoText => {
    const addNewTodoText = todoText

    if (addNewTodoText.length > 0) {
        todos.push({
            id: uuid.v4(),
            text: addNewTodoText,
            completed: false
        })
        saveTodos(todos)
        renderTodos()
    }
}


// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = id => {
    const todoIndex = todos.findIndex(todo =>  todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (id) => {
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id
    })

    todos[todoIndex].completed = !todos[todoIndex].completed
}

// Make sure to call loadTodos and setup the exports
todos = loadTodos()

export { saveTodos, getTodos, createTodo, removeTodo, toggleTodo }