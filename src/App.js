import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const MainPage = React.lazy(() => import('./commons/MainPage'))
const Teacher = React.lazy(() => import('./teacher/commons/index'))
const Student = React.lazy(() => import('./student/commons/index'))
const TeacherStreaming = React.lazy(() => import('./teacher/streamings'));
const StudentStreaming  = React.lazy(() => import('./student/streamings'));
const Error = React.lazy(() => import ('./commons/error'));

const App = () => {
  return (
      <div className="h-100">
        <>
          <Suspense fallback={<div className="loading"/>}>
            <Router>
              <Switch>
                <Redirect exact from="/" to="/home"/>
                <Route
                    path="/home"
                    render={(props => <MainPage {...props}/>)}
                />
                <Route
                    path="/teacher"
                    render={(props) => <Teacher {...props} />}
                />
                <Route
                    path="/student"
                    render={(props) => <Student {...props} />}
                />
                <Route
                    path="/teacherstreaming"
                    exact
                    render={(props) => <TeacherStreaming {...props} />}
                />
                <Route
                    path="/studentstreaming"
                    exact
                    render={(props) => <StudentStreaming {...props} />}
                />
                <Route
                    path="/error"
                    exact
                    render={(props) => <Error {...props} />}
                />
                <Redirect to="/error"/>
              </Switch>
            </Router>
          </Suspense>
        </>
      </div>
  );
}


export default App;