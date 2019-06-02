import {useEffect, useState} from "react";
import {createContainer} from "unstated-next";

import Firebase, {Timestamp} from "../services/firebase";

function useProjects(userId) {
    const [projects, setProjects] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const createProject = (name, description) => {
        if (!name) {
            setErrorMessage("Unesite ime predmeta");
            return;
        }

        setLoading(true);

        Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .doc()
            .set({
                name: name,
                description: description,
                created_at: Timestamp.now(),
            })
            .then(_ => setErrorMessage(null))
            .catch(error => setErrorMessage(error))
            .finally(() => setLoading(false));
    };

    const deleteProject = (projectId) => {
        Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .doc(projectId)
            .delete()
            .then(_ => setErrorMessage(null))
            .catch(error => setErrorMessage(error))
    };

    useEffect(() => {
        const cancel = Firebase.firestore()
            .collection('user')
            .doc(userId)
            .collection('project')
            .orderBy('created_at')
            .onSnapshot((snapshot) => {
                setProjects(snapshot.docs.map(doc => Object.assign({id: doc.id}, doc.data())));
                setErrorMessage(null);
            }, (error) => {
                setErrorMessage(error);
            });
        return () => {
            cancel();
        }
    }, [userId]);


    return {projects, errorMessage, loading, createProject, deleteProject};
}

const Projects = createContainer(useProjects);

export default Projects;

