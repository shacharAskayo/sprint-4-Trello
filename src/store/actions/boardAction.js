import { boardService } from '../../services/boardService'


export function getBoardById(id) {
  return async dispatch => {
    try {
      const board = await boardService.getById(id)
      dispatch({ type: 'SET_BOARD', board })
      // socketService.on('board-update',updatedBoard=>{
      //   dispatch({ type: 'SET_BOARD', updatedBoard })
      // })
    } 
    catch (err) {
      console.log(' err in loadBoard', err)
    }
  }
}
