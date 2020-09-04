import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {Row} from 'reactstrap';
import main_logo from '../assets/img/main_logo.png'
import main_student from '../assets/img/main_student.png'
import main_teacher from '../assets/img/main_teacher.png'
import './layout.css'
import '../assets/css/sass/themes/gogo.light.greenlime.scss'

const LOGIN = 'main/LOGIN_REQUEST'
const loginAction = data => ({type: LOGIN, payload: data})
export const mainpageReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, payload: action.payload}
        default:
            return state
    }
}


const MainPage = () => {
    const [tUserId, setTUserId] = useState("gra2cla2")
    const [sUserId, setSUserId] = useState("cmmt1gz")
    const [tUserPw, setTUserPw] = useState("1111")
    const [sUserPw, setSUserPw] = useState("ml01l6w3")
    const [isTVisible, setIsTVisible] = useState(false)
    const [isSVisible, setIsSVisible] = useState(false)
    const [isTLogin, setIsTLogin] = useState(false)
    const [isSLogin, setIsSLogin] = useState(false)
    const dispatch = useDispatch()
    localStorage.clear()
    const onClickVisible = (t, s) => {
        setIsTVisible(t);
        setIsSVisible(s);
    }
    const onClickLogin = (userId, userPw, positionChecker, url, visible) => {
        axios.post(
            'http://localhost:5000/user/login',
            {userId: userId, userPw: userPw, positionChecker: positionChecker},
            {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            .then(
                ({data}) => {
                    if (data.length != 0) {
                        localStorage.setItem("user", data)
                        localStorage.setItem("userCode", data.userCode)
                        localStorage.setItem("id", data.id)
                        localStorage.setItem("name", data.name)
                        localStorage.setItem("curGrade", data.curGrade)
                        localStorage.setItem("homeClass", data.homeClass)
                        localStorage.setItem("schoolCode", data.schoolCode)
                        dispatch(loginAction(data))
                        window.location.href=url
                    } else {
                        visible(true)
                    }
                }
            )
            .catch(error => {
                throw(error)
            })
    }


    return <div id="main-page">
        <div id="main-title">
            <img src={main_logo}/><br/>
        </div>
        <div className="btn border-0 main-img" onClick={() => onClickVisible(true, false)}>
            <img src={main_teacher}/><br/>
            <h2 className="main-select font_Noto_Sans_KR">교사</h2>
            {isTVisible && <div>
                <Row>
                    <label className="col-sm-4 col-form-label">아이디</label>
                    <input type="text" className="form-control col-sm-8" value={tUserId}
                           onChange={e => setTUserId(e.target.value)}/>
                </Row>
                <br/>
                <Row>
                    <label className="col-sm-4 col-form-label">비밀번호</label>
                    <input type="password" className="form-control col-sm-8" value={tUserPw}
                           onChange={e => setTUserPw(e.target.value)}/>
                </Row>
                <br/>
                <button className="btn border-0 btn-primary"
                        onClick={() => onClickLogin(tUserId, tUserPw, 0, "/teacher", setIsTLogin)}>로그인</button>
                {isTLogin &&
                <div className="main-login">아이디와 비밀번호를 확인해 주십시오.</div>}
            </div>}
        </div>

        <div className="btn border-0 main-img" onClick={() => onClickVisible(false, true)}>
            <img src={main_student}/><br/>
            <h2 className="main-select font_Noto_Sans_KR">학생</h2>
            {isSVisible && <div>
                <Row>
                    <label className="col-sm-4 col-form-label">아이디</label>
                    <input type="text" className="form-control col-sm-8" value={sUserId}
                           onChange={e => setSUserId(e.target.value)}/>
                </Row>
                <br/>
                <Row>
                    <label className="col-sm-4 col-form-label">비밀번호</label>
                    <input type="password" className="form-control col-sm-8" value={sUserPw}
                           onChange={e => setSUserPw(e.target.value)}/>
                </Row>
                <br/>
                <button className="btn border-0 btn-primary"
                        onClick={() => onClickLogin(sUserId, sUserPw, 1, "/student", setIsSLogin)}>로그인</button>
                {isSLogin &&
                <div className="main-login">아이디와 비밀번호를 확인해 주십시오.</div>}
            </div>}
        </div>

    </div>
}
export default MainPage