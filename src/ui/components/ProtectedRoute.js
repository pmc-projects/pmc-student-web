import React from "react";
import {Redirect, Route} from "react-router-dom";
import Authentication from "../../core/containers/authentication";

const PrivateRoute = ({component: Component, ...rest}) => {
    let authentication = Authentication.useContainer();

    return (
        <Route
            {...rest}
            render={props =>
                authentication.user !== null ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;