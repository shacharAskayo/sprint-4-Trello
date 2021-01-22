import { utilService } from './utilService'

export const cardService = {
    getCardById,
    getCards,
    getCardLabels,
    getCardForUpdate,
    updateChecklistTodo,
    removeChecklist,
    getActivityToAdd,
    getCommentToAdd,
    handleChecklistDrag,
    handleTodoDrag

}

function getCardById(board, cardId) {
    var currCard
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.id === cardId) currCard = JSON.parse(JSON.stringify(card))
    }))
    if (!currCard) return null
    const labels = getCardLabels(board, currCard.labels)
    const activities = _getCardActivities(board, cardId)
    return { ...currCard, labels, activities }
}

function getCardForUpdate(card) {
    const labels = card.labels.map(label => label?.id)
    const newCard = JSON.parse(JSON.stringify(card))
    delete newCard.activities
    // const newCard = JSON.parse(JSON.stringify(card))  //got error on json actions
    return { ...newCard, labels }


}
function _getCardActivities(board, cardId) {
    return board.activities.filter(act => act.card.id === cardId)
}

function getCardLabels(board, labels) {
    return board.labels.filter(label => labels?.includes(label.id))
}

function getCards(group) {
    const cards = group.cards
    return cards
}

function updateChecklistTodo(card, checklist, todo) {
    const todoToUpdate = JSON.parse(JSON.stringify(todo))
    const newCard = JSON.parse(JSON.stringify(card))
    if (todoToUpdate.id) var todos = checklist.todos.map(todo => (todo.id === todoToUpdate.id) ? todoToUpdate : todo)
    else {
        todoToUpdate.id = utilService.makeId()
        todos = [...checklist.todos, todoToUpdate]
    }
    const currChecklist = { ...checklist, todos }
    const checklists = card.checklists.map(checklist => (checklist.id === currChecklist.id) ? currChecklist : checklist)
    return { ...newCard, checklists }
}

function removeChecklist(card, currChecklist) {
    const checklists = card.checklists.filter(checklist => checklist.id !== currChecklist.id)
    const newCard = JSON.parse(JSON.stringify(card))
    return { ...newCard, checklists }
}

function getActivityToAdd(card, user, txt) {

    return {
        id: utilService.makeId(),
        txt,
        createdAt: Date.now(),
        createdBy: user,
        card: {
            id: card.id,
            title: card.title
        }
    }

}

function getCommentToAdd(txt, user) {
    return { txt, createdAt: Date.now(), createdBy: user, id: utilService.makeId() }
}


function handleTodoDrag(board, card, res) {
    var newCard
    if (res.type = 'checklists') newCard = cardService.handleChecklistDrag(card, res)
    return newCard

}

function handleChecklistDrag( card, res) {
    console.log(card);
    const checklists = [...card.checklists]
    const checklist = checklists.splice(res.source.index, 1)[0]
    checklists.splice(res.destination.index, 0, checklist)
    const newCard = { ...card, checklists }
    console.log(newCard)
    return newCard

}


