import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';


const NavLink = ({to, onClick, children, ...props}) => {
    return (
        <MaterialLink component={RouterLink} to={to} onClick={onClick} {...props}>
            {children}
        </MaterialLink>
    )
};

export default NavLink;