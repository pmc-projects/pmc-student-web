import React from 'react'

import 'jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import ProjectHeader from "./ProjectHeader";
import Todos from "../../core/containers/todos";

describe('ProjectHeader', () => {
    it('se ne prikazuje ukoliko ne postoje predmeti', async () => {
        Todos.useContainer = jest.fn(() => {
            return {
                project: null
            }
        });

        const {queryByText} = render(<ProjectHeader/>);

        expect(queryByText('Test Predmet')).toBeNull();
    });

    it('prikazuje osnovne informacije o predmetu', async () => {
        Todos.useContainer = jest.fn(() => {
            return {
                project: {
                    name: "Test Predmet",
                    description: "Opis test predmeta"
                }
            }
        });

        const {getByText} = render(<ProjectHeader/>);

        expect(getByText('Test Predmet')).toBeInTheDocument();
        expect(getByText('Opis test predmeta')).toBeInTheDocument();
    });

    it('moze da navigira na prethodnu stranicu', async () => {
        Todos.useContainer = jest.fn(() => {
            return {
                project: {
                    name: "Test Predmet",
                    description: "Opis test predmeta"
                }
            }
        });

        const goBack = jest.fn();
        const {getByTestId} = render(<ProjectHeader history={{goBack}}/>);

        fireEvent.click(getByTestId('back-btn'));

        expect(goBack).toBeCalledTimes(1);
    });
});