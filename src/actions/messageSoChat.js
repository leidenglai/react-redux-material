import { packOptionsToFetch, responseHandler } from '../utils';

/**
 * 获取UserList数据
 */
export const FETCH_MESSAGESLIST_DATA_REQUEST = "FETCH_MESSAGESLIST_DATA_REQUEST"
export const FETCH_MESSAGESLIST_DATA_SUCCESS = "FETCH_MESSAGESLIST_DATA_SUCCESS"
export const FETCH_MESSAGESLIST_DATA_ERROR = "FETCH_MESSAGESLIST_DATA_ERROR"
export const FETCH_MESSAGES_INIT = "FETCH_MESSAGES_INIT"
export const FETCH_MESSAGES_HISTORY = "FETCH_MESSAGES_HISTORY"
export const SEND_MESSAGES = "SEND_MESSAGES"


export function fetchMessagesListDataStart() {
  return {
    type: FETCH_MESSAGESLIST_DATA_REQUEST
  }
}

export function fetchMessagesListDataSuccess(data, state) {
  return {
    type: FETCH_MESSAGESLIST_DATA_SUCCESS,
    data,
    state
  }
}

export function fetchMessagesListDataError(error) {
  return {
    type: FETCH_MESSAGESLIST_DATA_ERROR,
    error
  }
}


export function fetchMessagesListData(params) {
  return dispatch => {
    dispatch(fetchMessagesListDataStart())

    packOptionsToFetch('/sosec/sosecList', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
          dispatch(fetchMessagesListDataSuccess(data, params.state))
        },
        function(errorMsg) {
          dispatch(fetchMessagesListDataError(errorMsg))
        }
      );
  }
}

export function fetchMessagesInit(data, userId) {
  return {
    type: FETCH_MESSAGES_INIT,
    data,
    userId
  }
}

export function fetchMessagesHistory(data, userId) {
  return {
    type: FETCH_MESSAGES_HISTORY,
    data,
    userId
  }
}

export function sendMessages(data, userId) {
  return {
    type: SEND_MESSAGES,
    data,
    userId
  }
}

export function fetchMessagesInitData(params) {
  return dispatch => {
    const messageData = {
      msgList: [
        {
          "type": "chatmessage",
          "fromUser": params.nickName, //发送人username
          "fromId": params.userId, //发送人Id
          "msgId": "", //消息ID
          "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
          "payload": {
            "bodies": [ //消息bodies
              {
                "msg": params.content, //消息内容
                "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
                }
              ]
          },
          "timestamp": params.requestTime, //消息发送时间
          "to": "" //接收人的Id或者接收group的ID
        }
      ],
      start: 0,
      end: 1
    };

    dispatch(fetchMessagesInit(messageData, params.userId));

    // 标记已读
    packOptionsToFetch('/sosec/msgDetail', {
        userId: params.userId,
        start: 0,
        end: 1
      })
      .then(responseHandler(dispatch))
      .then(function(data) {
        console.log('消息已读');
      });
  }
}

export function fetchMessagesHistoryData(params) {
  return dispatch => {
    packOptionsToFetch('/sosec/msgDetail', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
        dispatch(fetchMessagesHistory(data, params.userId))
      });
  }
}

export function sendMessagesData(params) {
  return dispatch => {
    const messageData = [
      {
        "type": "chatmessage",
        "fromUser": params.operator, //发送人username
        "fromId": "", //发送人Id
        "msgId": "", //消息ID
        "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
        "payload": {
          "bodies": [ //消息bodies
            {
              "msg": params.content, //消息内容
              "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
            }
          ]
        },
        "timestamp": params.timestamp, //消息发送时间
        "to": params.userId //接收人的Id或者接收group的ID
      }
    ];

    dispatch(sendMessages(messageData, params.userId));

    //发送消息
    packOptionsToFetch('/sosec/msgReply', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
        console.log('消息发送成功');
      }, function(data) {
        alert('发送失败：' + params.content);
      });
  }
}