/*
    Challenge
    1. Delete dummy data
    2. Read and parse the data when the app starts up
    3. Stringify and write the data when new data is added
 */

let todos = []

const filter = {
    searchText: '',
    hideCompleted: false
}

const todosJSON = localStorage.getItem('todos')

if (todosJSON !== null) {
    todos = JSON.parse(todosJSON)
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

    const incompleteItems = todos.filter(todo => !todo.completed)

    const headerTwo = document.createElement('h2')
    headerTwo.textContent = `You have ${incompleteItems.length} things left to do!`
    document.querySelector('#todo-list').appendChild(headerTwo)

    filteredResults.forEach(todo => {
        const paragraph = document.createElement('p')
        paragraph.textContent = todo.text
        document.querySelector('#todo-list').appendChild(paragraph)
    })
}

filterTodos(todos, filter)

// Listeners
document.querySelector('#search-todo').addEventListener('input', e => {
    filter.searchText = e.target.value
    filterTodos(todos, filter)
})

document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault()
    todos.push({
        text: e.target.elements.addTodo.value,
        completed: false
    })
    const todosJSON = JSON.stringify(todos)
    localStorage.setItem('todos', todosJSON)
    e.target.elements.addTodo.value = ''
    filterTodos(todos, filter)
})

document.querySelector('#hide-completed').addEventListener('change', e => {
    filter.hideCompleted = e.target.checked
    filterTodos(todos, filter)
})