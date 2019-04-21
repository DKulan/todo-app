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

const filterTodos = (todos, filter) => {
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
    const paragraph = document.createElement('p')
    paragraph.textContent = todo.text
    return paragraph
}

const generateSummaryDOM = () => {
    const incompleteItems = todos.filter(todo => !todo.completed)
    const headerTwo = document.createElement('h2')
    headerTwo.textContent = `You have ${incompleteItems.length} things left to do!`
    return headerTwo
}