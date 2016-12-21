import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as auth from '../auth'
import { logIn } from '../actions/account'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

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
      window.alert('不能为空')
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
        <LinearProgress mode="indeterminate" style={{display: loading.status? "block": "none", position:"fixed", top:0, left:0}}/>
        
        <h1 className="row text-center" style={{fontSize: "48px", color:"#3ea3e6"}}>Socialshops OPS</h1>
        <div className="row">
          <form className="col-xs-6 col-xs-offset-3 text-center" onSubmit={this.handleSubmit}>
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
              style={{marginTop: "40px",height:"48px",lineHeight: "48px"}}
            />
          </form>
        </div>
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