import { boardService } from '../../services/boardService.js'
import { cardService } from '../../services/cardService.js'
import { socketService } from '../../services/socketService.js'

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

export function cleanBoard() {
  return async dispatch => {
    dispatch({ type: 'SET_BOARD', board: null })
    socketService.off('board update')
  }
}
export function updateBoard(board, newBoard) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_BOARD', board: newBoard }) //drag end drop deley
      boardService.updateBoard({ ...newBoard })
    }
    catch (err) {
      dispatch({ type: 'SET_BOARD', board }) // if server returns error 
      console.log('boardActions: could not save', err);
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
        dispatch({ type: 'SET_BOARD', board: updatedBoard })
      })
      return board
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
    return board
  }
}

export function addGroup(board, group) {
  return async dispatch => {
    try {
      const newBoard = await boardService.addGroup(board, group)
      dispatch({ type: 'SET_BOARD', board: newBoard })
      boardService.updateBoard(newBoard)
    }
    catch (err) {
      console.log('err in loadBoard', err)
      dispatch({ type: 'SET_BOARD', board })

    }
  }
}

export function addCard(board, group, cardToAdd) {
  return async dispatch => {
    try {
      const newBoard = await boardService.addCard(board, group, cardToAdd)
      dispatch({ type: 'SET_BOARD', board: newBoard })
      boardService.updateBoard(newBoard)
    }
    catch (err) {
      console.log('err in loadBoard', err)
      dispatch({ type: 'SET_BOARD', board })

    }
  }
}


export function updateBoardCard(board, card) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateBoardCard(board, card)
      console.log(updatedBoard);
      dispatch({ type: 'SET_BOARD', board: updatedBoard }) //drag end drop deley
      boardService.updateBoard({ ...updatedBoard })
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
      boardService.updateBoard(newBoard)
    }
    catch (err) {
      console.log('err in loadBoard', err)
      dispatch({ type: 'SET_BOARD', board })

    }
  }
}

export function updateCardLocation(board, source, destination) {
  return async dispatch => {
    try {
      const newBoard = await boardService.updateCardLocation(board, source, destination)
      dispatch({ type: 'SET_BOARD', board: newBoard })
      boardService.updateBoard(newBoard)
    }
    catch (err) {
      console.log('err in loadBoard', err)
      dispatch({ type: 'SET_BOARD', board })

    }
  }
}

export function updateGroupLoaction(board, groupId, source, destination) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateGroupLoaction(board, groupId, source, destination)
      dispatch({ type: 'SET_BOARD', board: updatedBoard }) //drag end drop deley
      console.log('the updated one', updatedBoard);
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
      const newBoard = await boardService.updateGroupTitle(board, group, groupTitle)
      dispatch({ type: 'SET_BOARD', board: newBoard })
      boardService.updateBoard(newBoard)
    }
    catch (err) {
      console.log('err in loadBoard', err)
      dispatch({ type: 'SET_BOARD', board })

    }
  }
}

export function copyList(board, group) {
  return async dispatch => {
    try {
      const newBoard = await boardService.copyList(board, group)
        dispatch({ type: 'SET_BOARD', board: newBoard })
        boardService.updateBoard(newBoard)
      }
      catch (err) {
        console.log('err in loadBoard', err)
        dispatch({ type: 'SET_BOARD', board })
  
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

export function editCurrLabel(board, label, selectedColorLabel, act) {
  return async dispatch => {
    try {
      const newBoard = await boardService.editCurrLabel(board, label, selectedColorLabel, act)
        dispatch({ type: 'SET_BOARD', board: newBoard })
        boardService.updateBoard(newBoard)
      }
      catch (err) {
        console.log('err in loadBoard', err)
        dispatch({ type: 'SET_BOARD', board })
  
      }
  }
}

export function moveCard(board, card, to) {
  return async dispatch => {
    try {
      const newBoard = await boardService.moveCard(board, card, to)
        dispatch({ type: 'SET_BOARD', board: newBoard })
        boardService.updateBoard(newBoard)
      }
      catch (err) {
        console.log('err in loadBoard', err)
        dispatch({ type: 'SET_BOARD', board })
  
      }
  }
}

export function onArchiveList(currBoard, currGroup) {
  return async dispatch => {
    try {
      const board = await boardService.archiveList(currBoard, currGroup)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in loadBoard', err);
    }
  }
}

export function onArchiveCard(currBoard, currGroup, card) {
  return async dispatch => {
    try {
      const board = await boardService.archiveCard(currBoard, currGroup, card)
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in loadBoard', err);
    }
  }
}

export function sortCards(currBoard, sortBy, group) {
  return async dispatch => {
    try {
      const board = await boardService.sortCards(currBoard, sortBy, group)
      console.log('board in action after changes', board);
      dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in loadBoard', err);
    }
  }
}

export function moveGroup(boards,currBoard, currGroup,  destinationBoard, position) {
  return async dispatch => {
    try {
      const board = await boardService.moveGroup(boards,currBoard, currGroup, destinationBoard, position)
      // dispatch({ type: 'SET_BOARD', board })
    }
    catch (err) {
      console.log('err in loadBoard', err);
    }
  }
}