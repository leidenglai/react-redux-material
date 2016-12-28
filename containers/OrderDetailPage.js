import React from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import { connect } from 'react-redux'
import { global } from '../actions'
import { fetchOrderDetailData, fetchUserDetailData } from '../actions/orderDetail'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { grey500, grey700 } from 'material-ui/styles/colors';

import UserDetailCard from '../components/user/UserDetailCard';



class UserDetailPage extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;

    this.state = {
      orderId: location.query.orderId || '',
      buyerId: location.query.buyerId || '',
      sellerId: location.query.sellerId || '',
      orderKeyToName: {
        orderId: {
          name: "订单id",
        },
        sellerId: {
          name: "卖家Id",
        },
        buyerId: {
          name: "买家Id",
        },
        payStatus: {
          name: "支付状态",
        },
        payMethod: {
          name: "支付方式",
        },
        orderStatus: {
          name: "订单状态",
        },
        createTime: {
          name: "订单创建时间",
        },
        payTime: {
          name: "订单支付时间",
        },
        originPrice: {
          name: "订单原价",
        },
        realPay: {
          name: "实际支付",
        },
        payFee: {
          name: "手续费",
        },
        couponCode: {
          name: "优惠券code",
        },
        couponAmount: {
          name: "优惠券金额",
        },
        couponType: {
          name: "优惠券类型",
        },
        orderFrom: {
          name: "订单来源",
        },
        currency: {
          name: "币种",
        },
        receivePlace: {
          name: "收货地址",
        }
      },
      userKeyValue: {
        registTime: "注册时间",
        userId: "userID",
        phoneNum: "电话号码（区号）",
        country: "国家",
        appLanguage: "APP语言",
        email: "email",
        registSource: "注册来源",
        registDT: "用户注册设备",
        dlAgency: "投放广告商",
        dlActivityId: "投放渠道",
        dlActivityName: "投放活动名称",
        lastLoginTime: "最后一次登录时间",
        lastUploadProTime: "最后一次上传产品时间",
        lastPayTime: "最后一笔购买订单时间",
        lastOrderTime: "最后一笔销售订单时间",
        friendsNum: "好友数量",
        addressListNum: "通讯录数量",
        productsNum: "我的产品数量",
        balanceUSD: "用户资金账户美元余额",
        balanceEUR: "用户资金账户欧元余额"
      },
      productKeyValue: {
        productid: {
          name: "产品id",
          style: {
            width: 200
          }
        },
        productName: {
          name: "产品名称",
          style: {}
        },
        productNum: {
          name: "产品数量",
          style: {
            width: 100
          }
        },
        prodcutPrice: {
          name: "价格",
          style: {
            width: 150
          }
        },
        productUrl: {
          name: "产品链接详情",
          style: {
            width: 250
          }
        },
      }
    }
  }

  componentDidMount() {
    const { dispatch, location } = this.props;

    if (this.state.orderId) {
      //查询订单详情
      dispatch(fetchOrderDetailData({ orderId: this.state.orderId }))
    }
    if (this.state.buyerId) {
      // 查询买卖家详情
      dispatch(fetchUserDetailData({ userId: this.state.buyerId }, 'buyer'))
      dispatch(fetchUserDetailData({ userId: this.state.sellerId }, 'seller'))
    }
  }

  handleSearchOrder = () => {
    const { dispatch } = this.props;
    dispatch(fetchUserDetailData({ orderId: this.state.orderId }))
  }

  getTableNodes = content => {
    const { productKeyValue } = this.state;
    return (
      <Table style={{tableLayout: "fixed"}} selectable={false} bodyStyle={{paddingLeft: 15, paddingRight: 15}} headerStyle={{paddingLeft: 15, paddingRight: 15}}>
        <TableHeader
          displaySelectAll = { false }
          adjustForCheckbox = { false } >
          <TableRow>
            {_.map(productKeyValue, (item, key) => {
              return (
                <TableHeaderColumn key={key} style={{...styles.tableRowColumnStyle, ...item.style}}>{item.name}</TableHeaderColumn>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}> 
          {_.map(content, (item, index) => {
            return (
            <TableRow key={index}>
              <TableRowColumn style={{...styles.tableRowColumnStyle, ...productKeyValue.productid.style}}>{item.productid}</TableRowColumn>
              <TableRowColumn style={{...styles.tableRowColumnStyle, ...productKeyValue.productName.style}}>{item.productName}</TableRowColumn>
              <TableRowColumn style={{...styles.tableRowColumnStyle, ...productKeyValue.productNum.style}}>{item.productNum}</TableRowColumn>
              <TableRowColumn style={{...styles.tableRowColumnStyle, ...productKeyValue.prodcutPrice.style}}>{item.currency + ' ' + item.productPrice}</TableRowColumn>
              <TableRowColumn style={{...styles.tableRowColumnStyle, ...productKeyValue.productUrl.style}}><a href={item.productUrl} target="_blank">点击跳转到产品</a></TableRowColumn>
            </TableRow>
              )
          })}        
        </TableBody>
      </Table>
    )
  }

  render() {
    const { orderDetail, buyerDetail, sellerDetail } = this.props;

    return (
      <div>
        <Card className="container-fluid"  style={styles.card}>
          <div className="row">
            <TextField
              hintText="Order Id"
              floatingLabelText="查询订单"
              floatingLabelFixed={true}
              className="col-xs-3"
              value={this.state.userId}
              onChange={event => this.setState({userId: event.target.value})}
            />
            <RaisedButton
              label="查询"
              style={{marginLeft: 50, marginTop: 26, padding: 0, width: 80}}
              className="col-xs-2"
              icon={<FontIcon style={{fontSize:16}} className="fa fa-search" />}
              onTouchTap={this.handleSearchOrder}
            />
          </div>
          <br />
          <Divider />
          <CardHeader
            title="订单详情"
            subtitle={"orderId: " + (orderDetail.orderId || "")}
            style={{minHeight:77}}
          />
          <Divider />
          <CardText>
            <div className="row">
              {_.map(this.state.orderKeyToName, (value, key) => (
                  <div key={key} className="col-xs-6 col-lg-4" style={{  paddingTop: 5,  paddingBottom: 5, lineHeight: 1.3}}>
                    <div className="col-xs-4 text-right no-padding" style={{color: grey500}}>{value.name}: </div>
                    <div className="col-xs-8 text-left" style={{color: grey700}}>{orderDetail[key]}</div>
                  </div>
                ))}
            </div>
          </CardText>
        </Card>
        <UserDetailCard userData={sellerDetail} title="卖家信息" />
        <UserDetailCard userData={buyerDetail} title="买家信息" />
        <Card className="container-fluid"  style={styles.card}>
          <CardHeader
            title="订单明细产品信息"
            style={{minHeight:77}}
          />
          <Divider />
          <CardText>
            {this.getTableNodes(orderDetail.orderItems)}
          </CardText>
        </Card>
      </div>
    );
  }
}
UserDetailPage.defaultProps = {
  orderDetail: {},
  buyerDetail: {},
  sellerDetail: {}
}
const styles = {
  card: {
    margin: 20,
    minHeight: 200
  },
  tableRowColumnStyle: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
    whiteSpace: "normal"
  }
}

const mapStateToProps = (state) => {
  return {
    orderDetail: state.orderDetail.orderData,
    buyerDetail: state.orderDetail.buyerData,
    sellerDetail: state.orderDetail.sellerData
  }
}

export default connect(mapStateToProps)(UserDetailPage)