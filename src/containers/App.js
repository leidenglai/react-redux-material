import React, { Component } from 'react';
import { connect } from 'react-redux';
import { global } from '../actions';
import { moduleData } from '../constants/moduleData';

import LinearProgress from 'material-ui/LinearProgress';
import NavigationMenu from '../components/public/NavigationMenu';
import AppHeader from '../components/public/AppHeader';
import Snackbar from 'material-ui/Snackbar';
import { pink500 } from 'material-ui/styles/colors';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      snackbarAutoHideDuration: 2000,
      message: '',
      snackbarOpen: false,
      showMenu: true
    };

  }
  componentWillMount() {
    const { location, systemStatus, dispatch } = this.props;

    if (location.pathname.indexOf(systemStatus.currentModule) === -1) {
      let _pathArr = location.pathname.split('/');
      dispatch(global.setMneuDefaultValue(_pathArr[_pathArr.length - 1]));
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

  handleModuleClick = (router, value, event) => {
    const { dispatch } = this.props;
    if (value !== this.props.selectedIndex) {
      dispatch(global.changeModule(router));
    }
  }

  handleMenuToggle = () => this.setState({showMenu: !this.state.showMenu});

  render() {
    const { loading, message, systemStatus } = this.props;

    let styles = {
      opsContainer: {
        position: "relative",
        paddingTop: 50,
        marginLeft: this.state.showMenu ? 250 : 0,
        minHeight: 400
      },
      linearProgress: {
        display: loading.status ? "block" : "none",
        position: "fixed",
        top: 50,
        left: this.state.showMenu ? 250 : 0,
        zIndex: 1200
      }
    }

    return (
      <div className="row">
        <NavigationMenu
          categories={moduleData} defaultValue={systemStatus.currentModule} onItemClick={this.handleModuleClick} open={this.state.showMenu}/>
        <div id="opsContainer" style={styles.opsContainer}>
          <LinearProgress mode="indeterminate" color={pink500} style={styles.linearProgress}/>
          <AppHeader admin={false} title="" showMenu={this.state.showMenu} handleMenuToggle={this.handleMenuToggle}/>          
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
  countryList: [],
  loading: {
    status: false
  },
  message: {
    type: '',
    content: ''
  },
  systemStatus: {
    currentModule: ""
  }
};

function mapStateToProps(state) {
  const { loading, message, systemStatus, countryList } = state.global;

  return { loading, message, systemStatus, countryList };
}

export default connect(mapStateToProps)(App)