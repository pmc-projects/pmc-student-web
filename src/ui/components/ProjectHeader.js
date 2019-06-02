import React from "react";
import Todos from "../../core/containers/todos";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    subheader: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    }
}));

const ProjectHeader = ({history}) => {
    const classes = useStyles();

    const todos = Todos.useContainer();

    if (todos.project === null) {
        return (
            <React.Fragment/>
        );
    }

    return (
        <React.Fragment>
            <Box style={{display: "flex", alignItems: "center"}}>
                <Box>
                    <IconButton onClick={() => {
                        history.goBack()
                    }}>
                        <ArrowBack style={{color: "black"}}/>
                    </IconButton>
                </Box>
                <Box style={{flexGrow: 1}}>
                    <Box className={classes.header}>
                        <Typography component="h1" variant="h5">
                            {todos.project.name}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.subheader}>
                <Typography>
                    {todos.project.description}
                </Typography>
            </Box>
        </React.Fragment>
    );
};

export default ProjectHeader;