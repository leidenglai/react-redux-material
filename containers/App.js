import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { global } from '../actions'
import { moduleData } from '../constants/moduleData'

import LinearProgress from 'material-ui/LinearProgress';
import NavigationMenu from '../components/public/NavigationMenu'
import AppHeader from '../components/public/AppHeader'
import Snackbar from 'material-ui/Snackbar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      snackbarAutoHideDuration: 2000,
      message: '',
      snackbarOpen: false,
    }
  }

  componentWillReceiveProps() {
    const { message } = this.props;

    this.setState({
      snackbarOpen: !!message.type,
      message: message.content
    });
  }

  snackbarHandleRequestClose = () => {
    const { dispatch } = this.props;

    dispatch(global.clearMessageSnackbar());

    this.setState({
      snackbarOpen: false,
      message: ''
    });
  }


  render() {
    const { loading, message } = this.props;

    let styles = {
      opsContainer: {
        position: "relative",
        paddingTop: 50,
        marginLeft: 200,
        minHeight: 400
      },
      linearProgress: {
        display: loading.status ? "block" : "none",
        position: "fixed",
        top: 50,
        left: 200,
        zIndex: 1200
      }
    }

    return (
      <div className="row">
        <NavigationMenu
          categories={moduleData} />
        <div id="opsContainer" style={styles.opsContainer}>
          <LinearProgress mode="indeterminate" style={styles.linearProgress}/>
          <AppHeader admin={false} title=""/>
          
          {this.props.children}

          <Snackbar
            open={ this.state.snackbarOpen}
            message={this.state.message}
            autoHideDuration={this.state.snackbarAutoHideDuration}
            onRequestClose={this.snackbarHandleRequestClose}
          />
        </div>
      </div>
    )
  }
}
App.defaultProps = {
  userinfo: {
    isLogin: false
  },
  loading: {
    status: false
  },
  message: {
    type: '',
    content: ''
  }
};

function mapStateToProps(state) {
  const { userinfo } = state;
  const { loading, message } = state.global;

  return { userinfo, loading, message };
}

export default connect(mapStateToProps)(App)