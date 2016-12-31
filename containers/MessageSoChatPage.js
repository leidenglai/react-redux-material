import React from 'react'
import _ from 'lodash';
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { global } from '../actions'

import Paper from 'material-ui/Paper';
import { grey700, grey50, grey300, lightBlack } from 'material-ui/styles/colors'
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class MessageSoChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: {
        style: {
          width: "100%"
        },
        secondaryTextLines: 2
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  handleOpenChat = (event) => {
    const { contactList } = this.state;
    this.setState({
      contactList: update(contactList, {
        style: { width: { $set: 250 } },
        secondaryTextLines: { $set: 1 }
      })
    });
  }

  render() {
    const { contactList } = this.state;
    return (<Paper className="container-fluid" zDepth={1} style={styles.paper}>
      <div className="contact-list" style={{...styles.contactList, ...contactList.style}}>
        <List>
          <ListItem
            style={styles.listItem}
            leftAvatar={<Avatar src="https://avatars2.githubusercontent.com/u/11383747?v=3&s=460" />}
            primaryText="User Name"
            secondaryText={
              <p style={{color: grey50}}>
                <small style={{color: grey300}}>2016/12/31 16:47</small><br/>
                <span>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</span>
              </p>
            }
            secondaryTextLines={contactList.secondaryTextLines}
            rightIcon = { <span style={styles.msgBadge}>4</span> }
            onTouchTap={this.handleOpenChat}
          />
          <ListItem
            style={styles.listItem}
            leftAvatar={<Avatar src="https://avatars2.githubusercontent.com/u/11383747?v=3&s=460" />}
            primaryText={
              <p>Denglai Lei</p>
            }
            secondaryText={
              <p style={{color: grey50}}>
                <small style={{color: grey300}}>2016/12/30 12:09</small><br/>
                <span>Wish I could come, but I&apos;m out of town this weekend.</span>
              </p>
            }
            secondaryTextLines={contactList.secondaryTextLines}
          />
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
          <div className="msg-list" id="Message">
            <ul>
              <li className="msg-li mag-right">
                <div className="msg-title text-left"><span className="msg-data-time">2016/12/30 12:09</span>&nbsp;&nbsp;<span className="msg-data-name">Denglai</span></div>
                <div className="msg-content text-left">
                  <p>Hi Vincent, how are you? How is the project coming along?</p>
                </div>
              </li>
              <li className="msg-li mag-left">
                <div className="msg-title text-left"><span className="msg-data-name">Vincent</span>&nbsp;&nbsp;<span className="msg-data-time">2016/12/30 12:10</span></div>
                <div className="msg-content text-left">
                  <p>Are we meeting today? Project has been already finished and I have results to show you.</p>
                </div>
              </li>
            </ul>
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
MessageSoChatPage.defaultProps = {}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(MessageSoChatPage)