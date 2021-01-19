import { boardService } from '../../services/boardService.js'
import { cardService } from '../../services/cardService.js'
import { socketService } from '../../services/socketService.js'

export function loadBoards() {
  console.log('actions got req')
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
      socketService.emit('join board', board._id)
      dispatch({ type: 'SET_BOARD', board })
      socketService.on('board update', updatedBoard => {
        console.log('got socket event');
        dispatch({ type: 'SET_BOARD', updatedBoard })
      })
    }
    catch (err) {
      console.log('err in loadBoard', err)
    }
  }
}

export function addBoard(newBoard) {
  return async dispatch => {
    const board = await boardService.addBoard(newBoard)
    dispatch({ type: 'ADD_BOARD', board })
  }
}

export function addGroup(board, group) {
  return async dispatch => {
    try {
      const newBoard = await boardService.addGroup(board, group)
      dispatch({ type: 'SET_BOARD', board: newBoard })
    }
    catch (err) {
      console.log('err in loadBoard', err)
    }
  }
}

export function addCard(board, group, cardToAdd) {
  return async dispatch => {
    try {
      const newBoard = await boardService.addCard(board, group, cardToAdd)
      dispatch({ type: 'SET_BOARD', board: newBoard })
    }
    catch (err) {
      console.log('err in loadBoard', err)
    }
  }
}


export function updateBoardCard(board, card) {
  return async dispatch => {
    try {
      const updatedBoard =  await boardService.updateBoardCard(board, card)
      console.log(updatedBoard);
      dispatch({ type: 'SET_BOARD', board: updatedBoard }) //drag end drop deley
      boardService.updateBoard({...updatedBoard})
    }
    catch (err) {
      dispatch({ type: 'SET_BOARD', board }) // if server returns error 
      console.log('boardActions: could not save', err);
    }

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
      const newBoard = await boardService.setStyle(board, background)
      dispatch({ type: 'SET_BOARD', board: newBoard })
    }
    catch (err) {
      console.log('boardActions: err in loadboards', err);
    }
  }
}

export function updateCardLocation(board, source, destination) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateCardLocation(board, source, destination)
      dispatch({ type: 'SET_BOARD', board: updatedBoard })
      boardService.updateBoard(updatedBoard)
    }
    catch (err) {
      console.log('boardActions: err in selectColor', err);
    }
  }
}

export function updateGroupLoaction(board, groupId, source, destination) {
  return async dispatch => {
    try {
      const updatedBoard = boardService.updateGroupLoaction(board, groupId, source, destination)
      dispatch({ type: 'SET_BOARD', board: updatedBoard }) //drag end drop deley
      boardService.updateBoard(updatedBoard)
    }
    catch (err) {
      dispatch({ type: 'SET_BOARD', board }) // if server returns error 
      console.log('boardActions: could not save', err);
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
      console.log('err in loadBoard', err)
    }
  }
}

export function moveCard(currBoard, card, to) {
  return async dispatch => {
    try {
      const board = await boardService.moveCard(currBoard, card, to)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in moving card', err)
    }
  }
}

