const todos = [{
    text: 'Practice JavaScript',
    completed: false
}, {
    text: 'Finish Udacity Course',
    completed: false
}, {
    text: 'Make Breakfast',
    completed: true
}, {
    text: 'Make Coffee',
    completed: true
}]

const filter = {
    searchText: '',
    hideCompleted: false
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

    const incompleteItems = filteredResults.filter(todo => !todo.completed)

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
    e.target.elements.addTodo.value = ''
    filterTodos(todos, filter)
})

document.querySelector('#hide-completed').addEventListener('change', e => {
    filter.hideCompleted = e.target.checked
    filterTodos(todos, filter)
})


/*
    Challenge
    1. Create checkbox input that hides completed todos
 */