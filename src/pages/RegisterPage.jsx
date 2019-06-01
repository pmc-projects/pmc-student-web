import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

import logo from "../logo.png";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import LoginForm from "../components/LoginForm";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logo: {
        width: 200,
    },
}));

const RegisterPage = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <img src={logo} alt="Logo" className={classes.logo}/>
            </div>
            <LoginForm isLogin={false}/>
        </Container>
    );
};

export default RegisterPage;
