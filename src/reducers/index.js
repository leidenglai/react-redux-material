import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import globalReducer from './global'
import userListReducer from './userList'
import messageSoChatReducer from './messageSoChat'

const rootReducer = combineReducers({
  routing: routerReducer,
  global: globalReducer,
  usersData: userListReducer,
  messageSoChat: messageSoChatReducer
});

export default rootReducer;