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
    moveCard,
    archiveList,
    archiveCard,
    sortCards,
    moveGroup


}




async function query() {
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
        const copy = JSON.parse(JSON.stringify(board))
    try {
        const boardAfter = await httpService.post('/board', copy)
        return boardAfter
    } catch (err) {
        console.log(err)
    }
}


async function updateBoardCard(currBoard, card) {
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
    const card = { ...currCard, createdAt: Date.now(), id: utilService.makeId() }
    const newGroup = (isAddingToTop) ? { ...group, cards: [card, ...group.cards] } : { ...group, cards: [...group.cards, card] }
    const newGroups = board.groups.map(group => (group.id === newGroup.id ? newGroup : group))
    const newBoard = { ...board, groups: newGroups }
   return newBoard
}


async function addGroup(board, group) {
    const newGroup = { ...group, createdAt: Date.now(), id: utilService.makeId() }
    const newGroups = [...board.groups, newGroup]
    const newBoard = { ...board, groups: newGroups }
    return newBoard
}

function updateCardLocation(board, source, destination) {
    const currBoard = JSON.parse(JSON.stringify(board))
    const fromGroupIdx = currBoard.groups.findIndex(group => group.id === source.droppableId)
    const toGroupIdx = currBoard.groups.findIndex(group => group.id === destination.droppableId)
    const currCard = currBoard.groups[fromGroupIdx].cards[source.index]
    currBoard.groups[fromGroupIdx].cards.splice(source.index, 1)
    currBoard.groups[toGroupIdx].cards.splice(destination.index, 0, currCard)
    return currBoard
}

async function updateGroupLoaction(board, groupId, source, destination) {
    console.log(board);
    const currBoard = JSON.parse(JSON.stringify(board))
    const currGroup = currBoard.groups.find(group => group.id === groupId)
    currBoard.groups.splice(source.index, 1)
    currBoard.groups.splice(destination.index, 0, currGroup)
    return currBoard
}

async function updateGroupTitle(board, currGroup, title) {
    const newGroups = board.groups.map(group => (group.id === currGroup.id) ? { ...group, title } : group)
    const newBoard = { ...board, groups: newGroups }
    return newBoard

}

async function setStyle(board, background) {
    const newBoard = { ...board, style: background }
   return newBoard
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
    return boardCopy

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
    const newBoard = { ...board, labels }

   return newBoard
}


async function archiveList(currBoard, currGroup) {
    const newBoard = { ...currBoard, groups: currBoard.groups.filter(group => group.id !== currGroup.id), archives: { ...currBoard.archives, groups: [...currBoard.archives.groups, currGroup] } }
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter

    } catch (err) {
        console.log(err)
    }

}


async function updateBoard(board) {
    try {
        const boardAfter = await httpService.put('/board/' + board._id, board)
        return boardAfter
    } catch (err) {
        console.log(err)
    }

}
async function moveCard(currBoard, currCard, to) {
    console.log('currBoard, currCard, to', currBoard, currCard, to)
    const groups = currBoard.groups.map((group, idx) => {
        var cards
        if (idx !== +to.groupIdx) {
            cards = group.cards.filter(card => card.id !== currCard.id)
        }
        else {
            cards = [...group.cards]
            cards.splice(+to.cardIdx, 0, currCard)
        }
        return { ...group, cards }
    })
    const board = { ...currBoard, groups }
    return board
}

async function archiveCard(currBoard, currGroup, currCard) {
    const newBoard = { ...currBoard }
    const groupIdx = currBoard.groups.findIndex(group => group.id === currGroup.id)
    const newCards = currBoard.groups[groupIdx].cards.filter(card => card.id !== currCard.id)
    newBoard.groups[groupIdx].cards = newCards
    newBoard.archives.cards.unshift(currCard)
    try {
        const boardAfter = await httpService.put('/board/' + newBoard._id, newBoard)
        return boardAfter

    } catch (err) {
        console.log(err)
    }
}

 function sortCards(board,sortBy,currGroup) {
    const boardCopy=JSON.parse(JSON.stringify(board))
    const groupIdx=boardCopy.groups.findIndex(group=>group.id===currGroup.id)
    if(sortBy==='name'){
        var sortedCards=boardCopy.groups[groupIdx].cards.sort((a, b) => a.title.localeCompare(b.title))
        boardCopy.groups[groupIdx].cards=sortedCards
        return updateBoard(boardCopy)
    }
}

async function moveGroup(boards,currBoard,currGroup,destinationBoard,position){
     const allBoards= JSON.parse(JSON.stringify(boards))

    // const copyBoard = JSON.parse(JSON.stringify(currBoard))
    // const currGroupIdx = copyBoard.groups.findIndex(group=>group.id===currGroup.idx)
    //  copyBoard.groups.splice(currGroupIdx,1)
    //  destinationBoard.groups.splice(position,0,newGroup)
     try {
        // const originBoardAfter = await httpService.put('/board/' + currBoard._id, currBoard)
        // console.log('the board after',originBoardAfter);
        // const boardAfter = await httpService.put('/board/' + destinationBoard._id, destinationBoard)
        // return originBoardAfter

    } catch (err) {
        console.log(err)
    }

}