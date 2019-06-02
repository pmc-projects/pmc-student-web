import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Authentication from "../../core/containers/authentication";
import {Container} from "@material-ui/core";

import Todos from "../../core/containers/todos"
import TodoList from "../components/TodoList";
import ProjectHeader from "../components/ProjectHeader";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(8),
    },
}));

const ProjectPage = (props) => {
    const classes = useStyles();

    const authentication = Authentication.useContainer();

    const {match: {params}} = props;

    const projectId = params.projectId;

    return <Container maxWidth="md" className={classes.container}>
        <Todos.Provider initialState={{userId: authentication.user.uid, projectId: projectId}}>
            <ProjectHeader history={props.history}/>
            <TodoList/>
        </Todos.Provider>
    </Container>;
};

export default ProjectPage;
