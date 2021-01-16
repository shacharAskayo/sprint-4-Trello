import { combineReducers } from 'redux'
import { reviewReducer } from './reviewReducer'
import { userReducer } from './userReducer'
import { boardReducer } from './boardReducer'
import { systemReducer } from './systemReducer'
import { cardReducer } from './cardReducer'
import { menuReducer } from '../reducers/menuReducer'

export const rootReducer = combineReducers({
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  userModule: userReducer,
  boardModule: boardReducer,
  cardModule: cardReducer,
  menuModule: menuReducer
})
