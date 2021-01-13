const { board } = require('../data/db.json')


var gBoards = [board]

export const boardService = {
    query,
    getById
}


function query() {
    return Promise.resolve(gBoards)
}

function getById(id) {
    const currBoard = gBoards.find(board => board._id === id)
    return Promise.resolve(currBoard)

}