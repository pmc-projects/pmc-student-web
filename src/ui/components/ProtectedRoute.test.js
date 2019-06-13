import React from 'react'

import 'jest-dom/extend-expect'
import {render} from '@testing-library/react'
import TestingRouter from "./testutil/TestingRouter";
import {Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Authentication from "../../core/containers/authentication";

describe('ProtectedRoute', () => {
    it('dozvoljava prisup ako je korisnik ulogovan', async () => {
        Authentication.useContainer = jest.fn(() => {
            return {
                user: {
                    id: 1,
                    name: "Korisnik"
                },
            }
        });

        const Protected = () => <h1>Protected</h1>;
        const Redirected = () => <h1>Redirected</h1>;
        const {getByText} = render(
            <TestingRouter>
                <ProtectedRoute path="/" exact={true} component={Protected}/>
                <Route path="/login" component={Redirected}/>
            </TestingRouter>
        );

        expect(getByText('Protected')).toBeInTheDocument();
    });

    it('ne dozvoljava prisup ukoliko korisnik nije ulogovan', async () => {
        Authentication.useContainer = jest.fn(() => {
            return {
                user: null,
            }
        });

        const {getByText} = render(
            <TestingRouter>
                <ProtectedRoute path="/" exact={true} render={() => <h1>Protected</h1>}/>
                <Route path="/login" render={() => <h1>Redirected</h1>}/>
            </TestingRouter>
        );

        expect(getByText('Redirected')).toBeInTheDocument();
    });

});