import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import globalReducer from './global'
import userListReducer from './userList'
import userDetailReducer from './userDetail'
import orderListReducer from './orderList'
import orderDetailReducer from './orderDetail'

const rootReducer = combineReducers({
  routing: routerReducer,
  global: globalReducer,
  usersData: userListReducer,
  userDetail: userDetailReducer,
  ordersData: orderListReducer,
  orderDetail: orderDetailReducer
});

export default rootReducer;