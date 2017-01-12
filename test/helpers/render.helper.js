import React from 'react';
import { mount, shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const muiTheme = getMuiTheme({
  fontFamily: "inherit",
  appBar: {
    height: 50,
  },
});
export function mountComponent(component) {
  const wrapper = mount(<MuiThemeProvider muiTheme={muiTheme}>{component}</MuiThemeProvider>);

  return wrapper;
}