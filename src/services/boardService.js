import { utilService } from './utilService'
import { httpService } from './httpService'
import { cardService } from './cardService'


// const { board } = require('../data/db.json')
var db = require('../db.json')
const { board } = db

var gBoards = [board]
export const boardService = {
    query,
    getById,
    addCard,
    addGroup,
    updateBoardCard,
    updateCardsLocation,
    updateGroupLoaction,
    addBoard,
    updateGroupTitle,
    setBackground,
    updateBoardDesc,
    getActivities

}




async function query() {
    // const board =await httpService.get('/board')
    return gBoards
}

function addBoard(board) {
    const newBoard = { ...board, _id: utilService.makeId() }
    const copy = [...gBoards]
    const newBoards = [...copy, newBoard]
    gBoards = newBoards
    return newBoard
}

function getById(id) {
    const currBoard = gBoards.find(board => board._id === id)
    const copy = JSON.parse(JSON.stringify(currBoard))
    return Promise.resolve(copy)
    // return Promise.resolve(currBoard)
}

function updateBoardCard(board, card) { //will it be a problem with idxs due to d&d?
    const cardToUpdate = cardService.getCardForUpdate(card)
    const newGroups = board.groups.map(group => {
        const cards = group.cards.map(card => (card.id === cardToUpdate.id) ? cardToUpdate : card)
        return { ...group, cards }
    })
    return { ...board, groups: newGroups }
}

function addCard(boardId, groupId, card) {
    var copy = JSON.parse(JSON.stringify(gBoards))
    var newCard = { ...card, id: utilService.makeId() }
    const boardIdx = gBoards.findIndex(board => board._id === boardId)
    const groupIdx = copy[boardIdx].groups.findIndex(group => group.id === groupId)
    copy[boardIdx].groups[groupIdx].cards.push(newCard)
    gBoards = copy
    return gBoards[boardIdx]
}


async function addGroup(boardId, group) {
    try {
        var copy = JSON.parse(JSON.stringify(gBoards))
        var newGroup = { ...group, id: utilService.makeId() }
        const boardIdx = gBoards.findIndex(board => board._id === boardId)
        copy[boardIdx].groups.push(newGroup)
        gBoards = copy
        return Promise.resolve(gBoards[boardIdx])
    }
    catch (err) {
        console.log('err in service:', err);
    }
}

function updateCardsLocation(currBoard, currGroup, cards) {
    const { boardIdx, copy, groupIdx } = update(currBoard, currGroup)
    copy[boardIdx].groups[groupIdx].cards = cards
    gBoards = copy
    return Promise.resolve(gBoards[boardIdx])
}

function updateGroupLoaction(currBoard, groups) {
    const { boardIdx, copy } = update(currBoard)
    copy[boardIdx].groups = groups
    gBoards = copy
    return Promise.resolve(gBoards[boardIdx])
}

function updateGroupTitle(currBoard, currGroup, groupTitle) {
    const { boardIdx, copy, groupIdx } = update(currBoard, currGroup)
    copy[boardIdx].groups[groupIdx].title = groupTitle
    gBoards = copy
    return gBoards[boardIdx]
}

function update(currBoard, currGroup = gBoards[0].groups[0]) {
    var copy = JSON.parse(JSON.stringify(gBoards))
    const boardIdx = copy.findIndex(board => board._id === currBoard._id)
    const groupIdx = copy[boardIdx].groups.findIndex(group => group.id === currGroup.id)
    return { boardIdx, copy, groupIdx }
}

function setBackground(board, background) {
    try {
        const currBoard = getById(board._id)
        var updatedBoard = { ...currBoard, style: background }
        return Promise.resolve(updatedBoard)
    }
    catch (err) {
        console.log('err in setting background', err);
    }
}

function updateBoardDesc(currBoard, description) {
    var copy = JSON.parse(JSON.stringify(gBoards))
    const boardIdx = copy.findIndex(board => board._id === currBoard._id)
    copy[boardIdx].description = description
    gBoards = copy
    return gBoards[boardIdx]
}

function getActivities(currBoard, filter) {
    const boardIdx = gBoards.findIndex(board => board._id === currBoard._id)
    var cardsActivities = []
    gBoards[boardIdx].groups.map(group => {
        return group.cards.forEach(card => {
            card.comments.forEach(comment => {
                cardsActivities.push(comment)
            })
        })
    })
    var boardActivities = []
    gBoards[boardIdx].activities.forEach(activity => {
        boardActivities.push(activity)
    })
    if (filter === 'all')
        return [...cardsActivities, ...boardActivities]
    else return [...cardsActivities]
}