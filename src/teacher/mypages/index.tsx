import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

const Mypage = React.lazy(() => import('../../commons/Components/Mypage'))

const Mypages = ({ match, history }) => (
    <Mypage history={history}/>
/*    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}`} />
            <Route path={`${match.url}`} render={() => <Mypage history={history}/>}/>
            <Redirect to="/error" />
        </Switch>
    </Suspense>*/
);
export default Mypages
