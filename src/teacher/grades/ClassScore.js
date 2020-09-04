import React, {useState} from "react";
import {Row, Card, CardBody, CardTitle} from 'reactstrap';
import {Colxx} from "../../commons/Components/CustomComponent"
import {chartTooltipColor} from "./chartTooltip"
import axios from "axios";
import './grades.css'

const ScatterChart = React.lazy(() => import('./Chart.Scatter'))
const BarChart = React.lazy(() => import('./Chart.Bar'))
const Sorted = React.lazy(() => import('./Sorted'))

const ClassScore = () => {
    const totalGrade = [1, 2, 3]
    const [totalHomeClass, setTotalHomeClass] = useState([''])
    const [grade, setGrade] = useState(0)
    const [homeClass, setHomeClass] = useState(0)
    const schoolCode = localStorage.getItem("schoolCode")
    const [barChartClass, setBarChartClass] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [barChartTotal, setBarChartTotal] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [scatterChartClass, setScatterChartClass] = useState([])
    const [scatterChartTotal, setScatterChartTotal] = useState([])
    const [totalRank, setTotalRank] = useState([])
    const [subRank, setSubRank] = useState([])
    const [sortedSub, setSortedSub] = useState([])
    const subNames = ['국어', '영어', '수학', '생활과윤리', '경제', '한국사', '생명과학', '물리', '제2외국어']
    const barChartData = {
        labels: ['국어', '영어', '수학', '생활과 윤리', '경제', '한국사', '생명과학', '물리', '제2외국어'],
        datasets: [
            {
                label: '우리 반',
                borderColor: "red",
                backgroundColor: chartTooltipColor.themeColor1_10,
                //우리 반 과목별 평균 점수
                data: barChartClass,
                borderWidth: 2,
            },
            {
                label: '전체 평균',
                borderColor: chartTooltipColor.themeColor2,
                backgroundColor: chartTooltipColor.themeColor2_10,
                //전체 과목별 성적(우리 반 포함). 평균 점수
                data: barChartTotal,
                borderWidth: 2,
            },
        ]
    }
    const scatterChartData = {
        datasets: [
            {
                borderWidth: 2,
                showLine: false,
                label: '우리 반',
                borderColor: "red",
                backgroundColor: chartTooltipColor.themeColor1_10,
                //우리 반 각 학생 등수. x는 학년에서 순위, y는 각자 반에서 순위
                data: scatterChartClass
            },
            {
                borderWidth: 2,
                showLine: false,
                label: '전체',
                borderColor: chartTooltipColor.themeColor2,
                backgroundColor: chartTooltipColor.themeColor2_10,
                //전체 각 학생 등수(우리 반 포함). x는 학년에서 순위, y는 각자 반에서 순위
                data: scatterChartTotal
            },
        ],
    };
    const onClickGrade = value => {
        setTotalHomeClass([])
        axios.get(`http://localhost:5000/teacher/grade/input/homeClass/${schoolCode}/${value}`)
            .then(({data}) => {
                setTotalHomeClass(data)
                setGrade(value)
                setHomeClass(0)
            })
    }
    const onClickFind = () => {
        axios.get(`http://localhost:5000/teacher/grade/class/${schoolCode}/${grade}/${homeClass}`)
            .then(({data}) => {
                let barClass = []
                let barChartClass = data.barChartClass
                let barChartTotal = data.barChartTotal
                for (let i=0; i<barChartClass.length; i++) {
                    barClass.push(barChartClass[i].score)
                }
                setBarChartClass(barClass)
                let barTotal = []
                for (let i=0; i<barChartTotal.length; i++) {
                    barTotal.push(barChartTotal[i].score)
                }
                let scatterChartClass = data.scatterChartClass
                let scatterChartTotal = data.scatterChartTotal
                setBarChartTotal(barTotal)
                let scatterClass = []
                for (let i=0; i<scatterChartClass.length; i++) {
                    scatterClass.push({x: scatterChartClass[i].current, y: scatterChartClass[i].original})
                }
                setScatterChartClass(scatterClass)
                let scatterTotal = []
                for (let i=0; i<scatterChartTotal.length; i++) {
                    scatterTotal.push({x: scatterChartTotal[i].current, y: scatterChartTotal[i].original})
                }
                setScatterChartTotal(scatterTotal)
                let sortedTotal = data.totalRank
                let st = []
                for(let i=0; i<sortedTotal.length; i++){
                    st.push({rank:sortedTotal[i].rank , name:sortedTotal[i].name, score:sortedTotal[i].score})
                }
                setTotalRank(st)
                setSortedSub(data.subRank)
                let temp = data.subRank
                let ss = []
                for(let i=0; i<subNames.length; i++){
                    if(temp[i].sub[0] === subNames[i]) {
                        for(let j=0; j<5; j++){
                            ss.push({rank: temp[i].rank[j].rank, name: temp[i].rank[j].name, score: temp[i].rank[j].score})
                        }
                        setSubRank(ss)
                    }
                }
            })
    }
    const onClickSelect = value => {
        setSubRank([])
        let ss = []
        for(let i=0; i<subNames.length; i++){
            if(value === sortedSub[i].sub[0]) {
                for(let j=0; j<5; j++){
                    ss.push({rank: sortedSub[i].rank[j].rank, name: sortedSub[i].rank[j].name, score: sortedSub[i].rank[j].score})
                }
                setSubRank(ss)
            }
        }
    }
    return <>
        <Row className="rounded">
            <Colxx xxs="12" lg="12" className="mb-5">
                <Card>
                    <CardBody>
                        <Row>
                            <CardTitle className="t-grade-class-title">선택</CardTitle>
                            <div className="t-grade-class-left">
                                <select className="form-control" onClick={e => onClickGrade(e.target.value)}>
                                    {totalGrade.map((i, index) => (
                                        <option value={i} key={index}>{i}학년</option>
                                    ))}
                                </select>
                            </div>
                            <div className="t-grade-class-right">
                                <select className="form-control" onClick={e => setHomeClass(e.target.value)}>
                                    {totalHomeClass.map((i, index) => (
                                        <option value={i} key={index}>{i}반</option>
                                    ))}
                                </select>
                            </div>
                            <div className="t-grade-class-btn">
                                <button className="btn btn-outline-primary" onClick={onClickFind}>확인</button>
                                <span className="t-grade-class-data">60,750 건</span>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
        <Row className="rounded">
            <Colxx xxs="12" lg="12" className="mb-5">
                <Card>
                    <CardBody>
                        <CardTitle>
                            과목별 평균
                        </CardTitle>
                        <div className="chart-container">
                            <BarChart shadow={false} data={barChartData}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
        <Row className="rounded">
            <Colxx xxs="12" lg="6" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>
                            직전시험 대비 현재 성적
                        </CardTitle>
                        <div className="chart-container">
                            <ScatterChart shadow={false} data={scatterChartData}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="3" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>
                            평균 순위
                        </CardTitle>
                        <div className="chart-container">
                            <Sorted rank={totalRank}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="3" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>
                            과목별 순위
                            <span>
                                <select style={{width: 100, float: "right"}} onClick={e => onClickSelect(e.target.value)}>
                                    {subNames.map((i) => <option value={i} key={i}>{i}</option>)}
                                </select>
                            </span>
                        </CardTitle>
                        <div className="chart-container">
                            <Sorted rank={subRank}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
    </>
}
export default ClassScore