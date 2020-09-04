import React, {useEffect, useState} from 'react';
import './attendance.css';
import {Card, CardBody, Row, Col, Table} from 'reactstrap';
import Clock from "react-live-clock";
import SACalendar from "./SCalendar";
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';

const Attendance = () => {
    const [selectDate, setSelectDate] = useState("")
    const [dateChange, setDateChange] = useState("")
    const [studentAttendance, setStudentAttendance] = useState([])
    const [studentAttendanceSum, setStudentAttendanceSum] = useState([])
    const [present, setPresent] = useState(0)
    const [absent, setAbsent] = useState(0)
    const [tardy, setTardy] = useState(0)
    const [sAtteC, setSAtteC] =useState([])


    const onDayClick = e =>{
        e.preventDefault()
        setSelectDate(e.target.value)
    }

    const onDateChange = e =>{
        e.preventDefault()
        setDateChange(e.target.value)
    }
    const date = new Date();


    useEffect(()=> {
        axios
            .get(`http://localhost:5000/sattendance/${localStorage.getItem("userCode")}`)
            .then(({data})=>{
                setStudentAttendance(data.sAtte);
                setStudentAttendanceSum(data.sAtteSum);
                console.log(data.sAtteSum[0][1])
                setPresent(data.sAtteSum[0][0])
                setAbsent(data.sAtteSum[0][1])
                setTardy(data.sAtteSum[0][2])

            })
            .catch(err=>{console.log(err);throw err;})
    },[])

    useEffect(() => {
        setSAtteC({
            labels:['출석','지각', '결석'],
            datasets:[
                {
                    label: '출결 현황',
                    backgroundColor: ['rgba(70,184,34,0.85)','rgb(236,226,50)','rgba(236,102,102,0.91)'],
                    data: [present, absent, tardy],
                    borderWidth: 3.5,
                    cutoutPercentage: 200,
                    height: 300
                }
            ],
            options: {
                maintainAspectRatio: false,
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        })
    }, [present, absent, tardy]);


    return (
        <>
            <div>
                <Card>
                    <CardBody>
                        <text className="s_a_header">{localStorage.getItem("name")} 출석 현황</text>
                    </CardBody>
                </Card>
            </div>

            <div className="s_atte_topatte">
                <Card>
                    <CardBody>
                        <Row className="s_a_semester">
                            <text>2020학년도 출석 집계</text>
                        </Row>
                        <Row>
                            <col className="s_a_header_con"/>
                            <Col><div className="s_atte_circle_1"> 출 석 </div></Col>
                            <Col className="s_attendance_1">{present} 회</Col>
                            <Col><div className="s_atte_circle_2"> 지 각 </div></Col>
                            <Col className="s_attendance_2">{absent} 회</Col>
                            <Col><div className="s_atte_circle_3"> 결 석 </div></Col>
                            <Col className="s_attendance_3">{tardy} 회</Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>

            <div className="s_a_main">
                <Row>
                    <Col className="s_atte_col_left">
                        <Card>
                            <CardBody>
                                <SACalendar/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="s_atte_col_counter">
                        <Card>
                            <CardBody>
                                <div className="s_atte_date">
                                    <Clock format={'YYYY년 MM월  DD일'}/>
                                </div>
                                <div className="s_a_day">
                                        <Table hover className="timetable_subject_detail" >
                                            <thead>
                                            <tr className="s_a_center">
                                                <th className="s_a_1">교시</th>
                                                <th>출석 현황</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody className="curriculum_list">
                                            <tr>
                                                <td className="s_a_1">1</td>
                                                <td>출석</td>
                                                <th>🟢</th>
                                            </tr>
                                            <tr>
                                                <td className="s_a_1">2</td>
                                                <td >출석</td>
                                                <th>🟢</th>
                                            </tr>
                                            <tr>
                                                <td className="s_a_1">3</td>
                                                <td >출석</td>
                                                <th>🟢</th>
                                            </tr>
                                            <tr>
                                                <td className="s_a_1">4</td>
                                                <td >출석</td>
                                                <th>🟢</th>
                                            </tr>
                                            <tr>
                                                <td className="s_a_1">5</td>
                                                <td>출석</td>
                                                <th>🟢</th>
                                            </tr>
                                            <tr>
                                                <td className="s_a_1">6</td>
                                                <td>출석</td>
                                                <th>🟢</th>
                                            </tr>
                                            </tbody>
                                        </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="s_atte_col_right">
                            <CardBody>
                                    <div className="s_a_doughnut">
                                        <Doughnut
                                            data={sAtteC}/>
                                    </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default Attendance;