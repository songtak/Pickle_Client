import React, {useState} from "react";
import {ThemeColors} from "./chartTooltip"
import {Colxx} from "../../commons/Components/CustomComponent";
import {Row, Card, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import axios from "axios";
import './grades.css'

const BarChart = React.lazy(() => import('./Chart.Bar'))
const LineChart = React.lazy(() => import('./Chart.Line'))
const RadarChart = React.lazy(() => import('./Chart.Radar'))
const chartTooltipColor = ThemeColors()

const StudentScore = () => {
    const totalGrade = [1, 2, 3]
    const [totalHomeClass, setTotalHomeClass] = useState([''])
    const [totalStudent, setTotalStudent] = useState([''])
    const [grade, setGrade] = useState(0)
    const [homeClass, setHomeClass] = useState(0)
    const [student, setStudent] = useState('')
    const [isWarning, setIsWarning] = useState(false)
    const subNames = ['국어', '영어', '수학', '생활과윤리', '경제', '한국사', '생명과학', '물리', '제2외국어']
    const year = new Date().getFullYear()
    const schoolCode = localStorage.getItem("schoolCode")
    const semesters = ['1학기 중간고사', '1학기 기말고사', '2학기 중간고사', '2학기 기말고사']
    const [barChart, setBarChart] = useState([])
    const [totalBar, setTotalBar] = useState([])
    const [totalLine, setTotalLine] = useState([])
    const [lineChart, setLineChart] = useState([])
    const [totalRadar, setTotalRadar] = useState([])
    const [radarOne, setRadarOne] = useState([])
    const [radarAll, setRadarAll] = useState([])
    const barChartData = {
        labels: ['국어', '영어', '수학', '한국사', '생활과 윤리', '경제', '물리', '생명과학', '제2외국어'],
        datasets: [
            {
                label: student,
                borderColor: chartTooltipColor.themeColor1,
                backgroundColor: chartTooltipColor.themeColor1_10,
                data: barChart,
                borderWidth: 2,
            },
        ]
    }
    const lineChartData = {
        labels: ['1-1 중간', '1-1 기말', '1-2 중간', '1-2 기말', '2-1 중간', '2-1 기말', '2-2 중간', '2-2 기말', '3-1 중간', '3-1 기말', '3-2 중간', '3-2 기말'],
        datasets: [
            {
                label: '',
                data: lineChart,
                borderColor: chartTooltipColor.themeColor1,
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
    const radarChartData = {
        labels: ['국어', '영어', '수학'],
        datasets: [
            {
                label: student,
                borderWidth: 2,
                pointBackgroundColor: chartTooltipColor.themeColor1,
                borderColor: chartTooltipColor.themeColor1,
                backgroundColor: chartTooltipColor.themeColor1_10,
                data: radarOne,
            },
            {
                label: '평균',
                borderWidth: 2,
                pointBackgroundColor: chartTooltipColor.themeColor2,
                borderColor: chartTooltipColor.themeColor2,
                backgroundColor: chartTooltipColor.themeColor2_10,
                data: radarAll,
            },
        ],
    };
    const onClickGrade = value => {
        setTotalHomeClass([])
        setIsWarning(false)
        axios.get(`http://localhost:5000/teacher/grade/input/homeClass/${schoolCode}/${value}`)
            .then(({data}) => {
                setTotalHomeClass(data)
                setTotalStudent([])
                setGrade(value)
                setHomeClass(0)
                setStudent('')
            })
    }
    const onClickHomeClass = value => {
        setIsWarning(false)
        axios.get(`http://localhost:5000/teacher/grade/input/student/${schoolCode}/${grade}/${value}`)
            .then(({data}) => {
                setTotalStudent(data)
                setHomeClass(value)
                setStudent('')
            })
    }
    const onClickStudent = value => {
        setIsWarning(false)
        setStudent(value)
    }
    const onClickGetScore = () => {
        if (grade === 0 || homeClass === 0 || student === '') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
            axios.get(`http://localhost:5000/teacher/grade/one/${schoolCode.concat(grade, homeClass, student)}`)
                .then(({data}) => {
                    setTotalBar(data.barChart)
                    setTotalLine(data.lineChart)
                    setBarChart(data.barChart[0].score)
                    setLineChart(data.lineChart[0].score)
                    setRadarOne(data.radarChart[0].score)
                    setRadarAll(data.radarChart[1].score)
                })
        }
    }
    const onClickSelectSemester = value => {
        switch (value){
            case '0': setBarChart(totalBar[0].score); break;
            case '1': setBarChart(totalBar[1].score); break;
            case '2': setBarChart(totalBar[2].score); break;
            default: setBarChart(totalBar[3].score); break;
        }
    }
    const onClickSelectSubname = value => {
        switch (value){
            case '국어': setLineChart(totalLine[0].score); break;
            case '영어': setLineChart(totalLine[1].score); break;
            case '수학': setLineChart(totalLine[2].score); break;
            case '한국사': setLineChart(totalLine[3].score); break;
            case '생활과윤리': setLineChart(totalLine[4].score); break;
            case '경제': setLineChart(totalLine[5].score); break;
            case '물리': setLineChart(totalLine[6].score); break;
            case '생명과학': setLineChart(totalLine[7].score); break;
            default: setLineChart(totalLine[8].score); break;
        }
    }
    return <>
        <Row className="rounded">
            <Colxx xxs="12" lg="2" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>
                            학생 선택
                        </CardTitle>
                        <div className="chart-container">
                            <select className="form-control" onClick={e => onClickGrade(e.target.value)}>
                                {totalGrade.map((i, index) => (
                                    <option value={i} key={index}>{i}학년</option>
                                ))}
                            </select><div style={{paddingTop: 3}}/>
                            <div className="t-grade-padding-top"/>
                            <select className="form-control" onClick={e => onClickHomeClass(e.target.value)}>
                                {totalHomeClass.map((i, index) => (
                                    <option value={i} key={index}>{i}반</option>
                                ))}
                            </select><div style={{paddingTop: 3}}/>
                            <div className="t-grade-padding-top"/>
                            <select className="form-control" onClick={e => onClickStudent(e.target.value)}>
                                {totalStudent.map((i, index) => (
                                    <option value={i} key={index}>{i}</option>
                                ))}
                            </select><div style={{paddingTop: 3}}/><br/>
                            <div className="t-grade-div-btn">
                                <Button color="primary" type="submit" onClick={onClickGetScore}>
                                    확인
                                </Button>
                            </div>
                            {isWarning && <><br/>
                                <span>모두 정확하게<br/>선택해 주십시오</span>
                            </>}
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="10" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>
                            최근 성적
                            <span>
                                <select style={{width: 100, float: "right"}} onClick={e => onClickSelectSemester(e.target.value)}>
                                    {semesters.map((i, index) => <option value={index} key={index}>{i}</option>)}
                                </select>
                            </span>
                        </CardTitle>
                        <div className="chart-container">
                            <BarChart shadow={false} data={barChartData}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
        <Row className="rounded">
            <Colxx xxs="12" lg="8" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>
                            과목별 성적 추이
                            <span>
                                <select style={{width: 100, float: "right"}} onClick={e => onClickSelectSubname(e.target.value)}>
                                    {subNames.map((i) => <option value={i} key={i}>{i}</option>)}
                                </select>
                            </span>
                        </CardTitle>
                        <div className="chart-container">
                            <LineChart shadow={false} data={lineChartData}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="4" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>
                            과목별 평균 대비 최근 성적
                        </CardTitle>
                        <div className="chart-container">
                            <RadarChart shadow={false} data={radarChartData}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>

    </>

}
export default StudentScore