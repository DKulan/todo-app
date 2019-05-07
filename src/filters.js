// Set up filters default object
const filters = {
    searchText: '',
    hideCompleted: false
}

// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => filters


// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = (filterObject) => {
    if (typeof filterObject.searchText === 'string') {
        filters.searchText = filterObject.searchText
    }

    if (typeof filterObject.hideCompleted === 'boolean') {
        filters.hideCompleted = filterObject.hideCompleted
    }
}

// Make sure to set up the exports
export { getFilters, setFilters }