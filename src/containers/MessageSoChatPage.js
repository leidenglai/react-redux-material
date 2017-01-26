import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash';
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { messageSoChat } from 'actions'
import { dateFormat } from '../utils'
import { Link } from 'react-router'

import Paper from 'material-ui/Paper';
import { grey700, grey50, grey300, lightBlack, cyan500 } from 'material-ui/styles/colors'
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import ReactPaginate from 'react-paginate';

class MessageSoChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.scrollLock = false; //标记是否需要到消息底部，也就是最新消息
    this.scrollPositionWithBottom = 0; //定位消息位置

    this.state = {
      slideIndex: 0,
      startTime: '',
      endTime: '',

      sendMessage: '',
      myUserId: "uu123654",
      myUserName: "Denlai",
      contactList: {
        style: {
          width: "100%"
        }
      },
      userInfo: {},
      messageTopTxt: "更早的消息"
    }
  }

  getTodayTimestamp = (hours = 0, format = true) => {
    let date = new Date(); //获取当前Date对象
    // var date = new Date('2020/10/10 11:22:33'); 
    // 获取指定时间的Date对象，这里只能用"2020/10/10"格式，其他格式如"2020-10-10"浏览器兼容性不好
    date.setHours(hours);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0)

    return format ? Math.floor(date.getTime() / 1000) : date; //1477670400
  }

  componentDidMount() {
    const { dispatch } = this.props;

    //默认获取未读列表
    const params = {
      state: 0, //0-查询未读列表，1-查询已读列表，2-查询已回复列表
      pageNum: 0,
      pageSize: 6
    }

    dispatch(messageSoChat.fetchMessagesListData(params));
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, slideIndex } = this.state;
    if (userInfo.userId && nextProps.messageChatList[userInfo.userId].msgList.length !== this.props.messageChatList[userInfo.userId].msgList.length) {
      let _node = ReactDOM.findDOMNode(this.refs["messageScroll-" + slideIndex]);
      this.scrollPositionWithBottom = _node.scrollHeight - _node.scrollTop;
      this.scrollLock = true;
    }
  }

  componentDidUpdate() {
    const { slideIndex } = this.state;

    //使页面显示底部最新消息
    if (this.scrollLock) {
      let _node = ReactDOM.findDOMNode(this.refs["messageScroll-" + slideIndex]);
      if (_node) {
        _node.scrollTop = _node.scrollHeight - this.scrollPositionWithBottom;

        this.scrollLock = false;
        this.scrollPositionWithBottom = 0;
      }
    }
  }

  handleOpenChat = (userInfo, event) => {
    const { contactList, slideIndex } = this.state;
    const { dispatch, messageChatList } = this.props;
    this.setState({
      contactList: update(contactList, {
        style: { width: { $set: 270 } }
      }),
      userInfo
    });

    this.scrollLock = true;

    if (!messageChatList[userInfo.userId]) {
      //初始化消息数据
      dispatch(messageSoChat.fetchMessagesInitData(userInfo));
    }
  }

  handleClearChat = (event) => {
    const { contactList } = this.state;
    this.setState({
      contactList: update(contactList, {
        style: { width: { $set: "100%" } }
      })
    });
  }


  //获取历史消息
  handleHistoryMessage = (start, event) => {
    const { dispatch, messageChatList } = this.props;
    const { slideIndex, userInfo } = this.state;

    const params = {
      userId: userInfo.userId,
      start: start,
      end: start + 10
    }

    dispatch(messageSoChat.fetchMessagesHistoryData(params));
  }

  handleSendMessageChange = (event, newValue) => {
    this.setState({
      [event.target.name]: newValue
    });
  }

  handleSubmitSend = event => {
    event.stopPropagation();
    event.preventDefault();
    if (!this.state.sendMessage) return false;

    const { admin, dispatch } = this.props;

    dispatch(messageSoChat.sendMessagesData({
      userId: this.state.userInfo.userId,
      operator: admin.username,
      content: encodeURIComponent(this.state.sendMessage),
      timestamp: Math.floor((new Date()).getTime() / 1000)
    }))

    this.setState({ sendMessage: '' });

    this.scrollLock = true;
  }

  messageContentNode = (item, key) => {
    const { admin } = this.props;

    if (item.fromUser === admin.username) {
      return (<div key={key} className="msg-li mag-right">
        <div className="msg-title text-left"><span className="msg-data-time">{dateFormat(item.timestamp*1000)}</span>&nbsp;&nbsp;<span className="msg-data-name">{item.fromUser}</span></div>
        <div className="msg-content text-left">
          <p>{decodeURIComponent(item.payload.bodies[0].msg)}</p>
        </div>
      </div>)
    } else {
      return (<div key={key} className="msg-li mag-left">
        <div className="msg-title text-left"><span className="msg-data-name">{item.fromUser}</span>&nbsp;&nbsp;<span className="msg-data-time">{dateFormat(item.timestamp*1000)}</span></div>
        <div className="msg-content text-left">
          <p>{decodeURIComponent(item.payload.bodies[0].msg)}</p>
        </div>
      </div>)
    }
  }

  handleSearchSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { dispatch } = this.props;

    //默认获取未读列表
    const params = {
      state: this.state.slideIndex, //0-查询未读列表，1-查询已读列表，2-查询已回复列表
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      pageNum: 0,
      pageSize: 6
    }

    dispatch(messageSoChat.fetchMessagesListData(params));
  }

  // 开始时间
  selectStartData = (event, date) => this.setState({ startTime: ((new Date(date)).getTime() / 1000) })

  // 结束时间
  selectEndData = (event, date) => this.setState({ endTime: ((new Date(date)).getTime() / 1000) })

  // 禁止选择日期
  disableRandomDates = (date) => ((!!this.state.startTime && ((new Date(date)).getTime() / 1000) < this.state.startTime) ? true : false)

  handlePageClick = (value) => {
    const { dispatch } = this.props;

    //默认获取未读列表
    const params = {
      state: this.state.slideIndex, //0-查询未读列表，1-查询已读列表，2-查询已回复列表
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      pageNum: value.selected,
      pageSize: 6
    }

    dispatch(messageSoChat.fetchMessagesListData(params));
  }

  getLoadMoreNode = (data) => {
    if (!data) return false;
    if (data.end >= data.total) {
      return (
        <div className="load-more">已无更多</div>
      )
    } else {
      return (
        <div className="load-more" onTouchTap={this.handleHistoryMessage.bind(this, data.end)}><a href="javascript:;">更早的消息</a></div>
      )
    }
  }

  getMessageViews = (item, key) => {
    const { contactList, messageList, userInfo } = this.state;
    const { messageChatList } = this.props;
    const thisUserMessages = messageChatList[userInfo.userId];

    return (
      <div>
        <div className="messagesBox" style={styles.messagesBox}>
          <div className="contact-list" style={{...styles.contactList, ...contactList.style}}>
            <List style={styles.messagesList}>
              {item.msgList.map((user, key)=> (
                <ListItem
                  key={key}
                  style={styles.listItem}
                  leftAvatar={<Avatar src={user.headImg} />}
                  primaryText={"User：" + user.nickName}
                  secondaryText={
                    <p style={{color: grey50}}>
                      <small style={{color: grey300}}>{dateFormat(user.requestTime * 1000)}</small>
                      <span> {user.content}</span>
                    </p>
                  }
                  rightIcon={ user.unreadSum > 0 ? (<span style={styles.msgBadge}>{user.unreadSum}</span>) : <span></span> }
                  onTouchTap={this.handleOpenChat.bind(this, user)}
                />
              ))}
            </List>
          </div>
          <div className="chat-interface" style={styles.chatInterface}>
            <div className="c-i-top">
              <Link to={"/userDetail?userId=" + userInfo.userId}>
                <ListItem
                  style={styles.chatListItem}
                  disabled={true}
                  leftAvatar={<Avatar src={userInfo.headImg} />}
                  primaryText={userInfo.nickName}
                  secondaryText={
                    <p>
                      <small style={{color: grey700}}>UserId: {userInfo.userId}</small><br/>
                    </p>
                  }
                />
              </Link>
            </div>
            <Divider />
            <div className="c-i-content">          
              <div className="msg-list so-chat-message" ref={"messageScroll-" + key}>
                <div className="scroll">
                  {this.getLoadMoreNode(thisUserMessages)}
                  { thisUserMessages && thisUserMessages.msgList.map(this.messageContentNode)}
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
        </div>
        <div className="paginate">
          <ReactPaginate previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={<a href="javascript:;">...</a>}
            breakClassName={"break-me"}
            pageCount={item.totalCount/item.pageSize === 0 ? 1 : Math.ceil(item.totalCount/item.pageSize)}
            marginPagesDisplayed={5}
            pageRangeDisplayed={2}
            forcePage={item.pageNum}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
          
        </div>
      </div>
    );
  }

  handleTabChange = (value) => {
    const { dispatch } = this.props;

    this.handleClearChat();

    this.setState({
      slideIndex: value,
    });

    //默认获取未读列表
    const params = {
      state: value, //0-查询未读列表，1-查询已读列表，2-查询已回复列表
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      pageNum: 0,
      pageSize: 6
    }

    dispatch(messageSoChat.fetchMessagesListData(params));
  };

  render() {
    const { messagesList } = this.props;
    return (<Paper className="container-fluid" zDepth={1} style={styles.paper}>      
      <form id="userListSearch" className="row" style={styles.userListSearchForm} onSubmit={this.handleSearchSubmit.bind(this)}>
        <div className="col-xs-12 text-left" style={styles.datePickerBox}>
          <DatePicker 
            className="col-xs-6"
            hintText="开始时间"
            container="inline"
            autoOk={true}
            onChange={this.selectStartData} />
            <DatePicker 
            className="col-xs-6"
            hintText="结束时间"
            container="inline"
            autoOk={true}
            onChange={this.selectEndData}
            shouldDisableDate={this.disableRandomDates} />
        </div>
        <RaisedButton
          label="Search"
          style={styles.searchBtn}
          className="col-xs-2 no-padding"
          icon={<FontIcon style={styles.searchBtnIcon} className="fa fa-search" />}
          type="submit"
        />
      </form>
      <Tabs
        onChange={this.handleTabChange}
        value={this.state.slideIndex}
      >
        <Tab label="未读消息" value={0} />
        <Tab label="已读消息" value={1} />
        <Tab label="已回消息" value={2} />
      </Tabs>
      <SwipeableViews
        index={this.state.slideIndex}
        onChangeIndex={this.handleChange}
      >
        {this.getMessageViews(messagesList.msgUnread, 0)}
        {this.getMessageViews(messagesList.msgIsread, 1)}
        {this.getMessageViews(messagesList.msgReplied, 2)}
      </SwipeableViews>
    </Paper>);
  }
}
const styles = {
  paper: {
    margin: 20,
    padding: 0
  },
  messagesList: {
    height: "100%",
    padding: 0
  },
  listItem: {
    color: "#FFF",
    height: 75
  },
  messagesBox: {
    display: "flex",
    height: 450
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
  },
  searchBtn: {
    width: 150,
    padding: 0
  },
  searchBtnIcon: {
    fontSize: 18
  },
  datePickerBox: {
    width: "auto"
  },
  userListSearchForm: {
    marginTop: 8
  }
}
MessageSoChatPage.defaultProps = {
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
}

const mapStateToProps = (state) => {
  return {
    admin: state.global.admin,
    messagesList: state.messageSoChat.messagesList,
    messageChatList: state.messageSoChat.messageChatList
  }
}

export default connect(mapStateToProps)(MessageSoChatPage);