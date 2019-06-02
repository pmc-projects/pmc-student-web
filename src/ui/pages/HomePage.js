import React from "react";
import LogoutButton from "../components/LogoutButton";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Authentication from "../../core/containers/authentication";
import {Container} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ProjectList from "../components/ProjectList";

import Projects from "../../core/containers/projects"

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(8),
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    subheader: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    }
}));

const HomePage = () => {
    const classes = useStyles();

    const authentication = Authentication.useContainer();

    return <Container maxWidth="md" className={classes.container}>
        <Box className={classes.header}>
            <Typography component="h1" variant="h5">
                PMC Student
            </Typography>

            <LogoutButton/>
        </Box>
        <Box className={classes.subheader}>
            <Typography>
                Izaberite predmet za koji želite da pregledate obaveze.
            </Typography>
        </Box>

        <Projects.Provider initialState={authentication.user.uid}>
            <ProjectList/>
        </Projects.Provider>
    </Container>;
};

export default HomePage;
