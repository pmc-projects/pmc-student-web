import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import Todos from "../../core/containers/todos";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import DeleteIcon from '@material-ui/icons/Delete';
import TodoForm from "./TodoForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    newTodo: {
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

const TodoListItem = ({todo, onToggle, onDelete}) => {
    return (
        <ListItem data-testid={"todo-item"} button onClick={() => onToggle(todo)}>
            <ListItemIcon>
                <Checkbox
                    data-role="check" data-name={todo.name}
                    edge="start"
                    tabIndex={-1}
                    color='primary'
                    onChange={() => onToggle(todo)}
                    checked={todo.done}
                />
            </ListItemIcon>
            <ListItemText
                primary={<Typography data-role="title" data-name={todo.name}
                                     style={{textDecoration: todo.done ? 'line-through' : ''}}>
                    {todo.name}
                </Typography>}
                secondary={<Typography style={{textDecoration: todo.done ? 'line-through' : ''}}>
                    <i>{todo.description}</i>
                </Typography>}/>
            <ListItemSecondaryAction>
                <IconButton data-testid="delete-todo" data-name={todo.name} data-role="delete" onClick={() => onDelete(todo)}>
                    <DeleteIcon style={{color: "black"}}/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

const TodoList = () => {
    const classes = useStyles();

    const todos = Todos.useContainer();

    const [createForm, setCreateForm] = useState(false);

    if (todos.todos === null) {
        return (
            <Box style={{display: "flex", justifyContent: "center", marginTop: 300}}>
                <CircularProgress data-testid="todo-list-loader"/>
            </Box>
        );
    }

    return (
        <Card>
            <Typography component="h1" variant="h5" style={{padding: 15}}>
                Zadaci
            </Typography>
            <List id="todo-list">
                {todos.todos.map((todo) => {
                    return (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            onToggle={(todo) => todos.toggleTodo(todo)}
                            onDelete={(todo) => todos.deleteTodo(todo.id)}/>
                    );
                })}
                {
                    createForm
                        ? <Grid key={'form'} item xs={12}>
                            <TodoForm
                                isLoading={todos.loading}
                                errorMessage={todos.errorMessage}
                                onSubmit={(name, desc) => {
                                    todos.createTodo(name, desc);
                                    setCreateForm(false);
                                }}
                                onCancel={() => setCreateForm(false)}/>
                        </Grid>
                        : <Grid key={'new'} item xs={12}>
                            <Link id="create-todo" onClick={() => setCreateForm(true)} style={{cursor: "pointer"}}>
                                <div className={classes.newTodo}>
                                    <Typography>Dodaj novi zadatak</Typography>
                                </div>
                            </Link>
                        </Grid>
                }
            </List>
        </Card>
    );
};

export default TodoList;