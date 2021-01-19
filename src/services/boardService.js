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
    setStyle,
    copyList,
    editCurrLabel,
    updateBoard,
    moveCard

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
    return newBoard
}

async function addCard(board, group, currCard, isAddingToTop) {
    const card = {...currCard, createdAt: Date.now(), id: utilService.makeId()}
    const newGroup = (isAddingToTop ) ? { ...group, cards: [card , ...group.cards] } : { ...group, cards: [...group.cards, card] }
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
    const newGroup = {...group, createdAt: Date.now() ,id: utilService.makeId()}
    const newGroups = [...board.groups, newGroup ]
    const newBoard = { ...board, groups: newGroups }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

function updateCardLocation(board, source, destination) {
    console.log('dnd:', source, destination)
    const currBoard = JSON.parse(JSON.stringify(board))
    const fromGroupIdx = currBoard.groups.findIndex(group => group.id === source.droppableId)
    const toGroupIdx = currBoard.groups.findIndex(group => group.id === destination.droppableId)
    const currCard = currBoard.groups[fromGroupIdx].cards[source.index]
    currBoard.groups[fromGroupIdx].cards.splice(source.index, 1)
    currBoard.groups[toGroupIdx].cards.splice(destination.index, 0, currCard)
    console.log(currBoard)
    return currBoard
}

async function updateGroupLoaction(board, groupId, source, destination) {
    const currBoard = JSON.parse(JSON.stringify(board))
    const currGroup = currBoard.groups.find(group => group.id === groupId)
    currBoard.groups.splice(source.index, 1)
    currBoard.groups.splice(destination.index, 0, currGroup)
    return currBoard
}

async function updateGroupTitle(board, currGroup, title) {

    const newGroups = board.groups.map(group => (group.id === currGroup.id) ? { ...group, title } : group)
    const newBoard = { ...board, groups: newGroups }
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
    const newBoard = { ...board, description }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}

function getActivities(board, filter) {
    const cardsComments = []
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.comments) cardsComments.push(...card.comments)
    }))
    if (filter === 'all') return [...cardsComments, ...board.activities]
    else return [...cardsComments]
}

async function copyList(board, currGroup) {
    const boardCopy = JSON.parse(JSON.stringify(board))
    const groupCopy = JSON.parse(JSON.stringify(currGroup))
    groupCopy.id = utilService.makeId()
    groupCopy.cards.forEach(card => card.id = utilService.makeId())
    const groupIdx = board.groups.findIndex(group => group.id === currGroup.id)
    boardCopy.groups.splice((groupIdx + 1), 0, groupCopy)
    try {
        const boardAfter = await httpService.put('/board/' + boardCopy._id, boardCopy)
        return boardAfter
    } catch (err) {
        console.log(err)
    }

}


async function editCurrLabel(board, currLabel, deleteOption) {

        if (currLabel.id) {
            if (deleteOption !== 'delete') {
                var labels = board.labels.map(label => (label.id === currLabel.id) ? currLabel : label)
            } else {
                var labels = board.labels.filter(label => (label.id !== currLabel.id))
            }
        }
        else {
             currLabel.id = utilService.makeId()
            var labels = [...board.labels, currLabel]
        }
        const newBoard = {...board, labels}
        
        try {
            const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
            return boardAfter
        } catch (err) {
            console.log(err)
        }
}


async function updateBoard(board){
    try {
        const boardAfter = await httpService.put('/board/' + board._id, board)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
    
}
async function moveCard(currBoard, currCard, to){
    console.log('currBoard, currCard, to', currBoard, currCard, to)
    const groups = currBoard.groups.map((group, idx) => {
        var cards
        if (idx !== +to.groupIdx){
            cards = group.cards.filter(card => card.id !== currCard.id)
        }
        else {
            cards = [...group.cards]
            cards.splice(+to.cardIdx, 0, currCard)
        }
        return {...group, cards}
    })
    const board = {...currBoard, groups}
    try {
        const boardAfter = await httpService.put('/board/' + board._id, board)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}