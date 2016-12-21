import React from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchUserListData } from '../actions/userList'

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: "000",
      startData: "",
      endData: "",
      appLanguage: "all",
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // dispatch(fetchUserListData());
  }

  getTableNodes = content => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {content[0].map((user, key) => {
              return (
                <TableHeaderColumn>{key}</TableHeaderColumn>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.map(user => {
            let userNodes = user.map(item => {
              return (<TableRowColumn>{item}</TableRowColumn>)
            })
            return (
              <TableRow>{userNodes}</TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
  handleClick = function(e) {
    console.log("click", e);
  }

  handleTouchTap = function(e) {
    console.log("touchTap", e);
  }

  handleChannelChange = (event, index, value) => this.setState({ channelId: value });


  handleLanguageChange = (event, index, value) => this.setState({ channelId: value });

  //开始时间
  selectStartData = (event, date) => this.setState({ startData: ((new Date(date)).getTime() / 1000) });
  // 结束时间
  selectEndData = (event, date) => this.setState({ endData: ((new Date(date)).getTime() / 1000) });
  //禁止选择日期
  disableRandomDates = (date) => (!!this.state.startData && ((new Date(date)).getTime() / 1000) < this.state.startData) ? true : false;

  render() {
    const { userList } = this.props;
    const { content } = userList;
    const styles = {
      paper: {
        margin: 20,
        minHeight: 600
      },
      customWidth: {
        width: 150,
      },
      textField: {
        marginLeft: 20,
      },
      datePickerBox: {
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.3)",
        paddingTop: 24
      },
      libleTitle: {
        position: "absolute",
        top: 18,
      }
    }

    const table = (<Paper className="container-fluid" zDepth={1} style={styles.paper}>
      <div className="row">

        <TextField
          hintText="用户ID"
          floatingLabelText="User Id"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
        />
        <TextField
          hintText="用户昵称"
          floatingLabelText="Nickname"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
        />
        <TextField
          hintText="电话号码（不含区号）"
          floatingLabelText="电话号码"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
        />
        <SelectField
          floatingLabelText="APP语言"
          value={this.state.appLanguage}
          onChange={this.handleLanguageChange}
          className="col-xs-2"
          style={styles.customWidth}
        >
          <MenuItem value={"all"} primaryText="All" />
          <MenuItem value={"zh_CN"} primaryText="zh_CN" />
          <MenuItem value={"en_US"} primaryText="en_US" />
          <MenuItem value={"es_ES"} primaryText="es_ES" />
          <MenuItem value={"tr_TR"} primaryText="tr_TR" />
          <MenuItem value={"ru_RU"} primaryText="ru_RU" />
        </SelectField>
        <SelectField
          floatingLabelText="渠道来源"
          value={this.state.channelId}
          onChange={this.handleChannelChange}
          className="col-xs-2"
          style={styles.customWidth}
        >
          <MenuItem value={"000"} primaryText="All" />
          <MenuItem value={"001"} primaryText="Custom width" />
          <MenuItem value={"002"} primaryText="Weeknights" />
          <MenuItem value={"003"} primaryText="Weekends" />
          <MenuItem value={"004"} primaryText="Weekly" />
        </SelectField>

        <TextField
          hintText="用户获取渠道的活动"
          floatingLabelText="活动名称"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
        />

        <div className="col-xs-4 text-left" style={styles.datePickerBox}>
          <label className="col-xs-12" style={styles.libleTitle}>注册时间区间</label>
          <DatePicker 
            className="col-xs-6"
            hintText="开始时间"
            container="inline"
            autoOk={true}
            onChange={this.selectStartData} />
            <DatePicker 
            className="col-xs-5"
            hintText="结束时间"
            container="inline"
            autoOk={true}
            onChange={this.selectEndData}
            shouldDisableDate={this.disableRandomDates} />
        </div>
      </div>
      {content.length > 0 ? this.getTableNodes(content) : ''}
    </Paper>)
      // const table =
      //   (<Table>
      //   <TableHeader>
      //     <TableRow>
      //       <TableHeaderColumn>ID</TableHeaderColumn>
      //       <TableHeaderColumn>Name</TableHeaderColumn>
      //       <TableHeaderColumn>Status</TableHeaderColumn>
      //     </TableRow>
      //   </TableHeader>
      //   <TableBody>
      //     <TableRow>
      //       <TableRowColumn>1</TableRowColumn>
      //       <TableRowColumn>John Smith</TableRowColumn>
      //       <TableRowColumn>Employed</TableRowColumn>
      //     </TableRow>
      //     <TableRow>
      //       <TableRowColumn>2</TableRowColumn>
      //       <TableRowColumn>Randal White</TableRowColumn>
      //       <TableRowColumn>Unemployed</TableRowColumn>
      //     </TableRow>
      //     <TableRow>
      //       <TableRowColumn>3</TableRowColumn>
      //       <TableRowColumn>Stephanie Sanders</TableRowColumn>
      //       <TableRowColumn>Employed</TableRowColumn>
      //     </TableRow>
      //     <TableRow>
      //       <TableRowColumn>4</TableRowColumn>
      //       <TableRowColumn>Steve Brown</TableRowColumn>
      //       <TableRowColumn>Employed</TableRowColumn>
      //     </TableRow>
      //   </TableBody>
      // </Table>)

    return table;
  }
}
UserListPage.defaultProps = {
  userList: {
    content: [],
    pageNum: 1,
    pageSize: 40,
    totalCount: 0
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList
  }
}

export default connect(mapStateToProps)(UserListPage)