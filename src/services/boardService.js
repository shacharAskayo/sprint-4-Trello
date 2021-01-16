import {utilService} from './utilService'
import {httpService} from './httpService'
import {cardService} from './cardService'


// const { board } = require('../data/db.json')
var db = require('../db.json')
const { board } = db

var gBoards = [board]
export const boardService = {
    query,
    getById,
    addCard,
    addGroup,
    // selectImg,
    // selectColor,
    updateBoardCard,
    setBackground

}




function query() {
    const board = httpService.get('/board')
    return board
}

function getById(id) {
    const currBoard = gBoards.find(board => board._id === id)
    const copy =JSON.parse(JSON.stringify(currBoard)) 
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
        const currBoard = await getById(boardId)
        // const copy = JSON.parse(JSON.stringify(currBoard))
        const newGroup = { ...group, id: utilService.makeId() }
        currBoard.groups.push(newGroup)
        return Promise.resolve(currBoard)
    }
    catch (err) {
        console.log('err in service:', err);
    }
}
function setBackground(board, background) {
    try {
        const currBoard = getById(board._id)
        // const style = (background.length > 10) ? imgSrc : color
        var updatedBoard = { ...currBoard, style: background }
        return Promise.resolve(updatedBoard)
    }
    catch (err) {
        console.log('err in setting background', err);
    }
}


// function selectImg(board,imgSrc) {
//     return imgSrc
// }
// function selectColor(board,color) {
//     return color
// }


