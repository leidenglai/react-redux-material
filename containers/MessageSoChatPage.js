import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash';
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { global } from '../actions'
import { dateFormat } from '../utils'

import Paper from 'material-ui/Paper';
import { grey700, grey50, grey300, lightBlack, cyan500 } from 'material-ui/styles/colors'
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class MessageSoChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessage: '',
      myUserId: "uu123654",
      myUserName: "Denlai",
      contactList: {
        style: {
          width: "100%"
        },
        secondaryTextLines: 2
      },
      contactListData: [
        {
          "userId": "uu123sd5f4ee3a22df54",
          "userName": "Vincent",
          "avatar": "https://avatars2.githubusercontent.com/u/11383747?v=3&s=460",
          "message": {
            "msgId": "5I02W-16-8278a", //消息ID
            "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
            "payload": {
              "bodies": [ //消息bodies
                {
                  "msg": "Hi Vincent, how are you? How is the project coming along?", //消息内容
                  "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
                      }
                    ]
            },
            "timestamp": 1403099033211, //消息发送时间
          }
        },
      ],
      messageList: [
        {
          "type": "chatmessage",
          "from": "test123", //发送人username
          "fromId": "uu123111", //发送人Id
          "msgId": "5I02W-16-8278a", //消息ID
          "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
          "payload": {
            "bodies": [ //消息bodies
              {
                "msg": "hhhhhh", //消息内容
                "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
                }
              ]
          },
          "timestamp": 1403099033211, //消息发送时间
          "to": "uu123" //接收人的Id或者接收group的ID
        }
      ]
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.messageList.length !== this.state.messageList.length) {
      const node = ReactDOM.findDOMNode(this.refs.messageScroll);
      if (node) {
        node.scrollTop = node.scrollHeight
      }
    }
  }
  handleOpenChat = (event) => {
    const { contactList } = this.state;
    this.setState({
      contactList: update(contactList, {
        style: { width: { $set: 250 } },
        secondaryTextLines: { $set: 1 }
      })
    });
  };

  handleSubmitSend = event => {
    event.stopPropagation();
    event.preventDefault();
    const msg = {
      "targetType": "users",
      "target": ["uu123"],
      "content": {
        "type": "txt",
        "msg": this.state.sendMessage
      },
      "fromId": this.state.myUserId
    }

    this.setState(update(this.state, {
      messageList: {
        $push: [{
          "type": "chatmessage",
          "from": this.state.myUserName, //发送人username
          "fromId": this.state.myUserId, //发送人Id
          "msgId": "", //消息ID
          "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
          "payload": {
            "bodies": [ //消息bodies
              {
                "msg": this.state.sendMessage, //消息内容
                "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
                }
              ]
          },
          "timestamp": new Date(), //消息发送时间
          "to": "uu123" //接收人的Id或者接收group的ID
        }]
      }
    }), () => this.setState({ sendMessage: '' }));
  };

  handleSendMessageChange = (event, newValue) => {
    this.setState({
      [event.target.name]: newValue
    });
  };

  messageContentNode = (item, key) => {
    if (item.fromId === this.state.myUserId) {
      return (<div key={key} className="msg-li mag-right">
        <div className="msg-title text-left"><span className="msg-data-time">{dateFormat(item.timestamp)}</span>&nbsp;&nbsp;<span className="msg-data-name">{item.from}</span></div>
        <div className="msg-content text-left">
          <p>{item.payload.bodies[0].msg}</p>
        </div>
      </div>)
    } else {
      return (<div key={key} className="msg-li mag-left">
        <div className="msg-title text-left"><span className="msg-data-name">{item.from}</span>&nbsp;&nbsp;<span className="msg-data-time">{dateFormat(item.timestamp)}</span></div>
        <div className="msg-content text-left">
          <p>{item.payload.bodies[0].msg}</p>
        </div>
      </div>)
    }
  }

  render() {
    const { contactList, messageList } = this.state;
    // const { usersListData } = this.props;
    const usersListData = this.state.contactListData;
    return (<Paper className="container-fluid" zDepth={1} style={styles.paper}>
      <div className="contact-list" style={{...styles.contactList, ...contactList.style}}>
        <List>
          {usersListData.map((user, key)=> (
            <ListItem
              key={key}
              style={styles.listItem}
              leftAvatar={<Avatar src={user.avatar} />}
              primaryText={user.userName}
              secondaryText={
                <p style={{color: grey50}}>
                  <small style={{color: grey300}}>{dateFormat(user.message.timestamp)}</small><br/>
                  <span>{user.message.payload.bodies[0].msg}</span>
                </p>
              }
              secondaryTextLines={contactList.secondaryTextLines}
              rightIcon={ <span style={styles.msgBadge}>4</span> }
              onTouchTap={this.handleOpenChat}
            />
          ))}
        </List>
      </div>
      <div className="chat-interface" style={styles.chatInterface}>
        <div className="c-i-top">          
          <ListItem
            style={styles.chatListItem}
            disabled={true}
            leftAvatar={<Avatar src="https://avatars2.githubusercontent.com/u/11383747?v=3&s=460" />}
            primaryText="User Name"
            secondaryText={
              <p>
                <small style={{color: grey700}}>userId: uu12345678</small><br/>
              </p>
            }
          />
        </div>
        <Divider />
        <div className="c-i-content">          
          <div className="msg-list" id="Message" ref="messageScroll">
            <div className="scroll">
              {messageList.map(this.messageContentNode)}
            </div>
          </div>
          <Divider/>
          <div className="msg-send-box" id="sendBox">
            <form id="sendMessage" className="msg-send-form" onSubmit={this.handleSubmitSend}>
              <div className="msg-send-input">
                <TextField
                  name="sendMessage"
                  value={this.state.sendMessage}
                  onChange={this.handleSendMessageChange}
                  multiLine={true}
                  rows={3}
                  rowsMax={3}
                  fullWidth={true}
                  inputStyle={{paddingLeft: 20}}
                  underlineStyle={{bottom: 0}}
                />
              </div>
              <div className="msg-send-btn">
                <IconButton iconClassName="fa fa-send-o" type="submit" iconStyle={{color:cyan500}} tooltip="Send" tooltipPosition="top-center" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Paper>);
  }
}
const styles = {
  paper: {
    margin: 20,
    minHeight: 600,
    display: "flex",
    padding: 0
  },
  listItem: {
    color: "#FFF"
  },
  contactList: {
    minWidth: 250,
    backgroundColor: grey700
  },
  chatInterface: {
    flex: 1,
    overflow: "hidden",
  },
  chatListItem: {

  },
  msgBadge: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 12,
    top: "50%",
    margin: 12,
    marginTop: -12,
    fontWeight: 500,
    fontSize: 12,
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: "rgb(255, 64, 129)",
    color: "rgb(255, 255, 255)",
  }
}
MessageSoChatPage.defaultProps = {
  usersListData: [],
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(MessageSoChatPage)