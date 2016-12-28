import update from 'immutability-helper'
import * as actionType from '../actions/userList'
import { createReducer } from '../utils'

export default createReducer({
  userList: [],
  pageNum: 1,
  pageSize: 40,
  totalCount: 0
}, {
  // 获取页面数据
  [actionType.FETCH_USERLIST_DATA_REQUEST](state, action) {
    return state
  },
  [actionType.FETCH_USERLIST_DATA_SUCCESS](state, action) {
    return Object.assign({}, state, action.data);
  },
  [actionType.FETCH_USERLIST_DATA_ERROR](state, action) {
    return state
  },
})