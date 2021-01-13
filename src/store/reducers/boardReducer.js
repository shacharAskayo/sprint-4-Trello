const initialState = {
    boards: [],
    board: {}
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_BOARD':
            console.log(action.board);
            return {...state, board: action.board }
        default:
            return state
    }
}