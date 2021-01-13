const initialState = {
  boards: [],
  board: {},
  isLabelOpen: false,
  bgImg: '',
  bgColor: ''
}

export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'SET_BOARD':
      return { ...state, board: action.board }
    case 'OPEN-LABELS':
      return { ...state, isLabelOpen: !state.isLabelOpen }
    case 'SELECT_IMG':
      return { ...state, bgImg: action.bgImg }
    case 'SELECT_COLOR':
      return { ...state, bgColor: action.bgColor }
    default:
      return state
  }
}

