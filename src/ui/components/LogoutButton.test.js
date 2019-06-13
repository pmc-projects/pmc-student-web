import React from 'react'

import 'jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'

import Authentication from "../../core/containers/authentication";
import LogoutButton from "./LogoutButton";

describe('LogoutButton', () => {
    it('responds to clicks correctly', async () => {
        const mockSignOut = jest.fn();
        mockSignOut.mockReturnValue(true);

        Authentication.useContainer = jest.fn(() => {
            return {
                signOut: mockSignOut,
            }
        });

        const {getByText} = render(
            <LogoutButton/>
        );

        fireEvent.click(getByText('Izlogujte se'));

        expect(mockSignOut).toHaveBeenCalledTimes(1);
    })
});