import React from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';

import TopNav from './Topnav';
import Sidebar from './Sidebar';
import Footer from '../../commons/Footer';
import chatlogo from './img/chatlogo-student.png'
import '../../commons/layout.css'
import '../../assets/css/sass/themes/gogo.light.greenlime.scss'

const AppLayout = ({children, history}) => {
    const {containerClassnames} = useSelector(({menuReducers}) => ({containerClassnames: menuReducers.containerClassnames}))
    return <>
        <div id="app-container" className={containerClassnames}>
            <TopNav history={history}/>
            <Sidebar/>
            <main>
                <div className="container-fluid">{children}</div>
            </main>
            <Footer/>
        </div>
        <button className="chat-float" type="button" onClick={() => window.open("http://pf.kakao.com/_vsxkHxb/chat")}
                id="chatbot">
            <img src={chatlogo}/>
        </button>
    </>
};


export default withRouter(AppLayout)

