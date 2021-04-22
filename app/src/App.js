import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import login from './pages/login';
import signup from './pages/signup';
import landing from './pages/landing';
import home from "./pages/home";
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
	palette: {
    primary: blue,
    secondary: amber,
  },
});

function App() {  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={login}/>
            <Route exact path="/signup" component={signup}/>
            <Route exact path="/" component={home}/>
            <Route exact path="/landing" component={landing}/>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
export default App;