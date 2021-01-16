const initialState = {
    filterBy: ''
}

export function menuReducer(state = initialState, action) {
    switch (action.type) {
        case 'FILTER_PHOTOS':
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}