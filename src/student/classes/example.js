import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './modal.css'
import './class.css'
import {Card, CardBody, Row, Col, Table} from 'reactstrap';
import DatePicker from "react-modern-calendar-datepicker";
import Clock from 'react-live-clock';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {useDispatch} from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import {NavLink} from "react-router-dom";
import Countdown from "react-countdown"

//import LinearGradient from 'react-native-linear-gradient'

//import '../node_modules/react-native-linear-gradient'
//import { Table } from "react-fluid-table";
//import {Table, Navbar,Form,FormControl,Button,DropdownButton,Dropdown} from "react-bootstrap";
//import {range } from "rxjs";
//import {faker} from 'react-faker';
//import BaseTable, { Column } from 'react-base-table'
//import 'react-base-table/styles.css'
//import { Table, Column } from 'react-notable'

const lessonListType = {GET_LESSONLIST: 'class/GET_LESSONLIST'}
const timetableType = {GET_TIMETABLE: 'class/GET_TIMETABLE'}

export const getLessonList = action => ({type: lessonListType.GET_LESSONLIST, lessonList: action.lessonList})
export const getTimetable = action => ({type: timetableType, timetable: action.timetable})
export const sClassesReducer = (state = {}, action) => {
    switch (action.type) {
        case lessonListType.GET_LESSONLIST :
            return {...state, lessonList: action.lessonList}
        case timetableType.GET_TIMETABLE :
            return {...state, timetable: action.timetable}
        default :
            return state
    }
}


const Class = ({match}) => {
    function create() {
        window.open("/studentstreaming")
    }
    const [userCode, setUserCode] = useState(localStorage.getItem("userCode"))
    const [basicInfo, setBasicInfo] = useState({})
    const [timetable, setTimetable] = useState([])
    const [selectedDay, setSelectedDay] = useState(null);
    const [counter, setCounter] = React.useState(600);
    const [showDetail, setShowDetail] = useState(false);
    const [lessons, setLessons] = useState([])
    const [lessonContent, setLessonContent] = useState({})
    const [scheduleModal, setScheduleModal] = useState("close")
    const dispatch = useDispatch()

    const goal = payload => {
        setShowDetail({title: payload.title, content: payload.content, file: payload.file})
    }

    const showContent = lessonId =>{
        setShowDetail(!showDetail)
        lessons.forEach(content =>{
            if(content.id == lessonId){
                setLessonContent(content)
            }
        })

    }


    const getDetail= (e,subjectCode) =>{
        axios
            .get(`http://localhost:5000/ssubject/detailList/${subjectCode}`)
            .then(({data}) => {
                console.log(data.subjectDetail)
                setLessons(data.subjectDetail)
                /*     setLessons(data.list)
                     dispatch(getLessonList(data.list))*/
            })
            .catch(error => {
                throw(error)
            })
    }
    /*
            axios
                .get(`http://localhost:5000/schedule/detailList/${userCode}`)
                .then(({data}) => {
                    setLessons(data.list)
                    dispatch(getLessonList(data.list))
                })
                .catch(error => {
                    throw(error)
                })
        }*/

    useEffect( ()=> {
        axios
            .get(`http://localhost:5000/schedule/student/${userCode}`)
            .then(res => {
                console.log(res.data.student)
                const schedules = res.data.student
                const newSchedule = []
                for (let i=0; i<res.data.student.length; i++){
                    schedules[i].forEach(schedule => {
                        switch (schedule.substring(0,3)) {
                            case "kor" : newSchedule.push({ code : schedule, value :"국어"}); break;
                            case "eng" : newSchedule.push({ code : schedule, value :"영어"}); break;
                            case "mat" : newSchedule.push({ code : schedule, value :"수학"}); break;
                            case "his" : newSchedule.push({ code : schedule, value :"한국사"}); break;
                            case "phl" : newSchedule.push({ code : schedule, value :"생활과 윤리"}); break;
                            case "eco" : newSchedule.push({ code : schedule, value :"경제"}); break;
                            case "phy" : newSchedule.push({ code : schedule, value :"물리학"}); break;
                            case "bio" : newSchedule.push({ code : schedule, value :"생명과학"}); break;
                            case "for" : newSchedule.push({ code : schedule, value :"제 2 외국어"}); break;
                            default: newSchedule.push({code : schedule, value : ""});break;
                        }
                    })

                }
                console.log(newSchedule)
                const scheduleList = []
                for (let i=0; i<6; i++){
                    scheduleList[i] = newSchedule.slice(0+(5*i),5+(5*i))
                }

                console.log(scheduleList)

                setTimetable(scheduleList)

            })
            .catch(error => {
                throw(error)
            })
    },[])

    const onShowModal = e =>{
        setScheduleModal("open")
    }







    return (
        <>
            <div>
                <Card>
                    <CardBody>
                        <h2 className="s_c_header">{localStorage.getItem("name")} 시간표</h2>
                    </CardBody>
                </Card>
            </div>












            { showDetail === false &&
            <div className="s_c_main">
                <Row>
                    <Col className="s_class_col_left">
                        <Card>
                            <CardBody>
                                <div className="s_class_calendar">
                                    <Row>
                                        <Col className="s_class_clock">
                                            <Clock format={'YYYY년 MM월 DD일'}/>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="s_class_timetable_frame_l">
                                    <div className="s_class_timebody">
                                        <thead>
                                        <tr className="s_class_tr">
                                            <th className="s_class_time1"></th>
                                            <th className="s_class_time">월</th>
                                            <th className="s_class_time">화</th>
                                            <th className="s_class_time">수</th>
                                            <th className="s_class_time">목</th>
                                            <th className="s_class_time">금</th>
                                        </tr>
                                        {timetable.map((period, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="s_table_head">{i+1}</td>
                                                    <td onClick={e=>{getDetail(e,period[0].code)}} className="s_empty_cube">{period[0].value}</td>
                                                    <td onClick={e=>{getDetail(e,period[1].code)}} className="s_empty_cube">{period[1].value}</td>
                                                    <td onClick={e=>{getDetail(e,period[2].code)}} className="s_empty_cube">{period[2].value}</td>
                                                    <td onClick={e=>{getDetail(e,period[3].code)}} className="s_empty_cube">{period[3].value}</td>
                                                    <td onClick={e=>{getDetail(e,period[4].code)}} className="s_empty_cube">{period[4].value}</td>
                                                </tr>
                                            )
                                        })}
                                        </thead>
                                    </div>

                                </div>
                            </CardBody>
                        </Card>
                    </Col>




                    <Col className="s_class_col_right">
                        <Card>
                            <CardBody>
                                <div className="s_class_calendar">
                                    <Row>

                                    </Row>
                                </div>
                                <div className="s_class_timetable_frame_r">
                                    <Row>
                                        <PerfectScrollbar className="timetable_board">
                                            <div>
                                                <Table hover className="s_timetable_subject_detail">
                                                    <thead>
                                                    <tr className="s_class_detail_title">
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
                                                            <td></td>

                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>

                                            </div>
                                        </PerfectScrollbar>
                                    </Row>
                                </div>
                                <Row>
                                    <div className="s_class_countdown">
                                        <h2>수업 시작까지
                                            <Countdown date={Date.now() + 600000} />
                                        </h2>
                                    </div>

                                </Row>
                                <Row>
                                    <button className="s_class_btn">
                                        <NavLink to="/studentstreaming" className="s_class_btn_txt">수 업 듣 기</NavLink>
                                    </button>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </div>}

            {showDetail === true &&
            <div className="s_c_main">
                <Row>
                    <Col className="s_class_col_left">
                        <Card>
                            <CardBody>
                                <div className="s_class_calendar">
                                    <Row>
                                        <Col className="s_class_clock">
                                            <Clock format={'YYYY년 MM월 DD일'}/>
                                        </Col>
                                        <Col className="s_class_datepicker">
                                            <DatePicker
                                                value={selectedDay}
                                                onChange={setSelectedDay}
                                                inputPlaceholder="Select a day"
                                                shouldHighlightWeekends
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="s_class_timetable_frame_l">
                                    <thead className="s_class_timebody">
                                    <tr className="s_class_tr">
                                        <th className="s_class_time1"></th>
                                        <th className="s_class_time">월</th>
                                        <th className="s_class_time">화</th>
                                        <th className="s_class_time">수</th>
                                        <th className="s_class_time">목</th>
                                        <th className="s_class_time">금</th>
                                    </tr>
                                    {timetable.map((period, i) => {
                                        return (
                                            <tr key={i} className="s_class_timetable">
                                                <td className="s_table_head">{i+1}</td>
                                                <td onClick={e=>{getDetail(e,period[0].code)}} className="s_empty_cube">{period[0].value}</td>
                                                <td onClick={e=>{getDetail(e,period[1].code)}} className="s_empty_cube">{period[1].value}</td>
                                                <td onClick={e=>{getDetail(e,period[2].code)}} className="s_empty_cube">{period[2].value}</td>
                                                <td onClick={e=>{getDetail(e,period[3].code)}} className="s_empty_cube">{period[3].value}</td>
                                                <td onClick={e=>{getDetail(e,period[4].code)}} className="s_empty_cube">{period[4].value}</td>
                                            </tr>
                                        )
                                    })}
                                    </thead>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="s_atte_col_right">
                        <Card>
                            <CardBody>
                                <PerfectScrollbar>
                                    <div  className="s_class_detail_frame">
                                        <button onClick={onShowModal}>목록</button>
                                    </div>
                                </PerfectScrollbar>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            }


        </>
    );
}


export default Class;