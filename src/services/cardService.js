export const cardService = {
    getCardById,
}

function getCardById(board, cardId) {
    var currCard
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.id === cardId) currCard = card
    }))
    const labels = getCardLabels(board, currCard.labels)
    const activities = _getCardActivities(board, cardId)
    return {...currCard, labels, activities }
}

function _getCardActivities(board, cardId) {
    return board.activities.filter(act => act.card.id === cardId)
}

function getCardLabels(board, labels) {
    return board.labels.filter(label => labels.includes(label.id))
}