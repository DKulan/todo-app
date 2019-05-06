'use strict'

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch(e) {
        return []
    }
}

const saveTodos = todos => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = id => {
    const todoIndex = todos.findIndex(todo =>  todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = (id, e) => {
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id
    })

    todos[todoIndex].completed = e.target.checked
}

const renderTodos = (todos, filter) => {
    document.querySelector('#todo-list').innerHTML = ''

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

const generateTodoDOM = todo => {
    const root = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const removeButton = document.createElement('button')
    const todoText = document.createElement('span')

    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', e => {
        toggleTodo(todo.id, e)
        saveTodos(todos)
        renderTodos(todos, filters)
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
        renderTodos(todos, filters)
    })

    return root
}

const generateSummaryDOM = () => {
    const incompleteItems = todos.filter(todo => !todo.completed)
    const headerTwo = document.createElement('h2')
    const plural = incompleteItems.length === 1 ? '' : 's'

    headerTwo.textContent = `You have ${incompleteItems.length} todo${plural} left`
    headerTwo.classList.add('list-title')
    return headerTwo
}