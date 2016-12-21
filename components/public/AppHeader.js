import React from 'react';

import AppBar from 'material-ui/AppBar';

export default class AppHeader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
  };

  render() {
    const { title } = this.props;

    return (
      <AppBar showMenuIconButton={false}
				zDepth={1}
				title={title}
				style={{position: "fixed", top: 0,	zIndex: 1200, height: 50, lineHeight:50, backgroundColor: "#fff",boxShadow: "0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12)"}}
        titleStyle={{lineHeight:"50px"}}
			/>
    )
  }
}