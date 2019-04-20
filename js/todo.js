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

/*
    Challenge Area
    1. new div that contains todos
    2. setup filters (searchText) and wire up a new filter input to change it
    3. Create render todos function to render and rerender the latest filtered data
 */

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
document.querySelector('#add-todo').addEventListener('click', e => {
    console.log('An item was added...')
})

document.querySelector('#search-todo').addEventListener('input', e => {
    filter.searchText = e.target.value
    filterTodos(todos, filter)
})

