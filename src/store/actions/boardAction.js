import { boardService } from '../../services/boardService'

export function loadBoards() {
  console.log('hi');
  return async dispatch => {
    try {
      const boards = await boardService.query()
      dispatch({ type: 'SET_BOARDS', boards })
    }
    catch (err) {
      console.log('boardActions: err in loadboards', err)
    }
  }
}

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

export function selectImg(imgSrc) {
  return async dispatch => {
    try {
      const selectedImg = await boardService.selectImg(imgSrc)
      dispatch({ type: 'CHANGE_STYLE', selectedImg })
    }
    catch (err) {
      console.log('boardActions: err in selectImg', err);
    }
  }
}
export function selectColor(color) {
  return async dispatch => {
    try {
      console.log('hi***');
      const selectedColor = await boardService.selectColor(color)
      console.log('selectedColor:', selectedColor);
      dispatch({ type: 'SELECT_COLOR', selectedColor })
    }
    catch (err) {
      console.log('boardActions: err in selectColor', err);
    }
  }
}
