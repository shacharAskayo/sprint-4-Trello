const initialState = {
  boards: [],
  board: {},
  isLabelOpen: false
}

export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: action.board }
    case 'OPEN-LABELS':
      return { ...state, isLabelOpen: !state.isLabelOpen }
    default:
      return state
  }
}

