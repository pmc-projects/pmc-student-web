import React from 'react'

import 'jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import TodoForm from "./TodoForm";

describe('TodoForm', () => {
    it('se prikazuje', async () => {
        render(<TodoForm/>);
    });

    it('uspesno prosledjuje unos korisnika', async () => {
        const onSubmit = jest.fn();

        const {getByTestId, getByText} = render(<TodoForm onSubmit={onSubmit}/>);

        fireEvent.change(getByTestId('name'), {target: {value: "Test projekat"}});
        fireEvent.change(getByTestId('description'), {target: {value: "Test opis"}});

        fireEvent.click(getByText('Napravi'));

        expect(onSubmit.mock.calls[0][0]).toBe('Test projekat');
        expect(onSubmit.mock.calls[0][1]).toBe('Test opis');
    });

    it('uspesno obustavlja proces kreiranja', async () => {
        const onCancel = jest.fn();

        const {getByText} = render(<TodoForm onCancel={onCancel}/>);

        fireEvent.click(getByText('Cancel'));

        expect(onCancel).toBeCalledTimes(1);
    });

    it('prikazuje gresku', async () => {
        const {getByText} = render(<TodoForm errorMessage={"Doslo je do greske"}/>);

        expect(getByText('Doslo je do greske')).toBeInTheDocument();
    });
});