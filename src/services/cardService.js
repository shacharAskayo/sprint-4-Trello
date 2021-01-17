import {utilService} from './utilService'

export const cardService = {
    getCardById,
    getCards,
    getCardLabels,
    getCardForUpdate,
    updateChecklistTodo,
    removeChecklist,
    getActivityToAdd,
    getCommentToAdd

}

function getCardById(board, cardId) {
    var currCard
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.id === cardId) currCard = card
    }))
    if (!currCard) return null
    const labels = getCardLabels(board, currCard.labels)
    const activities = _getCardActivities(board, cardId)
    return {...currCard, labels, activities }
}

function getCardForUpdate(card){
    delete card.activities
    const labels = card.labels.map(label => label.id)
    const newCard = JSON.parse(JSON.stringify(card))
    return {...newCard, labels}


}
function _getCardActivities(board, cardId) {
    return board.activities.filter(act => act.card.id === cardId)
}

function getCardLabels(board, labels) {
    return board.labels.filter(label => labels?.includes(label.id))
}

function getCards(group){
    const cards = group.cards
    return cards
}

function updateChecklistTodo(card, checklist, todo){
    const todoToUpdate = {...todo}
    if (todoToUpdate.id) var todos = checklist.todos.map(todo => (todo.id === todoToUpdate.id) ? todoToUpdate : todo)
    else {
        todoToUpdate.id = utilService.makeId()
        var todos = [...checklist.todos, todoToUpdate]
    }
    const currChecklist = {...checklist, todos}
    const checklists = card.checklists.map(checklist => (checklist.id === currChecklist.id) ? currChecklist : checklist)
    return {...card, checklists}
}

function removeChecklist(card, currChecklist){
    const checklists = card.checklists.filter(checklist => checklist.id !== currChecklist.id)
    return {...card, checklists}
}

function getActivityToAdd(card, user, txt ){
    
        return {
            id: utilService.makeId(),
            txt ,
            createdAt: Date.now(),
            createdBy: user,
            card: {
               id: card.id,
               title: card.title
            }
        }

}

function getCommentToAdd(txt, user){
    return {txt, createdAt: Date.now(), createdBy: user, id: utilService.makeId()}
}





