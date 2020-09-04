import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-lightbox/style.css';
import 'video.js/dist/video-js.css';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import menuReducers from "./commons/menuReducers";
import {mainpageReducer} from "./commons/MainPage"
import {teacherStreamingReducer} from "./teacher/streamings"
import {studentStreamingReducer} from "./student/streamings"
import {tNoticeDetailReducer} from './teacher/notices'
import {tClassesReducer} from './teacher/classes/ClassesMain'
import {tTimetableReducer} from './teacher/classes/dndTimetable/Timetable'

const App = React.lazy(() => import('./App'));

const rootReducer = combineReducers({
    menuReducers,
    mainpageReducer,
    teacherStreamingReducer,
    studentStreamingReducer,
    tNoticeDetailReducer,
    tClassesReducer,
    tTimetableReducer,
})


ReactDOM.render(
    <BrowserRouter>
        <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
            <DndProvider backend={HTML5Backend}>
                <Suspense fallback={<div className="loading"/>}>
                    <App/>
                </Suspense>
            </DndProvider>
        </Provider>
    </BrowserRouter>,

    document.getElementById('root')
)
serviceWorker.unregister();