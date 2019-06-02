import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';

import deepPurple from '@material-ui/core/colors/deepPurple';

import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Authentication from "../core/containers/authentication";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/ProtectedRoute";
import SplashPage from "./pages/SplashPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[500],
        },
    },
    typography: {
        h5: {
            fontWeight: 800,
        }
    }
});

const AppRouter = () => {
    const authentication = Authentication.useContainer();

    if (!authentication.initialized) {
        return <SplashPage/>;
    }

    return <Router>
        <div className="App">
            <PrivateRoute exact path="/" component={HomePage}/>

            <Route path="/login" component={LoginPage}/>
        </div>
    </Router>;
};

function App() {
    return (
        <Authentication.Provider>
            <ThemeProvider theme={theme}>
                <AppRouter/>
            </ThemeProvider>
        </Authentication.Provider>
    );
}

export default App;
