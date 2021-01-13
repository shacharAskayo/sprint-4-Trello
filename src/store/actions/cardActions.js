import { cardService } from "../../services/cardService"
import { socketService } from "../../services/socketService"

export function updateCard(board, card) {
    dispatch => {
        const newBoard = cardService.updateCard(board, card)
        dispatch('BOARD_UPDETED', newBoard)
            // socketService.emit('boadUpdate',newBoard)
    }
}