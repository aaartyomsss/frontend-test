// Some helper functions not to clutter the code in components

export const convertDate = (timeInMs) => {
    let date = new Date(timeInMs);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`;
}

export const sortByDate = (arr, filter) => {
    if (filter === 'new') {
        return arr.sort((a, b) => b.timestamp - a.timestamp)
    } else {
        return arr.sort((a, b) => a.timestamp - b.timestamp)
    }
}

