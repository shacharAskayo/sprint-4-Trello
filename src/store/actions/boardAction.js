import { boardService } from '../../services/boardService.js'
import { httpService } from '../../services/httpService.js'

export function loadBoards() {
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
export function addBoard(newBoard) {
  return dispatch => {
    const board = boardService.addBoard(newBoard)
    dispatch({ type: 'ADD_BOARD', board: board })
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
      console.log('err in loadBoard', err)
    }
  }
}


export function addCard(boardId, groupId, cardToAdd,isAdding) {
  return async dispatch => {
    try {
      const board = await boardService.addCard(boardId, groupId, cardToAdd,isAdding)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in loadBoard', err)
    }
  }
}

export function addGroup(boardId, group) {
  return async dispatch => {
    try {
      const board = await boardService.addGroup(boardId, group)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in loadBoard', err)
    }
  }
}

export function updateBoardCard(board, card) {
  return async dispatch => {
    const newBoard = boardService.updateBoardCard(board, card)
    //const newBoard = await httpService.put('board/' + board._id,boardService.updateBoardCard(board,card))
    dispatch({ type: 'SET_BOARD', board: newBoard })

  }
}

export function openLabel() {
  return dispatch => {
    dispatch({ type: 'OPEN-LABELS' })
  }
}
export function setBackground(board, background) {
  return async dispatch => {
    try {
      const updatedBoard = { ...board, style: background }
      dispatch({ type: 'SET_BOARD', board: updatedBoard })
    }
    catch (err) {
      console.log('boardActions: err in loadboards', err);
    }
  }
}

export function selectImg(board, imgSrc) {
  return async dispatch => {
    try {
      const selectedImg = await boardService.selectImg(board, imgSrc)
      dispatch({ type: 'CHANGE_STYLE', selectedImg })
    }
    catch (err) {
      console.log('boardActions: err in selectImg', err);
    }
  }
}

export function selectColor(board, color) {
  return async dispatch => {
    try {
      console.log('hi***');
      const selectedColor = await boardService.selectColor(board, color)
      console.log('selectedColor:', selectedColor);
      dispatch({ type: 'SELECT_COLOR', selectedColor })
    }
    catch (err) {
      console.log('boardActions: err in selectColor', err);
    }
  }
}


export function updateCardLocation(board, cardId, source, destination) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateCardLocation(board, cardId, source, destination)
      dispatch({ type: 'SET_BOARD', board: updatedBoard })
    }
    catch (err) {
      console.log('boardActions: err in selectColor', err);
    }
  }
}

export function updateGroupLoaction(board, groupId, source, destination) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateGroupLoaction(board, groupId, source, destination)
      dispatch({ type: 'SET_BOARD', board: updatedBoard })
    }
    catch (err) {
      console.log('boardActions: err in selectColor', err);
    }
  }
}

export function editGroupTitle(board, group, groupTitle) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateGroupTitle(board, group, groupTitle)
      dispatch({ type: 'SET_BOARD', board: updatedBoard })
    }
    catch (err) {
      console.log('boardActions: err in selectColor', err);
    }
  }
}

export function copyList(board,group){
  return async dispatch => {
    try {
      const updatedBoard = await boardService.copyList(board,group)
      dispatch({ type: 'SET_BOARD', board:updatedBoard })
    }
    catch (err) {
      console.log('boardActions: err in selectColor', err);

    }
  }
}

export function setFilter(filterBy) {
  return (dispatch) => {
    const action = {
      type: 'SET_GROUPS_FILTER',
      filterBy
    }
    dispatch(action)
  }
}


export function editCurrLabel(currBoard, label, selectedColorLabel, act) {
  return async dispatch => {
    try {
      const board = await boardService.editCurrLabel(currBoard, label, selectedColorLabel, act)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in loadBoard', err);
    }
  }
}

