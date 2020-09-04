import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Attendance = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './Attendance')
);
const Attendances = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/attendance`} />
            <Route
                path={`${match.url}/attendance`}
                render={(props) => <Attendance {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Attendances;