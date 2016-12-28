import React from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import { connect } from 'react-redux'
import { global } from '../actions'
import { fetchUserDetailData } from '../actions/userDetail'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { grey500, grey700 } from 'material-ui/styles/colors'

import UserDetailCard from '../components/user/UserDetailCard';

class UserDetailPage extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;

    this.state = {
      userId: location.query.userId || '',
      keyToName: {
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
      }
    }
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    if (location.query.userId) {
      dispatch(fetchUserDetailData({ userId: location.query.userId }))
    }
  }

  handleSearchUser = () => {
    const { dispatch } = this.props;
    dispatch(fetchUserDetailData({ userId: this.state.userId }))
  }

  render() {
    const { userDetail } = this.props;

    return (
      <UserDetailCard userData={userDetail} title="用户详情">      
        <div className="row">
          <TextField
            hintText="要查询的用户"
            floatingLabelText="UserId"
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
            onTouchTap={this.handleSearchUser}
          />
        </div>
        <br />
        <Divider />
      </UserDetailCard>
    );
  }
}
UserDetailPage.defaultProps = {
  userDetail: {}
}

const mapStateToProps = (state) => {
  return {
    userDetail: state.userDetail
  }
}

export default connect(mapStateToProps)(UserDetailPage)