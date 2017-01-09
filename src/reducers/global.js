import update from 'immutability-helper'
import * as actionType from '../actions/global'
import { createReducer } from '../utils'

export default createReducer({
  systemStatus: {
    currentModule: "userList",
    menuShowType: true
  },
  loading: {
    status: false
  },
  message: {
    type: '',
    content: ''
  },
  countryList: [],
  dlChannel: [],
  dlAgency: [],
  registerFrom: []
}, {
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
  },

  //国家列表
  [actionType.FETCH_COUNTRYLIST_DATA](state, action) {
    return update(state, { countryList: { $set: action.data } })
  },
  //下拉选项列表
  [actionType.FETCH_SELECOPTIONTLIST_DATA](state, action) {
    return update(state, { $merge: {...(action.data) } })
  },
  [actionType.SET_MENU_DEFAULT_VALUE](state, action) {
    return update(state, { systemStatus: { currentModule: { $set: action.moduleName } } })
  },
})