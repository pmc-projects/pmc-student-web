import React from "react";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    page: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const SplashPage = () => {
    const classes = useStyles();

    return (
        <Container className={classes.page}>
            <CircularProgress/>
        </Container>
    );
};

export default SplashPage;
