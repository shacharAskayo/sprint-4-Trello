import { utilService } from './utilService'
import { httpService } from './httpService'
import { cardService } from './cardService'
import { Sort } from '@material-ui/icons'


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
    updateCardLocation,
    updateGroupLoaction,
    addBoard,
    updateGroupTitle,
    setBackground,
    updateBoardDesc,
    getActivities,
    copyList,
    editCurrLabel

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

function updateBoardCard(currBoard, card) { //will it be a problem with idxs due to d&d?
    const board = JSON.parse(JSON.stringify(currBoard))
    const cardToUpdate = cardService.getCardForUpdate(card)
    const newGroups = board.groups.map(group => {
        const cards = group.cards.map(card => (card.id === cardToUpdate.id) ? cardToUpdate : card)
        return { ...group, cards }
    })
    const newBoard = { ...board, groups: newGroups }
    gBoards = gBoards.map(b => (b._id === board._id) ? newBoard : b)
    return newBoard


    // return { ...board, groups: newGroups }
}

function addCard(boardId, groupId, card, isAddingToTheTop) {
    console.log(gBoards[0].groups[0].cards[0].labels);
    var copy = JSON.parse(JSON.stringify(gBoards))
    var newCard = JSON.parse(JSON.stringify(card))
    newCard.id = utilService.makeId()
    // var newCard = { ...card, id: utilService.makeId() }
    const boardIdx = copy.findIndex(board => board._id === boardId)
    const groupIdx = copy[boardIdx].groups.findIndex(group => group.id === groupId)
    if (!isAddingToTheTop) copy[boardIdx].groups[groupIdx].cards.push(newCard)
    else { copy[boardIdx].groups[groupIdx].cards.unshift(newCard) }
    gBoards = copy
    return copy[boardIdx]
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

function updateCardLocation(board, cardId, source, destination) {
    const currBoard = JSON.parse(JSON.stringify(board))
    const fromGroupIdx = currBoard.groups.findIndex(group => group.id === source.droppableId)
    const toGroupIdx = currBoard.groups.findIndex(group => group.id === destination.droppableId)
    const currCard = currBoard.groups[fromGroupIdx].cards[source.index]
    currBoard.groups[fromGroupIdx].cards.splice(source.index, 1)
    currBoard.groups[toGroupIdx].cards.splice(destination.index, 0, currCard)
    gBoards[0] = currBoard
    return currBoard
}

function updateGroupLoaction(board, groupId, source, destination) {
    const currBoard = JSON.parse(JSON.stringify(board))
    const currGroup = currBoard.groups.find(group => group.id === groupId)
    currBoard.groups.splice(source.index, 1)
    currBoard.groups.splice(destination.index, 0, currGroup)
    gBoards[0] = currBoard
    return currBoard
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

function copyList(board, currGroup) {
    const boardCopy = JSON.parse(JSON.stringify(board))
    const groupCopy = JSON.parse(JSON.stringify(currGroup))
    groupCopy.id = utilService.makeId()
    groupCopy.cards.forEach(card => card.id = utilService.makeId())
    const groupIdx = board.groups.findIndex(group => group.id === currGroup.id)
    boardCopy.groups.splice((groupIdx + 1), 0, groupCopy)
    console.log('the focking copy', boardCopy);
    gBoards[0] = boardCopy
    return boardCopy
}


    async function editCurrLabel(boardId, label, deleteOption) {
        try {
            var copy = JSON.parse(JSON.stringify(gBoards))
            const boardIdx = gBoards.findIndex(board => board._id === boardId)
            if (label.id) {
                var labelIdx = copy[boardIdx].labels.findIndex(currLabel => {
                    return currLabel.id === label.id
                })
                if (deleteOption !== 'delete') {
                    var editedLabel = { ...label, color: label.color, title: label.title, id: label.id }
                    copy[boardIdx].labels[labelIdx] = editedLabel
                } else {
                    copy[boardIdx].labels.splice(labelIdx, 1)
                }
            }
            else {
                var newLabel = { ...label, id: utilService.makeId(), color: label.color, title: label.title }
                copy[boardIdx].labels.push(newLabel)
            }

            gBoards = copy
            return Promise.resolve(gBoards[boardIdx])
        }
        catch (err) {
            console.log('err in adding labels', err);
        }
    }