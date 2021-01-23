const guestName =  'guest' + `${Math.random()}`.substring(4, 10)
const guest = {
    username: guestName,
    firstname: guestName,
    lastname: '',
    isGuest: true
}
const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser')) || JSON.parse(localStorage.getItem('loggedUser'))
const initialState = {
    loggedUser:  (loggedUser || guest),
    isLoged: !!loggedUser
}

console.log(initialState.loggedUser)
export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {...state, loggedUser: action.user,isLoged: true }
        case 'LOGOUT':
            return {...state, loggedUser: null, isLoged:false }
        default:
            return state
    }
}