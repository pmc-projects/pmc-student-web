import React, {useState} from "react";
import {Card} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    body: {
        flexGrow: 1,
        padding: 20,
    },
    actions: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    actionSubmit: {},
    actionCancel: {
        cursor: "pointer",
        marginRight: 10,
    },
}));

const TodoForm = ({onSubmit, onCancel, isLoading = false, errorMessage = null}) => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Card className={classes.container}>
            <CardContent className={classes.body}>
                <Typography component="h2" variant="h5">
                    Novi zadatak
                </Typography>
                <TextField
                    id="name"
                    name="name"
                    variant="outlined"
                    label="Zadatak"
                    margin="normal"
                    autoComplete="false"
                    required
                    fullWidth

                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                    inputProps={{
                        "data-testid": "name"
                    }}
                />
                <TextField
                    id="description"
                    name="description"
                    variant="outlined"
                    label="Opis zadatka"
                    margin="normal"
                    autoComplete="false"
                    required
                    fullWidth
                    multiline={true}

                    disabled={isLoading}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                    inputProps={{
                        "data-testid": "description"
                    }}
                />
                {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
            </CardContent>
            <CardActions className={classes.actions}>
                <Link className={classes.actionCancel} onClick={onCancel}>Cancel</Link>
                <Button id="submit-todo" variant="contained" color="primary" size="large" onClick={() => onSubmit(name, description)}>
                    {!isLoading
                        ? <Typography>Napravi</Typography>
                        : <CircularProgress size={20} style={{color: 'white'}}/>
                    }
                </Button>
            </CardActions>
        </Card>
    );
};

export default TodoForm;