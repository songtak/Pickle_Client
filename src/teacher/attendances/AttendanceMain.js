import React,{useState, useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import {Input, FormGroup, Label} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Select from 'react-select'
import {Calendar, utils} from 'react-modern-calendar-datepicker';
import {chartTooltipColor} from './chart/chartTooltip'
import DailyChart from './chart/DailyChart'
import WeeklyChart from './chart/WeeklyChart'
import {ACalendar} from './calendar/Calendar'
import axios from 'axios';
const selectDetailType = {SELECT_DETAIL : "tattendance/SELECT_DETAIL"}
const selectDetailRequest = action => ({type:selectDetailType.SELECT_DETAIL, payload: action.payload })
export const tAttendanceReducer = (state={}, action) =>{
    switch(action.type){
        case 'SELECT_DETAIL' : return {state, payload:action.payload}
        default: return state
    }
}
const AttendanceMain = ({match}) => {
    const [grade, setGrade] = useState(localStorage.getItem('curGrade'))
    const [ban, setBan] = useState(localStorage.getItem('homeClass'))
    const [selectedGrade, setSelectedGrade] = useState("")
    const [selectedBan, setSelectedBan] = useState("")
    const [dailyChart, setDailyChart] = useState([])
    const [weeklyChart,setWeeklyChart] = useState([])
    const [selectedDay, setSelectedDay] = useState(utils().getToday());
    const minimumDate = {year: 2018, month: 2, day: 20};
    const maximumDate = {year: 2021, month: 1, day: 30}
    const javaDate = `${(selectedDay.year).toString()}-${(selectedDay.month).toString()}-${(selectedDay.day).toString()}`;
    const changeBan = (e) =>{
        setSelectedBan(e.target.value)
    }
    const changeGrade = (e) =>{
        setSelectedGrade(e.target.value)
    }
    const handleAll = () =>{
        setGrade(selectedGrade)
        setBan(selectedBan)
        chartDatas(grade,ban)
    }
    const chartDatas = (grade,ban) => {
        axios
            .get(`http://localhost:5000/tattendance/weeklychart/${grade}/${ban}?javaDate=${javaDate}`)
            .then(res =>{
                setWeeklyChart(res.data)
            })
        axios
            .get(`http://localhost:5000/tattendance/singleday/${grade}/${ban}?javaDate=${javaDate}`)
            .then(res =>{
                setDailyChart(res.data)
            })
    }
    useEffect(()=>{
        chartDatas(grade,ban)
    },[])
    const dailyChartData = {
        labels: ['출석', '결석', '지각'],
        datasets: [
            {
                label: '출결 현황',
                borderColor: ['#184f90','#00365a','#8a9fb4'],
                backgroundColor: ['rgba(24,79,144,0.1)','rgba(0,54,90,0.1)','rgba(138,159,180,0.1)'],
                data: dailyChart,
                hoverBackgroundColor:['#184f90','#00365a','#8a9fb4'],
                hoverBorderColor:['rgba(24,79,144,0.1)','rgba(0,54,90,0.1)','rgba(138,159,180,0.1)'],
                borderWidth: '2.5',
            },
        ]
    }
    const weeklyChartData = {
        labels: ['월', '화', '수', '목', '금'],
        datasets: [
            {
                label: '출석',
                data: weeklyChart[0],
                borderColor: '#184f90',
                pointBackgroundColor: chartTooltipColor.foregroundColor,
                pointBorderColor: chartTooltipColor.themeColor1,
                pointHoverBackgroundColor: chartTooltipColor.themeColor1,
                pointHoverBorderColor: chartTooltipColor.foregroundColor,
                pointRadius: 6,
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                fill: false,
            },
            {
                label: '결석',
                data: weeklyChart[1],
                borderColor: '#00365a',
                pointBackgroundColor: chartTooltipColor.foregroundColor,
                pointBorderColor: chartTooltipColor.themeColor1,
                pointHoverBackgroundColor: chartTooltipColor.themeColor1,
                pointHoverBorderColor: chartTooltipColor.foregroundColor,
                pointRadius: 6,
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                fill: false,
            },
            {
                label: '지각',
                data: weeklyChart[2],
                borderColor: '#8a9fb4',
                pointBackgroundColor: chartTooltipColor.foregroundColor,
                pointBorderColor: chartTooltipColor.themeColor1,
                pointHoverBackgroundColor: chartTooltipColor.themeColor1,
                pointHoverBorderColor: chartTooltipColor.foregroundColor,
                pointRadius: 6,
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                fill: false,
            },
        ],
    };

    return (
        <>
            <PerfectScrollbar>
                <div className="attendance_wrapper">
                    <div className="attendance_header">
                        <div className="toggle_container">
                            <Label className="">학년</Label>
                            <FormGroup className="attendance_selector">
                            <Input type="select"
                                    value={selectedGrade}
                                    onChange={changeGrade}
                                    name="selectGrade" id="GradeSelect">
                                <option value="">선택하세요</option>
                                <option value="1">1학년</option>
                                <option value="2">2학년</option>
                                <option value="3">3학년</option>
                            </Input>
                            </FormGroup>
                            <Label className="">반</Label>
                            <FormGroup className="attendance_selector" >
                            <Input type="select"
                                    value={selectedBan}
                                    onChange={changeBan}
                                    name="selectBan" id="banSelect">
                                <option value="">선택하세요</option>
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
                        </div>
                        <div className="attendance_glyphicon_container">
                            <NavLink to={`${match.url}/detail`}><div style={{marginLeft:"0.5rem", float:"right"}} className="glyph-icon simple-icon-list attendance_glyphicon"></div></NavLink>
                        </div>
                    </div>
                    <div className="attendance_container">
                        <div>
                            <Calendar
                                value={selectedDay}
                                onChange={setSelectedDay}
                                minimumDate={minimumDate}
                                maximumDate={maximumDate}
                                colorPrimary="#00365a"
                                calendarClassName="custom-calendar"
                                shouldHighlightWeekends
                            />
                        </div>
                        <div><button className="attendance_button" style={{width:"30%"}} onClick={() => handleAll()}>SEARCH</button></div>
                    </div>
                    <div className="attendance_container">
                        <div style={{width : "45%", float:"left"}}><h4>DAILY</h4></div>
                        <div style={{width : "45%", float:"left"}}>{grade} 학년 {ban} 반</div>
                        <div className="attendance_chart daily">
                            <DailyChart  shadow={false} data={dailyChartData}/>
                        </div>
                    </div>
                    <div className="toggle_container" style={{height:"4%"}}>
                        <h4>Weekly</h4>
                    </div>
                    <div className="attendance_chart weekly">
                        <div className="weekly_chart attendance_margin">
                            <WeeklyChart shadow={false} data={weeklyChartData}/>
                        </div>
                    </div>
                </div>
            </PerfectScrollbar>
        </>
    );
};
export default AttendanceMain;