import React, { Component, PropTypes } from 'react';

import Divider from 'material-ui/Divider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import { grey500, grey700 } from 'material-ui/styles/colors';

export default class UserDetailCard extends Component {
  static propTypes = {
    userData: PropTypes.object,
    title: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      userKeyValue: {
        nickName: "昵称",
        username: "真实姓名",
        registTime: "注册时间",
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

  render() {
    const { userData } = this.props;

    return (
      <Card className="container-fluid"  style={styles.card}>
        {this.props.children}
        <CardHeader
          title={this.props.title}
          subtitle={"userId: " + (userData.userId || "")}
          avatar={userData.headImg}
          style={{minHeight:77}}
        />
        <Divider />
        <CardText>
          <div className="row">
            {_.map(this.state.userKeyValue, (value, key) => (
                <div key={key} className="col-xs-6 col-lg-4" style={{  paddingTop: 5,  paddingBottom: 5, lineHeight: 1.3}}>
                  <div className="col-xs-6 text-right no-padding" style={{color: grey500}}>{value}: </div>
                  <div className="col-xs-6 text-left" style={{color: grey700}}>{userData[key]}</div>
                </div>
              ))}
          </div>
        </CardText>
      </Card>
    );
  }
}

const styles = {
  card: {
    margin: 20,
    minHeight: 200
  }
}