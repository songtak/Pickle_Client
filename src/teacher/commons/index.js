import React, {Suspense} from 'react';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import AppLayout from './AppLayout';

const Home = React.lazy(() => import('./Home'))
const Notices = React.lazy(() => import('../notices'));
const Classes = React.lazy(() => import('../classes'));
const Grades = React.lazy(() => import('../grades'))
const Attendances = React.lazy(() => import('../attendances'));
const Mypages = React.lazy(() => import('../mypages'));

const App = ({match}) => {
    return <AppLayout>
        <div className="dashboard-wrapper">
            <Suspense fallback={<div className="loading"/>}>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={`${match.url}/main`}/>
                    <Route
                        path={`${match.url}/main`}
                        render={(props) => <Home {...props} />}
                    />
                    <Route
                        path={`${match.url}/notice`}
                        render={(props) => <Notices {...props} />}
                    />
                    <Route
                        path={`${match.url}/class`}
                        render={(props) => <Classes {...props} />}
                    />
                    <Route
                        path={`${match.url}/grade`}
                        render={(props) => <Grades {...props} />}
                    />
                    <Route
                        path={`${match.url}/attendance`}
                        render={(props) => <Attendances {...props} />}
                    />
                    <Route
                        path={`${match.url}/mypage`}
                        render={(props) => <Mypages {...props} />}
                    />
                    <Redirect to="/error"/>

                </Switch>
            </Suspense>
        </div>
    </AppLayout>;
};


export default withRouter(App);
