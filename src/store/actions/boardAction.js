import { boardService } from '../../services/boardService'


export function loadBoard() {
  return async dispatch => {
    try {
      const board = await boardService.query()
      dispatch({ type: 'SET_BOARD', board })

    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err)
    }
  }
}