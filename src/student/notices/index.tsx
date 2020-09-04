import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const NoticeList = React.lazy(() => import('./NoticeList'))
const NoticeDetail = React.lazy(() => import('./NoticeDetail'))

const Notices = ({ match, history }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list/1`} />
            <Route path={`${match.url}/list/:id`} render={(props) => <NoticeList {...props}/>}/>
            <Route path={`${match.url}/detail/:id`} render={(props) => <NoticeDetail {...props}/>}/>
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Notices;
