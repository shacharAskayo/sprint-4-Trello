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


export function addCard(boardId, groupId, cardToAdd) {
  return async dispatch => {
    try {
      const board = await boardService.addCard(boardId, groupId, cardToAdd)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log(' err in loadBoard', err)
    }
  }
}

export  function addGroup(boardId, group) {
  return async dispatch => {
    try {
      const board = await boardService.addGroup(boardId, group)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log(' err in loadBoard', err)
    }
  }
}

export  function openLabel() {
  return  dispatch => {
      dispatch({ type: 'OPEN-LABELS' })
  }
}