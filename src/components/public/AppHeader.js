import React from 'react';
import { connect } from 'react-redux'
import { logOut } from 'actions/account'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

class AppHeader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
  };

  handleAccount = (event, child) => {
    const {dispatch} = this.props;
    console.log( this.props)
    if(child.key === "1") {
      dispatch(logOut());
    }
  }
  render() {
    const { title} = this.props;

    return (
      <AppBar showMenuIconButton={false}
				zDepth={0}
				title={title}
				style={{position: "fixed", top: 0, left: 0,	zIndex: 1200, paddingLeft: 200}}
        iconElementRight = {
          <IconMenu
            iconButtonElement={
              <IconButton><FontIcon style={{marginTop:12,marginRight: 15,color: "#fff"}} className="fa fa-user-circle-o" /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onItemTouchTap={this.handleAccount}
          >
            <MenuItem key={1} primaryText="Sign out"/>
          </IconMenu>
        }
			/>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppHeader)