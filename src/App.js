import React, { useState } from 'react';
import store from './redux/store';

import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { defaultTheme } from './Components/Themes';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Header from './Components/Header';
import Input from './Pages/Input';
import Output from './Pages/Output';

const useStyles = makeStyles(() => ({
  app: (theme) => ({
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: theme.backgroundColor,
  }),
}));

export const ThemeContext = React.createContext();

function App() {
  
  const [theme, setTheme] = useState(defaultTheme);
  const classes = useStyles(theme);

  const themeSetter = (value) => {
   setTheme(value);
  }
  
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <Box component="div" className={classes.app}>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Input themeSetter={themeSetter}></Input>
            </Route>
            <Route exact path="/output">
              <Output></Output>
            </Route>
          </Switch>
        </Box>
      </ThemeContext.Provider>
    </Provider>
  );
}

if (module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version',err);
  });
}

export default hot(App);