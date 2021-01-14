import { boardService } from "../../services/boardService"
import { cardService } from "../../services/cardService"
// import { socketService } from "../../services/socketService"

export function updateCard(board, card) {
    return dispatch => {
        const newBoard = boardService.updateBoardCard(board, card)
        dispatch('BOARD_UPDETED', newBoard)
            // socketService.emit('boadUpdate',newBoard)
    }
}


export function loadCards(group) {
  return async dispatch => {
    try {
      const cards = await cardService.getCards(group)
      dispatch({ type: 'SET_CARDS', cards })
    } 
    catch (err) {
      console.log(' err in loadBoard', err)
    }
  }
}
