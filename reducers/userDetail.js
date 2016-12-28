import update from 'immutability-helper'
import * as actionType from '../actions/userDetail'
import { PROLOADED_USERDETAIL_DATA } from '../actions/userList'
import { createReducer } from '../utils'

export default createReducer({}, {
  // 获取页面数据
  [actionType.FETCH_USERDETAIL_DATA_REQUEST](state, action) {
    return state
  },
  [actionType.FETCH_USERDETAIL_DATA_SUCCESS](state, action) {
    return Object.assign({}, state, action.data);
  },
  [actionType.FETCH_USERDETAIL_DATA_ERROR](state, action) {
    return state
  },
  [PROLOADED_USERDETAIL_DATA](state, action) {
    return Object.assign({}, state, action.data);
  }
})