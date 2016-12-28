import update from 'immutability-helper'
import * as actionType from '../actions/orderList'
import { createReducer } from '../utils'

export default createReducer({
  orderList: [],
  pageNum: 1,
  pageSize: 20,
  totalCount: 0
}, {
  // 获取页面数据
  [actionType.FETCH_ORDERLIST_DATA_REQUEST](state, action) {
    return state
  },
  [actionType.FETCH_ORDERLIST_DATA_SUCCESS](state, action) {
    return Object.assign({}, state, action.data);
  },
  [actionType.FETCH_ORDERLIST_DATA_ERROR](state, action) {
    return state
  },
  //预加载数据
  [actionType.PROLOADED_USERDETAIL_DATA](state, action) {
    return Object.assign({}, state, action.data);
  },
})