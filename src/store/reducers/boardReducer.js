const initialState = {
  boards: [],
  board: {},
  loggedUser: {
    _id: "u101",
    username: "Tal",
    fullname: "Tal Tarablus",
    imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
  },
  isLabelOpen: false,
}


export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.board] }
    case 'SET_BOARD':
      return { ...state, board: action.board }
    case 'OPEN-LABELS':
      return { ...state, isLabelOpen: !state.isLabelOpen }
    case 'SET_GROUPS_FILTER':
      return { ...state, filterBy: action.filterBy }
    default:
      return state
  }
}

