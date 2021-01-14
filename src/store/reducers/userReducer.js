let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  loggedInUser: localLoggedinUser,
  users: [],
  user: ''
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'SET_SCORE':
      return { ...state, loggedInUser: { ...state.loggedInUser, score: action.score } }
    case 'GET_USER':
      return { ...state, user: action.user }
    default:
      return state
  }
}
