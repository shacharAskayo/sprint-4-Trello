import { utilService } from './utilService'
import { httpService } from './httpService'
import { cardService } from './cardService'



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
    updateBoardDesc,
    getActivities,
    setStyle

}




async function query() {
    console.log('sevice got req');
    try {
        const boards = await httpService.get('/board')
        return boards
    } catch (err) {
        console.log(err)
    }
}

async function getById(id) {
    try {
        const board = await httpService.get('/board/' + id)
        return board
    } catch (err) {
        console.log(err)
    }

}

async function addBoard(board) {
    try {
        const newBoard = await httpService.post('/board', board)
        return newBoard
    } catch (err) {
        console.log(err)
    }
}


async function updateBoardCard(currBoard, card) { //will it be a problem with idxs due to d&d?
    const board = JSON.parse(JSON.stringify(currBoard))
    const cardToUpdate = cardService.getCardForUpdate(card)
    const newGroups = board.groups.map(group => {
        const cards = group.cards.map(card => (card.id === cardToUpdate.id) ? cardToUpdate : card)
        return { ...group, cards }
    })
    const newBoard = { ...board, groups: newGroups }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

async function addCard(board, group, card) {
    const newGroup = { ...group, cards: [...group.cards, { ...card }] }
    const newGroups = board.groups.map(group => (group.id === newGroup.id ? newGroup : group))
    const newBoard = { ...board, groups: newGroups }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}


async function addGroup(board, group) {
    const newGroups = { ...board.groups, group }
    const newBoard = { ...board, groups: newGroups }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

async function updateCardLocation(board, source, destination) {
    const currBoard = JSON.parse(JSON.stringify(board))
    const fromGroupIdx = currBoard.groups.findIndex(group => group.id === source.droppableId)
    const toGroupIdx = currBoard.groups.findIndex(group => group.id === destination.droppableId)
    const currCard = currBoard.groups[fromGroupIdx].cards[source.index]
    currBoard.groups[fromGroupIdx].cards.splice(source.index, 1)
    currBoard.groups[toGroupIdx].cards.splice(destination.index, 0, currCard)

    try {
        const boardAfter = await httpService.put('/board/' + currBoard._id, currBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

async function updateGroupLoaction(board, groupId, source, destination) {
    const currBoard = JSON.parse(JSON.stringify(board))
    const currGroup = currBoard.groups.find(group => group.id === groupId)
    currBoard.groups.splice(source.index, 1)
    currBoard.groups.splice(destination.index, 0, currGroup)
    try {
        const boardAfter = await httpService.put('/board/' + currBoard._id, currBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

async function updateGroupTitle(board, currGroup, title) {

    const newGroups = board.groups.map(group => (group.id === currGroup.id) ? {...group, title} : group)
    const newBoard = {...board, groups: newGroups}
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

async function setStyle(board, background) {
    const newBoard = { ...board, style: background }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

async function updateBoardDesc(board, description) {
    const newBoard = {...board, description }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

function getActivities(board, filter) {
    console.log('board is:' ,board);
    const cardsComments = []
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.comments) cardsComments.push(...card.comments)
    }))
    if (filter === 'all') return [...cardsComments, ...board.activities]
    else return [...cardsComments]
}
