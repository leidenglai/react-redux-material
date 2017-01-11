import React from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { global } from '../actions'
import { fetchUserListData, proloadedUserDetailData, exportUserList } from '../actions/userList'

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ReactPaginate from 'react-paginate';


export class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      nickname: "",
      phoneNum: "",
      dlActivityId: "",
      startTime: "",
      endTime: "",
      dlAgency: "0000",
      dlChannel: "0000",
      appLanguage: "0000",
      country: "0000",
      registSource: "0000",
      pageNum: 0,
      pageSize: 10,
      tableHeader: {
        userId: {
          name: "User ID",
          style: { width: 200 }
        },
        nickName: {
          name: "Nickname",
          style: { width: "auto" }
        },
        phoneNum: {
          name: "电话号码（区号）",
          style: { width: 130 }
        },
        country: {
          name: "国家",
          style: { width: 50 }
        },
        appLanguage: {
          name: "APP语言",
          style: { width: 50 }
        },
        email: {
          name: "Email",
          style: { width: 150 }
        },
        dlAgency: {
          name: "广告商",
          style: { width: 100 }
        },
        dlChannel: {
          name: "投放渠道",
          style: { width: 100 }
        },
        dlActivityName: {
          name: "投放活动名称",
          style: { width: "auto" }
        },
        registTime: {
          name: "注册时间",
          style: { width: 130 }
        },
        registSource: {
          name: "注册来源",
          style: { width: 100 }
        },
        site: {
          name: "操作项",
          style: {}
        },
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  getTableNodes = content => {
    return (
      <Table style={{tableLayout: "fixed",width:1500}} selectable={false} bodyStyle={{width: 1530, paddingLeft: 15, paddingRight: 15}} headerStyle={{width: 1530, paddingLeft: 15, paddingRight: 15}}>
        <TableHeader
          displaySelectAll = { false }
          adjustForCheckbox = { false } >
          <TableRow>
            {_.map(this.state.tableHeader, (item, key) => {
              return (
                <TableHeaderColumn key={key} style={{...item.style, textAlign: "center", paddingLeft: 5, paddingRight: 5}}>{item.name}</TableHeaderColumn>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}> 
          {content.map((item, index) => {
            return (
            <TableRow  key={index}>
              {_.map(this.state.tableHeader, (value, key) => {
                if(key !== "site") {
                  return (
                    <TableRowColumn key={index+ "-" +key} style={{...value.style, textAlign: "center", paddingLeft: 5, paddingRight: 5, whiteSpace: "normal"}}>{item[key]}</TableRowColumn>
                  )
                } else {
                  return (
                     <TableRowColumn key={index+ "-" +key} style={{...value.style, textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                      <IconButton 
                        iconClassName="fa fa-user"
                        iconStyle={{fontSize: 16}}
                        tooltip="查看用户详情"
                        onTouchTap={this.handleUserDetailBtn.bind(this, item.userId)}
                      />
                      <IconButton 
                        iconClassName="fa fa-toggle-up"
                        iconStyle={{fontSize: 16}}
                        tooltip="查看销售订单"
                        onTouchTap={this.handleOrderBtn.bind(this, 1, item.userId)}
                      />
                      <IconButton 
                        iconClassName="fa fa-toggle-down"
                        iconStyle={{fontSize: 16}}
                        tooltip="查看采购订单"
                        onTouchTap={this.handleOrderBtn.bind(this, 2, item.userId)}
                      />
                     </TableRowColumn>
                     )
                }
              })}
            </TableRow>
              )
          })}        
        </TableBody>
      </Table>
    )
  }

  //@params orderType 1:销售  2：采购，
  handleOrderBtn = (orderType, userId, event) => {
    browserHistory.push('/orderList?orderType=' + orderType + '&userId=' + userId);
  }
  handleUserDetailBtn = (userId, event) => {
    const { dispatch, usersData } = this.props;

    let userData = _.find(usersData.userList, { userId: userId });

    dispatch(proloadedUserDetailData(userData));
    browserHistory.push('/userDetail?userId=' + userId);
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCountryChange = (event, index, value) => this.setState({ country: value });

  handleDlAgencyChange = (event, index, value) => this.setState({ dlAgency: value });

  handleChannelChange = (event, index, value) => this.setState({ dlChannel: value });

  handleLanguageChange = (event, index, value) => this.setState({ appLanguage: value });

  handleSignUpOriginateChange = (event, index, value) => this.setState({ registSource: value });

  // 开始时间
  selectStartData = (event, date) => this.setState({ startTime: ((new Date(date)).getTime() / 1000) });
  // 结束时间
  selectEndData = (event, date) => this.setState({ endTime: ((new Date(date)).getTime() / 1000) });
  // 禁止选择日期
  disableRandomDates = (date) => (!!this.state.startTime && ((new Date(date)).getTime() / 1000) < this.state.startTime) ? true : false;

  handleParmas = (params = []) => {
    let defaultParamKeys = [
      "userId",
      "nickname",
      "phoneNum",
      "dlActivityId",
      "startTime",
      "endTime",
      "dlAgency",
      "dlChannel",
      "appLanguage",
      "country",
      "registSource"
    ];

    params = [...defaultParamKeys, ...params];
    let requestParams = {};
    //筛选参数
    params.map(item => {
      if (this.state[item] && this.state[item] !== "" && this.state[item] !== "0000") {
        requestParams[item] = this.state[item]
      }
    });

    return requestParams;
  }

  // 查询
  handleSubmit = event => {
    event.stopPropagation();
    event.preventDefault();

    const { dispatch } = this.props;

    const requestParams = this.handleParmas(["pageSize", "pageNum"]);

    dispatch(fetchUserListData(requestParams));
  }

  // 导出
  handleDownToEmail = event => {
    const receiver = this.state.downloadEmail;

    const params = {...this.handleParmas(), receiver }

    ///导出接口
    dispatch(exportUserList(params));
  }


  //翻页
  handlePageClick = (obj) => {
    const { dispatch } = this.props;
    this.setState({ pageNum: obj.selected }, () => {
      const requestParams = this.handleParmas(["pageSize", "pageNum"]);

      dispatch(fetchUserListData(requestParams));
    });
  }

  render() {
    const { usersData, countryList, dlChannelList, dlAgencyList, registerFromList } = this.props;
    const contents = usersData.userList;

    const table = (<Paper className="container-fluid" zDepth={1} style={styles.paper}>
      <form id="userListSearch" className="row filtersContent" onSubmit={this.handleSubmit}>
        <TextField
          hintText="用户ID"
          floatingLabelText="UserID"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          name="userId"
          onChange={this.handleInputChange}
        />
        <TextField
          hintText="用户昵称"
          floatingLabelText="Nickname"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          name="nickname"
          onChange={this.handleInputChange}
        />
        <TextField
          hintText="电话（不含区号）"
          floatingLabelText="电话号码"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          type="number"
          name="phoneNum"
          onChange={this.handleInputChange}
        />
        <SelectField
          floatingLabelText="国家"
          maxHeight={400}
          autoWidth={true}
          value={this.state.country}
          onChange={this.handleCountryChange}
          className="col-xs-2"
          style={styles.seletedGroup}
        >
          <MenuItem value={"0000"} primaryText="All" />
          {countryList.map(country => (<MenuItem key={country.countryCode} value={country.countryCode} primaryText={country.countryName} />))}
        </SelectField>
        <SelectField
          floatingLabelText="APP语言"
          value={this.state.appLanguage}
          onChange={this.handleLanguageChange}
          className="col-xs-2"
          style={styles.seletedGroup}
        >
          <MenuItem value={"0000"} primaryText="All" />
          <MenuItem value={"zh_CN"} primaryText="中文" />
          <MenuItem value={"en_US"} primaryText="英语" />
          <MenuItem value={"es_ES"} primaryText="西语" />
          <MenuItem value={"tr_TR"} primaryText="土语" />
          <MenuItem value={"ru_RU"} primaryText="俄语" />
        </SelectField>

        <SelectField
          floatingLabelText="注册来源"
          value={this.state.registSource}
          onChange={this.handleSignUpOriginateChange}
          className="col-xs-2"
          style={styles.seletedGroup}
        >
          <MenuItem value={"0000"} primaryText="All" />
          {_.map(registerFromList, (item, key)=> (<MenuItem key={key} value={item.registId} primaryText={item.registName} />)) }
        </SelectField>

        <SelectField
          floatingLabelText="投放广告商"
          value={this.state.dlAgency}
          onChange={this.handleDlAgencyChange}
          className="col-xs-2"
          style={styles.seletedGroup}
        >
          <MenuItem value={"0000"} primaryText="All" />
          {_.map(dlAgencyList, (item, key)=> (<MenuItem key={key} value={item.agencyName} primaryText={item.agencyName} />)) }
        </SelectField>

        <SelectField
          floatingLabelText="投放渠道"
          value={this.state.dlChannel}
          onChange={this.handleChannelChange}
          className="col-xs-2"
          style={styles.seletedGroup}
        >
          <MenuItem value={"0000"} primaryText="All" />
          {_.map(dlChannelList, (item, key)=> (<MenuItem key={key} value={item.channelId} primaryText={item.channelName} />)) }
        </SelectField>

        <TextField
          hintText="活动名称"
          floatingLabelText="投放活动名称"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          name="dlActivityId"
          onChange={this.handleInputChange}
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


        <RaisedButton
          label="Search"
          style={styles.searchBtn}
          className="col-xs-2 no-padding"
          icon={<FontIcon style={styles.searchBtnIcon} className="fa fa-search" />}
          type="submit"
        />
      </form>
      <div className="row">
        <Divider />
      </div>
      <div className="row tableContent">
        {this.getTableNodes(contents)}
      </div>
      <div className="row paginate">
        <ReactPaginate previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={<a href="javascript:;">...</a>}
          breakClassName={"break-me"}
          pageCount={this.props.usersData.totalCount/this.state.pageSize === 0 ? 1 : Math.ceil(this.props.usersData.totalCount/this.state.pageSize)}
          marginPagesDisplayed={5}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
        
      </div>
      <div className="row">
        <Divider />
      </div>
      <div className="row" style={{marginTop: 20}}>        
        <TextField
          hintText="导出的email"
          floatingLabelText="导出查询结果"
          floatingLabelFixed={true}
          className="col-xs-3"
          type="email"
          defaultValue={this.state.downloadEmail}
          onChange={event => this.setState({downloadEmail: event.target.value})}
        />
        <RaisedButton
          label="导出"
          style={{marginLeft: 50, marginTop: 26, padding: 0, width: 80}}
          className="col-xs-2"
          icon={<FontIcon style={{fontSize:16}} className="fa fa-cloud-download" />}
          onTouchTap={this.handleDownToEmail}
        />
      </div>

    </Paper>)
    return table;
  }
}
const styles = {
  paper: {
    margin: 20,
    minHeight: 600
  },
  seletedGroup: {
    width: 150,
    marginLeft: 20,
    padding: 0
  },
  textField: {
    width: 150,
    marginLeft: 20,
    padding: 0
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
  },
  searchBtn: {
    width: 150,
    marginTop: 22,
    padding: 0
  },
  searchBtnIcon: {
    fontSize: 18
  },
  tableColumn: {
    minWidth: 100
  }
}
UserListPage.defaultProps = {
  usersData: {
    userList: [],
    pageNum: 1,
    pageSize: 40,
    totalCount: 0
  },
  countryList: [], //国家列表
  dlChannelList: [], //渠道列表
  dlAgencyList: [], //广告商列表
  registerFromList: [] //注册来源列表
}

const mapStateToProps = (state) => {
  return {
    usersData: state.usersData,
    countryList: state.global.countryList,
    dlChannelList: state.global.dlChannel,
    dlAgencyList: state.global.dlAgency,
    registerFromList: state.global.registerFrom,
  }
}

export default connect(mapStateToProps)(UserListPage)