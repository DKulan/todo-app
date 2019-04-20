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
    searchText: ''
}


const filterTodos = (todos, filter) => {
    document.querySelector('#todo-list').innerHTML = ''

    const filteredResults = todos.filter(todo => todo.text.toLowerCase().includes(filter.searchText.toLowerCase()))

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


/*
    Challenge
    1. Create a form with a single input for todo text
    2. Setup a submit handler and cancel the default action
    3. Add a new item to the todos array with that text data (completed value of false)
    4. Rerender the application
    5. Clear the input field value
 */