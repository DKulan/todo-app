import {getTodos, removeTodo, saveTodos, toggleTodo} from "./todos"
import { getFilters } from "./filters"


// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {
    document.querySelector('#todo-list').innerHTML = ''

    const todos = getTodos()
    const filter = getFilters()

    const filteredResults = todos.filter(todo => {
        return !filter.hideCompleted
            ? todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
            : todo.text.toLowerCase().includes(filter.searchText.toLowerCase()) && !todo.completed
    })

    const headerEl = generateSummaryDOM()
    document.querySelector('#todo-list').appendChild(headerEl)

    if (filteredResults.length > 0) {
        filteredResults.forEach(todo => {
            const paragraphEl = generateTodoDOM(todo)
            document.querySelector('#todo-list').appendChild(paragraphEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No todos to show'
        emptyMessage.classList.add('empty-message')
        document.querySelector('#todo-list').appendChild(emptyMessage)
    }

}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generateTodoDOM = todo => {
    const todos = getTodos()
    const root = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const removeButton = document.createElement('button')
    const todoText = document.createElement('span')

    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', e => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos()
    })

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    root.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    root.appendChild(containerEl)

    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    root.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos()
    })

    return root
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummaryDOM = () => {
    const todos = getTodos()
    const incompleteItems = todos.filter(todo => !todo.completed)
    const headerTwo = document.createElement('h2')
    const plural = incompleteItems.length === 1 ? '' : 's'

    headerTwo.textContent = `You have ${incompleteItems.length} todo${plural} left`
    headerTwo.classList.add('list-title')
    return headerTwo
}


// Make sure to set up the exports
export { renderTodos, generateSummaryDOM, generateTodoDOM }