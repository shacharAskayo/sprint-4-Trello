import { boardService } from '../../services/boardService'
import { cardService } from '../../services/cardService'


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
