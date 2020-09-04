import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Class = React.lazy(() => import( './ClassesMain'));
const SubjectDetail = React.lazy(()=> import ('./SubjectDetail'))
const Timetable = React.lazy(()=> import ('./dndTimetable/Timetable'))

const Classes = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/class`} />

            <Route path={`${match.url}/class`} render={() => <Class match={match} />}/>
            <Route path={`${match.url}/detail`} render={() => <SubjectDetail match={match} />}/>
            <Route path={`${match.url}/timetable`} render={() => <Timetable match={match} />}/>

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Classes;