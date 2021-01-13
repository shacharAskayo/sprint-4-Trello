const { board } = require('../data/db.json')


var gBoards = [board]

export const boardService = {
    query,
    getById,
    updateBoardCard
}

function query() {
    return Promise.resolve(gBoards)
}

function getById(id) {
    const currBoard = gBoards.find(board => board._id === id)
    return Promise.resolve(currBoard)
}

function updateBoardCard(board, cardToUpdate) {
    const newGroups = board.groups.map(group => {
        const cards = group.cards.map(card => (card.id === cardToUpdate.id) ? cardToUpdate : card)
        return {...group, cards }
    })
    return {...board, groups: newGroups }
}