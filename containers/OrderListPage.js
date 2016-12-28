import React from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import { connect } from 'react-redux'
import { global } from '../actions'
import { fetchOrderListData, exportOrderList } from '../actions/orderList'

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ReactPaginate from 'react-paginate';

class OrderListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadEmail: "",
      params: {
        pageNum: 0,
        pageSize: 10,
        sellerId: "",
        sellerPhone: "",
        buyerId: "",
        buyerPhone: "",
        createTimeStart: "",
        createTimeEnd: "",
        payTimeStart: "",
        payTimeEnd: "",
        currency: "0000",
        payRelase: 0, //入账
        advancesType: "0000", //放款
        payMethodId: "0000", //支付方式
        payStatus: "0000", //支付状态
        orderStatus: "0000", //订单状态
        channelId: "0000"
      },
      tableHeader: {
        orderId: {
          name: "订单id",
          style: { width: 200 }
        },
        sellerId: {
          name: "卖家Id",
          style: { width: 200 }
        },
        buyerId: {
          name: "买家Id",
          style: { width: 200 }
        },
        payStatus: {
          name: "支付状态",
          style: { width: 100 }
        },
        payMethod: {
          name: "支付方式",
          style: { width: 100 }
        },
        orderStatus: {
          name: "订单状态",
          style: { width: 100 }
        },
        createTime: {
          name: "订单创建时间",
          style: { width: 150 }
        },
        payTime: {
          name: "订单支付时间",
          style: { width: 150 }
        },
        originPrice: {
          name: "订单原价",
          style: { width: 50 }
        },
        realPay: {
          name: "实际支付",
          style: { width: 50 }
        },
        payFee: {
          name: "手续费",
          style: { width: 50 }
        },
        couponCode: {
          name: "优惠券code",
          style: { width: 100 }
        },
        couponAmount: {
          name: "优惠券金额",
          style: { width: 50 }
        },
        couponType: {
          name: "优惠券类型",
          style: { width: 100 }
        },
        orderFrom: {
          name: "订单来源",
          style: { width: 100 }
        },
        currency: {
          name: "币种",
          style: { width: 50 }
        },
        receivePlace: {
          name: "收货地址",
          style: { width: 200 }
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


    //请求下拉框的列表
    dispatch(global.fetchSelectOptionListData({ type: "dlChannel" }));
  }

  getTableNodes = content => {
    return (
      <Table fixedHeader={true} style={{width: 2000, tableLayout: "fixed"}} selectable={false} bodyStyle={{width: 2000}}>
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
          {_.map(content, (item, index) => {
            return (
            <TableRow  key={index}>
              {_.map(this.state.tableHeader, (value, key) => {
                if(key !== "site") {
                  return (
                    <TableHeaderColumn key={index+ "-" +key} style={{...value.style, textAlign: "center", paddingLeft: 5, paddingRight: 5}}>{item[key]}</TableHeaderColumn>
                  )
                } else {
                  return (
                     <TableHeaderColumn key={index+ "-" +key} style={{...value.style, textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                      <IconButton 
                        iconClassName="fa fa-balance-scale"
                        iconStyle={{fontSize: 16}}
                        tooltip="查看订单详情"
                        onTouchTap={this.handleOrderDetailBtn.bind(this, item.buyerId, item.sellerId, item.orderId)}
                      />
                     </TableHeaderColumn>
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

  handleOrderDetailBtn = (buyerId, sellerId, orderId, event) => {
    const { dispatch } = this.props;

    browserHistory.push('/orderDetail?buyerId=' + buyerId + '&sellerId=' + sellerId + '&orderId=' + orderId);
  }

  handleInputChange = (event) => {
    this.setStateParams({
      [event.target.name]: event.target.value
    });
  }

  handleSelectChange = (event, index, value) => {
    this.setStateParams({
      [event.target.name]: value
    });
  }

  setStateParams = (nextState, callback) => {
    let params = _.cloneDeep(this.state.params);
    _.map(nextState, (value, key) => {
      params[key] = value;
    });
    this.setState({ params: params }, callback);
  }

  // 创建订单时间
  // 开始时间
  selectCreateStartData = (event, date) => this.setStateParams({ createTimeStart: ((new Date(date)).getTime() / 1000) });
  // 结束时间
  selectCreateEndData = (event, date) => this.setStateParams({ createTimeEnd: ((new Date(date)).getTime() / 1000) });
  // 禁止选择日期
  disableCreateRandomDates = (date) => (!!this.state.params.createTimeStart && ((new Date(date)).getTime() / 1000) < this.state.params.createTimeStart) ? true : false;

  // 支付时间
  // 开始时间
  selectPayStartData = (event, date) => this.setStateParams({ payTimeStart: ((new Date(date)).getTime() / 1000) });
  // 结束时间
  selectPayEndData = (event, date) => this.setStateParams({ payTimeEnd: ((new Date(date)).getTime() / 1000) });
  // 禁止选择日期
  disablePayRandomDates = (date) => (!!this.state.params.payTimeStart && ((new Date(date)).getTime() / 1000) < this.state.params.payTimeStart) ? true : false;


  handleParmas = (params = []) => {
    let requestParams = {};
    //筛选参数
    _.map(this.state.params, (item, key) => {
      if (item !== "" && item !== "0000") {
        requestParams[key] = item;
      }
    })

    return requestParams;
  }

  // 查询
  handleSubmit = event => {
    event.stopPropagation();
    event.preventDefault();
    const { dispatch } = this.props;

    const requestParams = this.handleParmas();

    dispatch(fetchOrderListData(requestParams));
  }

  // 导出
  handleDownToEmail = event => {
    const receiver = this.state.downloadEmail;

    const params = {...this.handleParmas(), receiver }

    ///导出接口
    dispatch(exportOrderList(params));
  }

  //翻页
  handlePageClick = (obj) => {
    const { dispatch } = this.props;
    this.setState({ pageNum: obj.selected }, () => {
      const requestarams = this.handleParmas();
      dispatch(fetchOrderListData(requestarams));
    });
  }

  render() {
    const { ordersData, channelList } = this.props;
    const contents = ordersData.orderList;

    const table = (<Paper className="container-fluid" zDepth={1} style={styles.paper}>
      <form id="orderListSearch" className="row filtersContent" onSubmit={this.handleSubmit}>
        <TextField
          hintText="卖家ID"
          floatingLabelText="Seller Id"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          name="sellerId"
          onChange={this.handleInputChange}
        />
        <TextField
          hintText="卖家电话"
          floatingLabelText="Seller Phone"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          name="sellerPhone"
          onChange={this.handleInputChange}
        />
        <TextField
          hintText="买家ID"
          floatingLabelText="Buyer Id"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          name="buyerId"
          onChange={this.handleInputChange}
        />
        <TextField
          hintText="买家电话"
          floatingLabelText="Buyer Phone"
          floatingLabelFixed={true}
          className="col-xs-2"
          style={styles.textField}
          name="buyerPhone"
          onChange={this.handleInputChange}
        />
        <SelectField
          floatingLabelText="货币"
          value={this.state.params.currency}
          onChange={this.handleCurrencyChange}
          className="col-xs-2"
          name="currency"
          style={styles.seletedGroup}
          >
          <MenuItem value={"0000"} primaryText="All" />
          <MenuItem value={"EUR"} primaryText="欧元" />
          <MenuItem value={"USD"} primaryText="美元" />
        </SelectField>
        <SelectField
          floatingLabelText="是否入账"
          value={this.state.params.payRelase}
          name="payRelase"
          onChange={this.handleSelectChange}
          className="col-xs-2"
          style={styles.seletedGroup}
          >
          <MenuItem value={0} primaryText="否" />
          <MenuItem value={1} primaryText="是" />
        </SelectField>

        <SelectField
          floatingLabelText="支付状态"
          value={this.state.params.payStatus}
          onChange={this.handleSelectChange}
          name="payStatus"
          className="col-xs-2"
          style={styles.seletedGroup}
          >
          <MenuItem value={"0000"} primaryText="All" />
          <MenuItem value={1} primaryText="待支付" />
          <MenuItem value={4} primaryText="支付成功" />
        </SelectField>

        <SelectField
          floatingLabelText="支付方式"
          value={this.state.params.payMethodId}
          onChange={this.handlePayMethodIdChange}
          name="payMethodId"
          className="col-xs-2"
          style={styles.seletedGroup}
          >
          <MenuItem value={"0000"} primaryText="All" />
          <MenuItem value={0} primaryText="未支付" />
          <MenuItem value={1} primaryText="SEPA" />
          <MenuItem value={2} primaryText="线下" />
          <MenuItem value={3} primaryText="货到付款" />
          <MenuItem value={4} primaryText="信用卡" />
          <MenuItem value={5} primaryText="余额支付" />
          <MenuItem value={6} primaryText="银行转账" />
        </SelectField>

        <SelectField
          floatingLabelText="订单来源"
          value={this.state.params.channelId}
          onChange={this.handleSelectChange}
          name="channelId"
          className="col-xs-2"
          style={styles.seletedGroup}
          >
          <MenuItem value={"0000"} primaryText="All" />
          {_.map(channelList, (item, key)=> (<MenuItem key={key} value={item.channelId} primaryText={item.channelName} />)) }
        </SelectField>

        <div className="col-xs-4 text-left" style={styles.datePickerBox}>
          <label className="col-xs-12" style={styles.libleTitle}>下单时间区间</label>
          <DatePicker 
            className="col-xs-6"
            style={styles.datePicker}
            textFieldStyle={styles.datePicker}
            hintText="开始时间"
            container="inline"
            autoOk={true}
            onChange={this.selectCreateStartData} />
            <DatePicker 
            className="col-xs-6"
            style={styles.datePicker}
            textFieldStyle={styles.datePicker}
            hintText="结束时间"
            container="inline"
            autoOk={true}
            onChange={this.selectCreateEndData}
            shouldDisableDate={this.disableCreateRandomDates} />
        </div>

        <div className="col-xs-4 text-left" style={styles.datePickerBox}>
          <label className="col-xs-12" style={styles.libleTitle}>支付时间区间</label>
          <DatePicker 
            className="col-xs-6"
            style={styles.datePicker}
            textFieldStyle={styles.datePicker}
            hintText="开始时间"
            container="inline"
            autoOk={true}
            onChange={this.selectPayStartData} />
            <DatePicker 
            className="col-xs-6"
            style={styles.datePicker}
            textFieldStyle={styles.datePicker}
            hintText="结束时间"
            container="inline"
            autoOk={true}
            onChange={this.selectPayEndData}
            shouldDisableDate={this.disablePayRandomDates} />
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
          pageCount={this.props.ordersData.totalCount/this.state.params.pageSize === 0 ? 1 : Math.ceil(this.props.ordersData.totalCount/this.state.params.pageSize)}
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
OrderListPage.defaultProps = {
  ordersData: {
    orderList: [],
    pageNum: 1,
    pageSize: 40,
    totalCount: 0
  },
  channelList: [], //渠道列表
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
    margin: 20,
    padding: 0
  },
  searchBtnIcon: {
    fontSize: 18
  },
  tableColumn: {
    minWidth: 100
  }
}

const mapStateToProps = (state) => {
  return {
    channelList: state.global.dlChannel,
    ordersData: state.ordersData
  }
}

export default connect(mapStateToProps)(OrderListPage)