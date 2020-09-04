import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const Class = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './Class')
);
const Classes = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/class`} />
            <Route
                path={`${match.url}/class`}
                render={(props) => <Class {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Classes;