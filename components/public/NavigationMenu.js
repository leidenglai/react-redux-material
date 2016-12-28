import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider'

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.string.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default class NavigationMenu extends Component {
  static propTypes = {
    categories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: window.location.pathname,
    }
  }

  componentWillReceiveProps() {
    this.setState({ selectedIndex: window.location.pathname })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selectedIndex === this.state.selectedIndex ? false : true;
  }

  handleListChange = (event, index, value) => this.setState({ selectedIndex: value });

  handleModuleJump = (router, value, event) => {
    if (value !== this.state.selectedIndex) {
      browserHistory.push(router);
    }
  }

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
				<SelectableList
					defaultValue={this.state.selectedIndex}>
					<Subheader>菜单</Subheader>
					{this.props.categories.map((item, key) => {
						return (
							<ListItem
								key={key}
								primaryText={item.title}
								leftIcon={<FontIcon
						      className={item.icon}
						      style={{fontSize: 22, textAlign:"center", lineHeight: "24px"}}
						    />}
                initiallyOpen={true}
                nestedItems={_.map(item.nestedItems, (nestedItem, nestedKey)=> (<ListItem 
                  key={nestedKey}
                  onTouchTap={this.handleModuleJump.bind(this, nestedItem.router, nestedItem.value)}
                  value = { nestedItem.value }
                  leftIcon={<FontIcon
                    className={nestedItem.icon}
                    style={{fontSize: 18,textAlign:"center", lineHeight: "24px"}}
                  />}
                  primaryText={nestedItem.title} />))}
						/> );
					})}
				</SelectableList>
			</Drawer>
    );
  }
}