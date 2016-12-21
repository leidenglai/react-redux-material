import update from 'immutability-helper'
import * as actionType from '../actions/global'
import { createReducer } from '../utils'

export default createReducer({
  timeRange: 1,
  business: 'all',
  platform: 'pc',
  loading: {
    status: false
  },
  message: {
    type: '',
    content: ''
  }
}, {

  // 用户数据
  [actionType.GLOBAL_GET](state, action) {
    return update(state, { $merge: {...action } })
  },
  [actionType.GLOBAL_SET](state, action) {
    return update(state, { $merge: {...action } })
  },

  //loading动画
  [actionType.SHOW_LOADING](state) {
    return update(state, { loading: { status: { $set: true } } })
  },
  [actionType.HIDE_LOADING](state) {
    return update(state, { loading: { status: { $set: false } } })
  },

  //消息提示
  [actionType.SNACKBAR_MESSAGE_SHOW](state, action) {
    return update(state, { message: { $merge: {...(action.content) } } })
  },
  [actionType.SNACKBAR_MESSAGE_HIDE](state) {
    return update(state, { message: { $set: { content: '', type: '' } } })
  }
})