import {useEffect, useState} from "react";
import {createContainer} from "unstated-next";

import Firebase, {Timestamp} from "../services/firebase";

function useTodos({userId, projectId}) {
    const [project, setProject] = useState(null);
    const [todos, setTodos] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const createTodo = (name, description) => {
        if (!name) {
            setErrorMessage("Unesite ime zadatka");
            return;
        }

        setLoading(true);

        Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .doc(projectId)
            .collection('todo')
            .doc()
            .set({
                name: name,
                description: description,
                done: false,
                created_at: Timestamp.now(),
            })
            .then(_ => setErrorMessage(null))
            .catch(error => setErrorMessage(error))
            .finally(() => setLoading(false));
    };

    const deleteTodo = (todoId) => {
        Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .doc(projectId)
            .collection('todo')
            .doc(todoId)
            .delete()
            .then(_ => setErrorMessage(null))
            .catch(error => setErrorMessage(error))
    };

    const toggleTodo = (todo) => {
        Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .doc(projectId)
            .collection('todo')
            .doc(todo.id)
            .update({
                done: !todo.done,
            })
            .then(_ => setErrorMessage(null))
            .catch(error => setErrorMessage(error))
    };

    useEffect(() => {
        Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .doc(projectId)
            .get()
            .then(doc => {
                setProject(Object.assign({
                    id: doc.id,
                }, doc.data()))
            });

        const cancel = Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .doc(projectId)
            .collection('todo')
            .orderBy('created_at')
            .onSnapshot((snapshot) => {
                setTodos(snapshot.docs.map(doc => Object.assign({id: doc.id}, doc.data())));
                setErrorMessage(null);
            }, (error) => {
                setErrorMessage(error);
            });
        return () => {
            cancel();
        }
    }, [userId, projectId]);


    return {project, todos, errorMessage, loading, createTodo, deleteTodo, toggleTodo};
}

const Todos = createContainer(useTodos);

export default Todos;

