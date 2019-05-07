// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { renderTodos } from "./views"
import { setFilters } from "./filters"
import { createTodo } from "./todos"

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-todo').addEventListener('input', e => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change', e => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault()
    createTodo(e.target.elements.addTodo.value.trim())
    e.target.elements.addTodo.value = ''
})

// Bonus: Add a watcher for local storage