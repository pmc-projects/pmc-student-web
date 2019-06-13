import React from 'react'

import 'jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import TodoList from "./TodoList";
import Todos from "../../core/containers/todos";
import Projects from "../../core/containers/projects";

describe('TodoList', () => {
    it('se prikazuje', async () => {
        Todos.useContainer = jest.fn(() => {
            return {
                todos: null
            }
        });

        render(<TodoList/>);
    });

    it('prikazuje loader ukoliko podatci nisu ucitani', async () => {
        Todos.useContainer = jest.fn(() => {
            return {
                todos: null
            }
        });

        const {getByTestId} = render(<TodoList/>);

        expect(getByTestId('todo-list-loader')).toBeInTheDocument();
    });


    it('prikazuje listu zadataka', async () => {
        Todos.useContainer = jest.fn(() => {
            return {
                todos: [
                    {
                        id: 1,
                        name: "Zadatak #1",
                        description: "Opis zadatka"
                    },
                    {
                        id: 2,
                        name: "Predmet #2",
                    }
                ],
            }
        });

        const {getAllByTestId} = render(<TodoList/>);

        expect(getAllByTestId('todo-item').length).toEqual(2)
    });

    it('brisanje zadatka', async () => {
        const onDelete = jest.fn();

        Todos.useContainer = jest.fn(() => {
            return {
                todos: [
                    {
                        id: 1,
                        name: "Zadatak #1",
                        description: "Opis zadatka"
                    },
                ],

                deleteTodo: onDelete,
            }
        });

        const {getByTestId} = render(<TodoList/>);

        fireEvent.click(getByTestId('delete-todo'));

        expect(onDelete).toBeCalledTimes(1);
    });
});