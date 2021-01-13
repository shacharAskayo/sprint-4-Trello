


export const cardService = {
    getCardById,
    updateCard
}

function getCardById(board, cardId) {
    const card = board.groups.map(cards => cards.map(card => {
        if (card._id === cardId) return card
    }))[0]
    console.log(card)
}

function updateCard(board, cardToUpdate) {
    const newGroups = board.groups.map(cards => cards.map(card => (card._id === cardToUpdate._id) ? cardToUpdate : card))
    board = {...board, groups: newGroups }
}