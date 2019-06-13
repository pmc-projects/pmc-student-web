import React from 'react'

import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

const TestingRouter = ({children}) => (
    <Router history={history}>
        {children}
    </Router>
);

export default TestingRouter