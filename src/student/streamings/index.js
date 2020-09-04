import React, {Suspense} from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom';

export {studentStreamingReducer} from './StudentStreaming'

const StudentStreaming = React.lazy(() =>
    import('./StudentStreaming')
)

const Streamings = ({match}) => {
    return (
        <Suspense fallback={<div className="loading"/>}>
            <Router>
                <Route path={`${match.url}`} render={(props) => <StudentStreaming {...props}/>}/>
            </Router>
        </Suspense>
    )
}


export default Streamings