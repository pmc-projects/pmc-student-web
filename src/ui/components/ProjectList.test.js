import React from 'react'

import 'jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import Projects from "../../core/containers/projects";
import ProjectList from "./ProjectList";
import TestingRouter from "./testutil/TestingRouter";
import {Route} from "react-router-dom";

describe('ProjectList', () => {
    it('prikazuje spinner ukoliko ne postoje predmeti', async () => {
        Projects.useContainer = jest.fn(() => {
            return {
                projects: null,
            }
        });

        const {getByTestId} = render(<ProjectList/>);

        expect(getByTestId('project-list-spinner')).toBeInTheDocument();
    });

    it('prikazuje listu projekata', async () => {
        Projects.useContainer = jest.fn(() => {
            return {
                projects: [
                    {
                        id: 1,
                        name: "Predmet #1",
                        description: "Opis predmeta"
                    },
                    {
                        id: 2,
                        name: "Predmet #2",
                    }
                ],
            }
        });

        const {getAllByTestId} = render(
            <TestingRouter>
                <ProjectList/>
            </TestingRouter>
        );

        expect(getAllByTestId('project-item').length).toEqual(2)
    });

    it('navigacija na pojedinacni projekat', async () => {
        Projects.useContainer = jest.fn(() => {
            return {
                projects: [
                    {
                        id: 1,
                        name: "Predmet #1",
                        description: "Opis predmeta"
                    },
                ],
            }
        });

        const {getByText} = render(
            <TestingRouter>
                <Route path="/" exact={true} render={() => <ProjectList/>}/>
                <Route path="/project/1" render={() => <h1>Projekat</h1>}/>
            </TestingRouter>
        );

        fireEvent.click(getByText('Predmet #1'));

        expect(getByText('Projekat')).toBeInTheDocument()
    });

    it('brisanje projekta', async () => {
        const onDelete = jest.fn();

        Projects.useContainer = jest.fn(() => {
            return {
                projects: [
                    {
                        id: 1,
                        name: "Predmet #1",
                        description: "Opis predmeta"
                    },
                ],

                deleteProject: onDelete,
            }
        });

        const {getByTestId} = render(
            <TestingRouter>
                <ProjectList/>
            </TestingRouter>
        );

        fireEvent.click(getByTestId('delete-project'));

        expect(onDelete).toBeCalledTimes(1);
    });
});