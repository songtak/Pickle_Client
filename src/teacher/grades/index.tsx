import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const ClassScore = React.lazy(() => import('./ClassScore'))
const InsertScore = React.lazy(() => import('./InsertScore'))
const StudentScore = React.lazy(() => import('./StudentScore'))
const Mock = React.lazy(() => import('./Mock'))

const Grades = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/grade`} />
            <Route path={`${match.url}/grade`} render={() => <ClassScore />}/>
            <Route path={`${match.url}/student`} render={() => <StudentScore/>}/>
            <Route path={`${match.url}/input`} render={() => <InsertScore/>}/>
            <Route path={`${match.url}/mock`} render={() => <Mock/>}/>
            <Redirect to="/error" />
        </Switch>
    </Suspense>

);
export default Grades;