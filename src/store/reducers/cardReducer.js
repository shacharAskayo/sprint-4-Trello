

const initialState = {
    cards: [],
    card:{}
  }
  
  export function cardReducer(state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_CARDS':
        return { ...state, cards: action.cards }
      case 'ADD_CARD':
        return { ...state, cards: [...state.cards,action.card] }

      default:
        return state
    }
  }