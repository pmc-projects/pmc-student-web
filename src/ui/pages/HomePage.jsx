import React from "react";
import LogoutButton from "../components/LogoutButton";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Authentication from "../../core/containers/authentication";

const useStyles = makeStyles(theme => ({
    //@TODO: Update typography param to increase weight
    title: {
        fontWeight: 800,
        marginBottom: 5,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    centered: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    spinner: {
        color: "#ffffff",
    }
}));

const HomePage = () => {
    const classes = useStyles();

    const authentication = Authentication.useContainer();
    console.log(authentication.user);

    return <div>
        <Typography component="h1" variant="h5" className={classes.title}>
            Dobrodošli, {authentication.user.displayName || authentication.user.email}
        </Typography>
        <br/>
        <LogoutButton/>
    </div>;
};

export default HomePage;
