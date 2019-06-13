import React from 'react'

import 'jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import ProjectForm from "./ProjectForm";

describe('ProjectForm', () => {
    it('se prikazuje', async () => {
        render(<ProjectForm/>);
    });

    it('uspesno prosledjuje unos korisnika', async () => {
        const onSubmit = jest.fn();

        const {getByTestId, getByText} = render(<ProjectForm onSubmit={onSubmit}/>);

        fireEvent.change(getByTestId('name'), {target: {value: "Test projekat"}});
        fireEvent.change(getByTestId('description'), {target: {value: "Test opis"}});

        fireEvent.click(getByText('Napravi'));

        expect(onSubmit.mock.calls[0][0]).toBe('Test projekat');
        expect(onSubmit.mock.calls[0][1]).toBe('Test opis');
    });

    it('uspesno obustavlja proces kreiranja', async () => {
        const onCancel = jest.fn();

        const {getByText} = render(<ProjectForm onCancel={onCancel}/>);

        fireEvent.click(getByText('Cancel'));

        expect(onCancel).toBeCalledTimes(1);
    });

    it('prikazuje gresku', async () => {
        const {getByText} = render(<ProjectForm errorMessage={"Doslo je do greske"}/>);

        expect(getByText('Doslo je do greske')).toBeInTheDocument();
    });
});