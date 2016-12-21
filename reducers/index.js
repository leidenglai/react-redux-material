import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import globalReducer from './global'
import userListReducer from './userList'

const rootReducer = combineReducers({
  routing: routerReducer,
  global: globalReducer,
  userList: userListReducer,
})

export default rootReducer