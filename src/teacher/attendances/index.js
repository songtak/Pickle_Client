import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const AttendanceMain = React.lazy(() => import('./AttendanceMain'));
const AttendanceDetail = React.lazy(()=> import('./Attendance'))
const Attendances = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/attendance`} />
            <Route path={`${match.url}/attendance`} render={(props) => <AttendanceMain match={match} />}/>
            <Route path={`${match.url}/detail`} render={(props) => <AttendanceDetail match={match} />}/>
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Attendances;