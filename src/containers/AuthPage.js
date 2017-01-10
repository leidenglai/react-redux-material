import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn } from 'actions/account'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import { pink500 } from 'material-ui/styles/colors';

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    const { dispatch, userinfo } = this.props;

    if (userinfo.isLogin) dispatch(push('/'));
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value.trim(),
    })
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value.trim(),
    })
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props
    e.preventDefault()

    if (this.state.username === "" || this.state.password === "") {
      window.alert('账号或密码不能为空')
      return;
    }

    dispatch(logIn({
      username: this.state.username,
      password: this.state.password
    }))
  }

  render() {
    const { loading } = this.props
    return (
      <div className="container" style={{marginTop: "10%", marginBottom: "10%"}}>
        <LinearProgress mode="indeterminate" color={pink500} style={{display: loading.status? "block": "none", position:"fixed", top:0, left:0}}/>
        
        <Paper zDepth={2} style={{padding: "20px 0 40px", width: 300, margin:"0 auto", backgroundColor: "#fff"}}>
          <div className="row text-center">
            <div className="AuthPage-logo" style={{width: 100, height:100, display: "inline-block"}}></div>
            <div className="color-blue" style={{marginTop: 14, fontSize: 16}}>Socialshops 运营后台管理系统</div>
          </div>
          <div className="row">
            <form className="col-xs-10 col-xs-offset-1 text-center" onSubmit={this.handleSubmit}>
              <TextField ref="username" id="username" name="username" value={this.state.username} onChange={this.handleUsernameChange}
                hintText="The default is admin"
                floatingLabelText="Username"
                fullWidth={true}
              />
              <br/>
              <TextField type="password" ref="password" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}
                hintText="The default is admin"
                floatingLabelText="Password" 
                fullWidth={true}
              />
              <br/>
              <RaisedButton
                type="submit"
                label="Sign in"
                primary={true}
                fullWidth={true}
                style={{marginTop: 40, height:48, lineHeight: "48px"}}
              />
            </form>
          </div>
        </Paper>
      </div>
    )
  }
}

AuthPage.defaultProps = {
  userinfo: {
    isLogin: false
  },
  loading: {
    status: false
  }
};

const mapStateToProps = (state) => {
  const { userinfo } = state;
  const { loading } = state.global;

  return { loading, userinfo };
}

const styles = {}

export default connect(mapStateToProps)(AuthPage)