/*
    Challenge
    1. Fetch existing todos from localStorage (getSavedTodos)
    2. Save todos to localStorage (saveTodos)
    3. Render application todos based on filters (renderToDos)
    4. Get the DOM elements for an individual note (generateTodoDOM)
    5. Get the DOM element for the list summary (generateSummaryDOM)
 */

const todos = getSavedTodos()

const filter = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filter)

// Listeners
document.querySelector('#search-todo').addEventListener('input', e => {
    filter.searchText = e.target.value
    renderTodos(todos, filter)
})

document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault()
    todos.push({
        text: e.target.elements.addTodo.value,
        completed: false
    })
    saveTodos(todos)
    e.target.elements.addTodo.value = ''
    renderTodos(todos, filter)
})

document.querySelector('#hide-completed').addEventListener('change', e => {
    filter.hideCompleted = e.target.checked
    renderTodos(todos, filter)
})