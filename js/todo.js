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
    1. p tag that show how many tasks left to do
    2. add a new paragraph for each todo item
 */

const incompleteItems = todos.filter(todo => !todo.completed)

const headerTwo = document.createElement('h2')
headerTwo.textContent = `You have ${incompleteItems.length} things left to do!`
document.querySelector('body').appendChild(headerTwo)

todos.forEach(todo => {
    const paragraph = document.createElement('p')
    paragraph.textContent = `${todo.text}`
    document.querySelector('body').appendChild(paragraph)
})

// Listen for new todo item
document.querySelector('#add-todo').addEventListener('click', e => {
    console.log('An item was added...')
})

document.querySelector('#new-todo-text').addEventListener('input', e => {
    console.log(e.target.value)
})

