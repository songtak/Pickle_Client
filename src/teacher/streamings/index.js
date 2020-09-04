import React, {Suspense} from "react"
import {withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

export {teacherStreamingReducer} from './TeacherStreaming'

const TeacherStreaming = React.lazy(() => import('./TeacherStreaming'))

const Streamings = ({match}) => {
    return (
        <Suspense fallback={<div className="loading"/>}>
            <Router>
                <Route path={'/teacherstreaming'} render={(props) => <TeacherStreaming {...props}/>}/>
            </Router>
        </Suspense>
    )
}

export default withRouter(Streamings)