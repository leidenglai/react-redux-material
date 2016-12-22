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
import Divider from 'material-ui/Divider';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: "000",
      startData: "",
      endData: "",
      appLanguage: "000",
      countryId: "000",
      tableHeader: {
        channelName: '用户来源渠道',
        activeName: '用户来源活动',
        signInDate: '注册时间',
        userID: 'User ID',
        nickname: 'Nickname',
        phone: '电话号码（区号）',
        country: '国家',
        fullName: '姓名',
        appLanguage: 'APP语言',
        email: 'Email',
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // dispatch(fetchUserListData());
  }

  getTableNodes = content => {
    return (
      <Table>
        <TableHeader
          displaySelectAll = { false }
          adjustForCheckbox = { false } >
          <TableRow>
            {_.map(this.state.tableHeader, (item, key) => {
              return (
                <TableHeaderColumn key={key}>{item}</TableHeaderColumn>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          
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

  handleLanguageChange = (event, index, value) => this.setState({ appLanguage: value });

  handleCountryChange = (event, index, value) => this.setState({ countryId: value });

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
      seletedWidth: {
        width: 150,
        marginLeft: 20
      },
      textField: {
        marginLeft: 20,
      },
      datePickerBox: {
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.3)",
        paddingTop: 24
      },
      datePicker: {
        width: 150
      },
      libleTitle: {
        position: "absolute",
        top: 18,
      }
    }

    const table = (<Paper className="container-fluid" zDepth={1} style={styles.paper}>
      <div className="row filtersContent">
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
          style={styles.seletedWidth}
        >
          <MenuItem value={"000"} primaryText="All" />
          <MenuItem value={"zh_CN"} primaryText="中文" />
          <MenuItem value={"en_US"} primaryText="英语" />
          <MenuItem value={"es_ES"} primaryText="西语" />
          <MenuItem value={"tr_TR"} primaryText="土语" />
          <MenuItem value={"ru_RU"} primaryText="俄语" />
        </SelectField>

        <SelectField
          floatingLabelText="渠道来源"
          value={this.state.channelId}
          onChange={this.handleChannelChange}
          className="col-xs-2"
          style={styles.seletedWidth}
        >
          <MenuItem value={"000"} primaryText="All" />
          <MenuItem value={"001"} primaryText="Custom width" />
          <MenuItem value={"002"} primaryText="Weeknights" />
          <MenuItem value={"003"} primaryText="Weekends" />
          <MenuItem value={"004"} primaryText="Weekly" />
        </SelectField>

        <SelectField
          floatingLabelText="国家"
          value={this.state.countryId}
          onChange={this.handleCountryChange}
          className="col-xs-2"
          style={styles.seletedWidth}
        >
          <MenuItem value={"000"} primaryText="All" />
          <MenuItem value={"001"} primaryText="us" />
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
            style={styles.datePicker}
            textFieldStyle={styles.datePicker}
            hintText="开始时间"
            container="inline"
            autoOk={true}
            onChange={this.selectStartData} />
            <DatePicker 
            className="col-xs-6"
            style={styles.datePicker}
            textFieldStyle={styles.datePicker}
            hintText="结束时间"
            container="inline"
            autoOk={true}
            onChange={this.selectEndData}
            shouldDisableDate={this.disableRandomDates} />
        </div>
      </div>
      <div className="row">
        <Divider />
      </div>
      <div className="row tableContent">
        {this.getTableNodes(content)}
      </div>

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