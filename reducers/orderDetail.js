import update from 'immutability-helper'
import * as actionType from '../actions/orderDetail'
import { createReducer } from '../utils'

export default createReducer({
  orderData: {},
  buyerData: {},
  sellerData: {}
}, {
  // 获取页面数据
  [actionType.FETCH_ORDERDETAIL_DATA_REQUEST](state, action) {
    return state
  },
  [actionType.FETCH_ORDERDETAIL_DATA_SUCCESS](state, action) {
    return update(state, { orderData: { $set: action.data } })
  },
  [actionType.FETCH_ORDERDETAIL_DATA_ERROR](state, action) {
    return state
  },
  [actionType.FETCH_BUYERDETAIL_DATA](state, action) {
    return update(state, { buyerData: { $set: action.data } })
  },
  [actionType.FETCH_SELLERDETAIL_DATA](state, action) {
    return update(state, { sellerData: { $set: action.data } })
  }
})