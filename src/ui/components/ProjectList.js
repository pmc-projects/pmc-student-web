import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import Projects from "../../core/containers/projects";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ProjectForm from "./ProjectForm";
import DeleteIcon from '@material-ui/icons/Delete';
import NavLink from "./NavLink";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    item: {
        minHeight: 100,
    },
    newProject: {
        minHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    delete: {
        padding: 20,
        cursor: "pointer",
    }
}));

const ProjectList = () => {
    const classes = useStyles();
    const projects = Projects.useContainer();

    const [createForm, setCreateForm] = useState(false);

    if (projects.projects === null) {
        return (
            <Box style={{display: "flex", justifyContent: "center", marginTop: 100}}>
                <CircularProgress id="project-list-spinner"/>
            </Box>
        );
    }

    return (
        <Grid id="project-list" container spacing={1}>
            {projects.projects.map((project) => {
                return (
                    <Grid key={project.id} item xs={12}>
                        <Card className={classes.item}>
                            <CardHeader title={<NavLink data-name={project.name}
                                                        to={`/project/${project.id}`}>{project.name}</NavLink>}
                                        action={<DeleteIcon
                                            data-role="delete"
                                            data-name={project.name}
                                            className={classes.delete}
                                            onClick={(e) => {
                                                projects.deleteProject(project.id);
                                                e.stopPropagation();
                                            }}/>}/>
                            <CardContent>
                                {project.description}
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
            {
                createForm
                    ? <Grid key={'form'} item xs={12}>
                        <ProjectForm
                            isLoading={projects.loading}
                            errorMessage={projects.errorMessage}
                            onSubmit={(name, desc) => {
                                projects.createProject(name, desc);
                                setCreateForm(false);
                            }}
                            onCancel={() => setCreateForm(false)}/>
                    </Grid>
                    : <Grid key={'new'} item xs={12}>
                        <Link id="create-project" onClick={() => setCreateForm(true)} style={{cursor: "pointer"}}>
                            <div className={classes.newProject}>
                                <Typography>Dodaj novi predmet</Typography>
                            </div>
                        </Link>
                    </Grid>
            }
        </Grid>
    );
};

export default ProjectList;