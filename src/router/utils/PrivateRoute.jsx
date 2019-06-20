import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PrivateRoute = ({ component: Component, publicRoute, title, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <React.Fragment>
                <Helmet>
                    <title>Hobbytalks client {title ? ` | ${title}` : ''}</title>
                </Helmet>
                {publicRoute ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )}
            </React.Fragment>
        )}
    />
);

export default PrivateRoute;
