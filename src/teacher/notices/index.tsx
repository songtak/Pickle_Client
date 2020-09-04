import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export {tNoticeDetailReducer} from './NoticeDetail'

const NoticeList = React.lazy(() => import('./NoticeList'))
const NoticeDetail = React.lazy(() => import('./NoticeDetail'))
const NoticeWrite = React.lazy(() => import('./NoticeWrite'))
const NoticeModify = React.lazy(() => import('./NoticeModify'))

const Notices = ({ match, history }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list/1`} />
            <Route path={`${match.url}/list/:id`} render={(props) => <NoticeList {...props}/>}/>
            <Route path={`${match.url}/detail/:id`} render={(props) => <NoticeDetail {...props}/>}/>
            <Route path={`${match.url}/modify/:id`} render={(props) => <NoticeModify {...props}/>}/>
            <Route path={`${match.url}/write`} render={() => <NoticeWrite history={history}/>}/>
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Notices;
