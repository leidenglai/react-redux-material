import React from 'react';
import { browserHistory } from 'react-router'

import { List, ListItem, makeSelectable } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/divider'

const SelectableList = makeSelectable(List);

export default class NavigationMenu extends React.Component {
  static propTypes = {
    categories: React.PropTypes.array
  };
  render() {
    return (
      <Drawer 
      	open={true} 
      	docked={true} 
      	zDepth={1} 
      	width={200}
      >
	      <AppBar
	      	title={'Socialshops'}
					zDepth={0}
					style={{height: 50, lineHeight:50}}
	        titleStyle={{lineHeight:"50px"}}
	        showMenuIconButton = {false}
				/>
				<SelectableList>
					<Subheader>菜单</Subheader>
					{this.props.categories.map((item, key) => {
						return (
							<ListItem
								key={key}
								primaryText={item.title}
								value={item.value}
								onClick={() => browserHistory.push(item.router) }
						/> );
					})}

				</SelectableList>
			</Drawer>
    );
  }
}