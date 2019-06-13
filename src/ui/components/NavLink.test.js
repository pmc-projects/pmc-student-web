import React from 'react'

import 'jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import NavLink from "./NavLink";
import TestingRouter from "./testutil/TestingRouter";
import {Route} from "react-router-dom";

describe('NavLink', () => {
    it('responds to clicks correctly', async () => {
        const onClick = jest.fn();

        const {getByText} = render(
            <TestingRouter>
                <Route path="/" exact={true} render={() => {
                    return (
                        <NavLink to="/redirect" onClick={onClick}>
                            MyLink
                        </NavLink>
                    );
                }}/>

                <Route path="/redirect" render={() => <h1>Redirected</h1>}/>
            </TestingRouter>
        );

        fireEvent.click(getByText('MyLink'));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(getByText('Redirected')).toBeInTheDocument();
    })
});