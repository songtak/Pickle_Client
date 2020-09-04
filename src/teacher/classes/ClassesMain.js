import React, {useState, useEffect, useRef} from 'react';
import {Table} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'

import moment from 'moment'

import {useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import './classesMain.css'

const lessonListType = {GET_LESSONLIST: 'class/GET_LESSONLIST'}
const timetableType = {GET_TIMETABLE: 'class/GET_TIMETABLE'}
const basicInfoType = {GET_BASICINFO: 'class/GET_BASICINFO'}

export const getLessonList = action => ({type: lessonListType.GET_LESSONLIST, lessonList: action.lessonList})
export const getTimetable = action => ({type: timetableType.GET_TIMETABLE, timetable: action.timetable})
export const getBasicInfo = action => ({type: basicInfoType.GET_BASICINFO, basicInfo: action})
export const tClassesReducer = (state = {}, action) => {
    switch (action.type) {
        case lessonListType.GET_LESSONLIST:
            return {...state, lessonList: action.lessonList}
        case timetableType.GET_TIMETABLE:
            return {...state, timetable: action.timetable}
        case basicInfoType.GET_BASICINFO:
            return {...state, basicInfo: action}
        default:
            return state
    }
}

const ClassesMain = ({match}) => {
    const [userCode, setUserCode] = useState(localStorage.getItem("userCode"))
    const [basicInfo, setBasicInfo] = useState({})
    const [timetable, setTimetable] = useState([])
    const [lessons, setLessons] = useState([])
    const [lessonContent, setLessonContent] = useState({})
    const [subjectDetail, setSubjectDetail] = useState(false)
    const today = moment().format("MMMM Do YYYY")
    const dispatch = useDispatch()
    const [timerTime,setTimerTime] = useState("")
    const [timerDay,setTimerDay] = useState("00")
    const [timerHour, setTimerHour] = useState('00')
    const [timerMinute, setTimerMinute] = useState('00')
    const [timerSecond, setTimerSecond] = useState('00')

    useEffect(() => {
        getData(userCode)
    }, [])

    let interval = useRef();

    const handleTime = period =>{
        clear()
        getTimeFromServer(period)
    }

    const getTimeFromServer = (period) =>{
        clear()
        axios
            .get(`http://localhost:5000/tschedule/timer/${period.id}/${period.subjectCode}`)
            .then(res =>{
                setTimerTime(res.data.time)
                startTimer(res.data.time)

            })
    }
    const startTimer = (time) => {

        interval = setInterval(() => {
            const currentTime = new Date().getTime()
            const distance = time - currentTime;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            if (distance < 0) {
                clearInterval(interval.current)
            } else if(timerTime != time){
                clearInterval(interval.current)
            } else {
                setTimerDay(days)
                setTimerHour(hours)
                setTimerMinute(minutes)
                setTimerSecond(seconds)
            }
        }, 1000)
    }
    const clear= () =>{
        const currentTime = new Date().getTime()
        let timerId = setTimeout(() => { clearInterval(timerId); alert('정지'); }, 2000);
        clearTimeout(timerId)
        setTimerTime('')
         setTimerDay('00')
        setTimerHour('00')
        setTimerMinute('00')
        setTimerSecond('00')
    }


    const showContent = lessonId => {
        setSubjectDetail(!subjectDetail)
        lessons.forEach(content => {
            if (content.id == lessonId) {
                setLessonContent(content)
            }
        })
    }

    const getData = (userCode) => {
        axios
            .get(`http://localhost:5000/tsubject/detailList/${userCode}`)
            .then(({data}) => {
                setLessons(data.list)
                dispatch(getLessonList(data.list))
            })
            .catch(error => {
                throw (error)
            })

        axios
            .get(`http://localhost:5000/tschedule/dndTimetable/${userCode}`)
            .then(res => {
                const allSchedule = [];
                const first = [];
                const second = [];
                const third = [];
                const forth = [];
                const fifth = [];
                const sixth = [];
                Object.entries(res.data.list).forEach(([key, value]) => {
                    first.push(value[0]);
                    second.push(value[1]);
                    third.push(value[2]);
                    forth.push(value[3]);
                    fifth.push(value[4]);
                    sixth.push(value[5]);
                })
                allSchedule.push(first, second, third, forth, fifth, sixth)
                setTimetable(allSchedule);
            })
        axios
            .get(`http://localhost:5000/tsubject/basicInfo?cUserCode=${userCode}`)
            .then(({data}) => {
                setBasicInfo(data.map)
                dispatch(getBasicInfo(data.map))
            })
    }
    return (
        <>
            <PerfectScrollbar>
                <div className="classes_wrapper">
                    <div className="classes_container">
                        <div className="classes_date_container">
                            {today}
                        </div>
                        <table className="schedule_table">
                            <thead>
                            <tr>
                                <td></td>
                                <td className="table_head">MON</td>
                                <td className="table_head">TUE</td>
                                <td className="table_head">WED</td>
                                <td className="table_head">THU</td>
                                <td className="table_head">FRI</td>
                            </tr>
                            </thead>
                            <tbody>
                            {timetable.map((arr, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="table_head">{i + 1}</td>
                                        {arr.map((period,i) => <td className="empty_cube" key={i} onClick={() => handleTime(period)}>{period.subjectName}</td>)}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div>

                        </div>
                        <NavLink to={`${match.url}/timetable`}>
                            <button className="timetable_button ">Modify</button>
                        </NavLink>
                    </div>
                    <div className="classes_container">
                        <div className="classes_detail">
                            <p>instructor : {basicInfo.userName}</p>
                            <p>subject Name :{basicInfo.subjectName}</p>
                        </div>
                        <div>
                            {subjectDetail == false &&
                            <PerfectScrollbar>
                                <div className="timetable_board timetable_align">
                                    <Table hover className="timetable_subject_detail">
                                        <thead>
                                        <tr>
                                            <th>차시</th>
                                            <th>학습 목표</th>
                                            <th>첨부파일</th>
                                        </tr>
                                        </thead>
                                        <tbody id="curriculum_list">
                                        {lessons.map((details, i) => (
                                            <tr key={i + 1}>
                                                <td>{details.lessonNo}</td>
                                                <td onClick={() => showContent(details.id)}> {details.lessonTitle}</td>
                                                <td>N/A</td>

                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>

                                    <div>
                                        <NavLink to={`${match.url}/detail`}>
                                            <button className="timetable_button ">Modify</button>
                                        </NavLink>
                                    </div>

                                </div>
                            </PerfectScrollbar>
                            }
                            {subjectDetail == true &&
                            <PerfectScrollbar>
                                <div className="classes_curriculum">
                                    <div className="timetable_board">
                                        <div className="attendance_margin">
                                            <Table bordered hover className="timetable_subject_detail">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        {lessonContent.lessonTitle}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        file
                                                    </td>
                                                </tr>
                                                <tr className="content_height" style={{height: "270px"}}>
                                                    <td>
                                                        {lessonContent.lessonDetail}
                                                    </td>

                                                </tr>
                                                </tbody>
                                            </Table>
                                            <div>
                                                <button className="timetable_button attendance_margin "
                                                        onClick={e => setSubjectDetail(!subjectDetail)}> List
                                                </button>
                                                <NavLink to={`${match.url}/detail`}>
                                                    <button className="timetable_button attendance_margin">Modify
                                                    </button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PerfectScrollbar>
                            }
                        </div>
                        <div className="button_container attendance_margin">
                            <div>
                                <p>남은 수업 시간 {timerDay} 일 {timerHour} : {timerMinute} : {timerSecond}</p>
                            </div>
                            <NavLink to="/teacherstreaming">
                                <button className="streaming_button">CREATE</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </PerfectScrollbar>
        </>
    );
}


export default ClassesMain;