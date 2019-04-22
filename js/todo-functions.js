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

/*
    Challenge
    1. Setup a root div
    2. Setup and append a checkbox  (someNode.setAttribute('type', 'checkbox'))
    3. Setup and append a span
    4. Setup and append a button
 */

const generateTodoDOM = todo => {
    const rootDiv = document.createElement('div')
    const checkBox = document.createElement('input')
    const button = document.createElement('button')
    const todoText = document.createElement('span')

    rootDiv.appendChild(checkBox)
    rootDiv.appendChild(todoText)
    rootDiv.appendChild(button)

    checkBox.setAttribute('type', 'checkbox')
    button.textContent = 'x'
    todoText.textContent = todo.text


    return rootDiv
}

const generateSummaryDOM = () => {
    const incompleteItems = todos.filter(todo => !todo.completed)
    const headerTwo = document.createElement('h2')
    headerTwo.textContent = `You have ${incompleteItems.length} things left to do!`
    return headerTwo
}