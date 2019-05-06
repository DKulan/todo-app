'use strict'

const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

// Listeners
document.querySelector('#search-todo').addEventListener('input', e => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault()
    const addNewTodoText = e.target.elements.addTodo.value.trim()

    if (addNewTodoText.length > 0) {
        todos.push({
            id: uuid.v4(),
            text: addNewTodoText,
            completed: false
        })
        saveTodos(todos)
        e.target.elements.addTodo.value = ''
        renderTodos(todos, filters)
    }
})

document.querySelector('#hide-completed').addEventListener('change', e => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})