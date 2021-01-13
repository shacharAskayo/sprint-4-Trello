

export const cardService = {
    getCardById,
    updateCard,
    getCards,
    getCardLabels

}

function getCardById(board, cardId) {
    const card = board.groups.map(cards => cards.map(card => {
        if (card._id === cardId) return card
    }))[0]
    console.log(card)
}

function updateCard(board, cardToUpdate) {
    const newGroups = board.groups.map(group => group.map(card => (card._id === cardToUpdate._id) ? cardToUpdate : card))
     board = {...board, groups: newGroups }
    return board
    
}

function getCards(group){
    const cards = group.cards
    return cards
}
function getCardLabels(board, labels) {
    return board.labels.filter(label => labels.includes(label.id))
}




