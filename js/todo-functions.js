/*
    Challenge
    1. Wire up button event
    2. remove todo by id
    3. Save and rerender the todos list
 */

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

const saveTodos = todos => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = id => {
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const renderTodos = (todos, filter) => {
    document.querySelector('#todo-list').innerHTML = ''

    const filteredResults = todos.filter(todo => {
        if (!filter.hideCompleted) {
            return todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        } else {
            return todo.text.toLowerCase().includes(filter.searchText.toLowerCase()) && !todo.completed
        }
    })

    const headerEl = generateSummaryDOM()
    document.querySelector('#todo-list').appendChild(headerEl)

    filteredResults.forEach(todo => {
        const paragraphEl = generateTodoDOM(todo)
        document.querySelector('#todo-list').appendChild(paragraphEl)
    })
}

const generateTodoDOM = todo => {
    const rootDiv = document.createElement('div')
    const checkBox = document.createElement('input')
    const removeButton = document.createElement('button')
    const todoText = document.createElement('span')

    rootDiv.appendChild(checkBox)
    rootDiv.appendChild(todoText)
    rootDiv.appendChild(removeButton)

    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    checkBox.setAttribute('type', 'checkbox')
    removeButton.textContent = 'x'
    todoText.textContent = todo.text

    return rootDiv
}

const generateSummaryDOM = () => {
    const incompleteItems = todos.filter(todo => !todo.completed)
    const headerTwo = document.createElement('h2')
    headerTwo.textContent = `You have ${incompleteItems.length} things left to do!`
    return headerTwo
}