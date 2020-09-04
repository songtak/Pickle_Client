import React, {useState, useEffect, Fragment} from 'react';
import { NavLink } from 'react-router-dom';

import {Input,Table, FormGroup, Label} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import './attendance.css';
import './attendanceMain.css';

import axios from 'axios';

const Attendance = ({match}) => {
    const [year, setYear] = useState("2020")
    const [grade, setGrade] = useState(localStorage.getItem("curGrade"))
    const [ban, setBan] = useState(localStorage.getItem("homeClass"))
    const [table,setTable] = useState([])

    const detailTable = async(grade,ban,year) =>{
        axios
            .get(`http://localhost:5000/tattendance/detaillist?cCurGrade=${grade}&cHomeClass=${ban}&year=${year}`)
            .then(res => {
                setTable(res.data)
            })
            .catch(
                error =>{
                    throw(error)
                })
        }

    useEffect(()=>{
        detailTable(grade,ban,year)
    },[])

    const goAttendanceSearch = () =>{
        detailTable(grade,ban,year)
    }

    return (
        <Fragment>
            <div className="detail_wrapper">
                <div className="detail_header">
                    <div className="detail_toggle_container" >
                        <Label className="attendance_margin">기간</Label>
                        <FormGroup className="attendance_selector">
                            <Input type="select" name="select" id="value" onChange={e => setYear(e.target.value)}>
                                <option defaultValue>2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>

                            </Input>
                        </FormGroup>
                        <Label className="attendance_margin">학년</Label>
                        <FormGroup className="attendance_selector">
                            <Input type="select" name="select" id="value" onChange={e => setGrade(e.target.value)}>
                                <option value="" defaultValue={localStorage.getItem("curGrade")}>선택하세요</option>
                                <option value="1">1학년</option>
                                <option value="2">2학년</option>
                                <option value="3">3학년</option>
                            </Input>
                        </FormGroup>

                        <Label className="attendance_margin">반</Label>
                        <FormGroup className="attendance_selector">
                            <Input type="select" name="select" id="banSelect" onChange={e => setBan(e.target.value)} >
                                <option value="" defaultValue={localStorage.getItem("homeClass")}>선택하세요</option>
                                <option value="1">1반</option>
                                <option value="2">2반</option>
                                <option value="3">3반</option>
                                <option value="4">4반</option>
                                <option value="5">5반</option>
                                <option value="6">6반</option>
                                <option value="7">7반</option>
                                <option value="8">8반</option>
                                <option value="9">9반</option>
                                <option value="10">10반</option>
                                <option value="11">11반</option>
                                <option value="12">12반</option>
                                <option value="13">13반</option>
                                <option value="14">14반</option>
                                <option value="15">15반</option>
                            </Input>
                        </FormGroup>
                        <div >
                            <button className="attendance_button" onClick={goAttendanceSearch}>SEARCH</button>
                        </div>

                    </div>
                    <div className="detail_glyphicon_container">
                        <NavLink to={`${match.url}/attendance`}><div style={{marginLeft:"0.5rem", float:"right"}} className="glyph-icon simple-icon-chart attendance_glyphicon"></div></NavLink>
                    </div>
                </div>

                <div className="table_container">


                    <div style={{height:'90%'}}>
                        <PerfectScrollbar>

                            <Table striped hover size="sm" className='attendance_table'>
                                <thead>
                                <tr>
                                    <td>순번</td>
                                    <td>학번</td>
                                    <td>학생명</td>
                                    <td>1월</td>
                                    <td>2월</td>
                                    <td>3월</td>
                                    <td>4월</td>
                                    <td>5월</td>
                                    <td>6월</td>
                                    <td>7월</td>
                                    <td>8월</td>
                                    <td>9월</td>
                                    <td>10월</td>
                                    <td>11월</td>
                                    <td>12월</td>
                                    <td>Note</td>
                                </tr>
                                </thead>
                                <tbody>
                                {table.map((el, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{el.userCode}</td>
                                        <td>{el.name}</td>
                                        <td>{el.months[0]}</td>
                                        <td>{el.months[1]}</td>
                                        <td>{el.months[2]}</td>
                                        <td>{el.months[3]}</td>
                                        <td>{el.months[4]}</td>
                                        <td>{el.months[5]}</td>
                                        <td>{el.months[6]}</td>
                                        <td>{el.months[7]}</td>
                                        <td>{el.months[8]}</td>
                                        <td>{el.months[9]}</td>
                                        <td>{el.months[10]}</td>
                                        <td>{el.months[11]}</td>
                                        <td></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Attendance;