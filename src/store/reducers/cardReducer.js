const initialState = {
    cards: [],
    card:{}
  }
  
  export function cardReducer(state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_REVIEWS':
        return { ...state, reviews: action.reviews }

      default:
        return state
    }
  }