import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';

import deepPurple from '@material-ui/core/colors/deepPurple';

import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[500],
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
