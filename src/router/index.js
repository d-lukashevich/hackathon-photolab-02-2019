import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { PrivateRoute as Route } from './utils';
import { ConnectedRouter } from 'react-router-redux';

import AppPage from '../pages/App';

import { history } from '../store/initStore';

const PUBLIC_URL = process.env.PUBLIC_URL;
class MainRouter extends React.Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route
                        exact
                        path={`${PUBLIC_URL}/`}
                        title="Main page"
                        publicRoute={true}
                        component={AppPage}
                    />
                    <Redirect to={`${PUBLIC_URL}/`} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default MainRouter;
