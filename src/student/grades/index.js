import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export {sGradeReducer} from './Grade'

const Grade = React.lazy(() => import('./Grade'));

const Grades = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/grade`} />
            <Route
                path={`${match.url}/grade`}
                render={(props) => <Grade {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>

);
export default Grades;