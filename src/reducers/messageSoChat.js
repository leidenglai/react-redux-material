import update from 'immutability-helper'
import * as actionType from '../actions/messageSoChat'
import { createReducer } from '../utils'

export default createReducer({
  messagesList: {
    msgUnread: { //未读
      msgList: [],
      pageNum: 0,
      pageSize: 6,
      totalCount: 0
    },
    msgIsread: { //已读
      msgList: [],
      pageNum: 0,
      pageSize: 6,
      totalCount: 0
    },
    msgReplied: { //已回复
      msgList: [],
      pageNum: 0,
      pageSize: 6,
      totalCount: 0
    },
  },
  messageChatList: {}
}, {
  // 获取页面数据
  [actionType.FETCH_MESSAGESLIST_DATA_REQUEST](state, action) {
    return state
  },
  [actionType.FETCH_MESSAGESLIST_DATA_SUCCESS](state, action) {
    const stateMap = ["msgUnread", "msgIsread", "msgReplied"];
    return update(state, {
      messagesList: {
        [stateMap[action.state]]: {
          $set: action.data
        }
      }
    })
  },
  [actionType.FETCH_MESSAGESLIST_DATA_ERROR](state, action) {
    return state
  },
  [actionType.FETCH_MESSAGES_INIT](state, action) {
    return update(state, {
      messageChatList: {
        $merge: {
          [action.userId]: action.data
        }
      }
    })
  },
  [actionType.FETCH_MESSAGES_HISTORY](state, action) {
    return update(state, {
      messageChatList: {
        [action.userId]: {
          msgList: { $unshift: action.data.msgList },
          end: { $set: action.data.end },
          total: { $set: action.data.totalCount }
        }
      }
    })
  },
  [actionType.SEND_MESSAGES](state, action) {
    return update(state, {
      messageChatList: {
        [action.userId]: {
          msgList: { $push: action.data },
          end: { $apply: x => ++x }
        }
      }
    })
  },
})