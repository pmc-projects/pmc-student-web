import React from 'react';
import Authentication from "../../core/containers/authentication";
import Link from "@material-ui/core/Link";

const LogoutButton = () => {
    const authentication = Authentication.useContainer();

    return (
        <Link onClick={() => {
            authentication.signOut()
        }}>
            Izlogujte se
        </Link>
    );
};

export default LogoutButton;