import React, {useState} from "react";
import {Colxx} from "../../commons/Components/CustomComponent";
import {Button, Card, CardBody, CardTitle, FormGroup, Label, Row} from "reactstrap";
import axios from "axios";
import './grades.css'
import {chartTooltipColor} from "./chartTooltip";
import univList from '../../assets/data/univ.json'

const BarHorizontal = React.lazy(() => import('./Chart.Horiznal.Bar'))
const Mock = () => {
    const totalGrade = [1, 2, 3]
    const [totalHomeClass, setTotalHomeClass] = useState([''])
    const [totalStudent, setTotalStudent] = useState([''])
    const [semesterCodeList, setSemesterCodeList] = useState([''])
    const [grade, setGrade] = useState(0)
    const [homeClass, setHomeClass] = useState(0)
    const [student, setStudent] = useState('')
    const [semesterCode, setSemesterCode] = useState(0)
    const [isWarning, setIsWarning] = useState(false)
    const [isCheck, setIsCheck] = useState(true)
    const schoolCode = localStorage.getItem("schoolCode")
    const [kor, setKor] = useState(0)
    const [eng, setEng] = useState(0)
    const [mat, setMat] = useState(0)
    const [tam1, setTam1] = useState(0)
    const [tam2, setTam2] = useState(0)
    const [univs, setUnivs] = useState(univList)
    const [selectedUnivs, setSelectedUnivs] = useState([])
    const [selectedStandard, setSelectedStandard] = useState([])
    const BarHorizontalData = {
        labels: selectedUnivs,
        datasets: [
            {
                label: '차이',
                backgroundColor: chartTooltipColor.themeColor2_10,
                borderColor: chartTooltipColor.themeColor2,
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: selectedStandard
            }
        ]
    };
    const onClickGrade = value => {
        setTotalHomeClass([])
        setIsWarning(false)
        setIsCheck(true)
        axios.get(`http://localhost:5000/teacher/grade/input/homeClass/${schoolCode}/${value}`)
            .then(({data}) => {
                setTotalHomeClass(data)
                setTotalStudent([])
                setSemesterCodeList([])
                setGrade(value)
                setHomeClass(0)
                setStudent('')
                setSemesterCode('')
            })
    }
    const onClickHomeClass = value => {
        setIsWarning(false)
        setIsCheck(true)
        axios.get(`http://localhost:5000/teacher/grade/input/student/${schoolCode}/${grade}/${value}`)
            .then(({data}) => {
                setTotalStudent(data)
                setHomeClass(value)
                setStudent('')
                setSemesterCode(0)
                setSemesterCodeList(['3월', '6월', '9월'])
            })
    }
    const onClickStudent = value => {
        setIsWarning(false)
        setStudent(value)
        setSemesterCode(0)
        setIsCheck(true)
    }
    const onClickSemesterCode = value => {
        switch (value) {
            case '3월':
                setSemesterCode(1);
                break;
            case '6월':
                setSemesterCode(2);
                break;
            default:
                setSemesterCode(3);
                break;
        }
        setIsWarning(false)
        setIsCheck(true)
    }
    const onClickGetScore = () => {
        if (grade === 0 || homeClass === 0 || student === '' || semesterCode === 0) {
            setIsWarning(true)
        } else {
            setIsWarning(false)
            getScore()
        }
    }
    const getScore = () => {
        axios.get(`http://localhost:5000/teacher/grade/mock/get/${schoolCode.concat(semesterCode, grade, homeClass, student)}`)
            .then(({data}) => {
                if (data.length !== 0) {
                    let s = 0;
                    for (let i = 0; i < 3; i++) {
                        let temp = data[i].subject
                        switch (temp) {
                            case '국':
                                setKor(data[i].score);
                                break;
                            case '영':
                                setEng(data[i].score);
                                break;
                            default:
                                setMat(data[i].score);
                                break;
                        }
                        s += data[i].standard
                    }
                    let st = 0
                    for (let i = 3; i < 5; i++) {
                        let temp = data[i].subject
                        switch (temp) {
                            case '탐1':
                                setTam1(data[i].score);
                                break;
                            default:
                                setTam2(data[i].score);
                                break;
                        }
                        st += data[i].standard
                    }
                    getUnivs(s + st / 2)
                } else {
                    setKor(0)
                    setEng(0)
                    setMat(0)
                    setTam1(0)
                    setTam2(0)
                }
                setIsCheck(false)
            })
    }
    const getUnivs = (standard) => {
        if(standard % 1 !== 0) standard += 0.5
        let temp = []
        let names = []
        let standards = []
        for (let i = standard - 5; i < standard + 8; i++) {
            for (let j = 0; j < univs.length; j++) {
                if (homeClass <= 8) {
                    if (univs[j].standard === i && univs[j].category === '인문') {
                        if (!names.includes(univs[j].univ)) {
                            names.push(`${univs[j].univ}/${univs[j].major}`)
                            standards.push(univs[j].standard - standard)
                            temp.push(univs[j])
                        }
                    }
                } else {
                    if (univs[j].standard === i && univs[j].category === '자연') {
                        if (!names.includes(univs[j].univ)) {
                            names.push(`${univs[j].univ}/${univs[j].major}`)
                            standards.push(univs[j].standard - standard)
                            temp.push(univs[j])
                        }
                    }
                }

            }
        }
        setSelectedUnivs(names)
        setSelectedStandard(standards)
    }
    return <>
        <Row className="rounded">
            <Colxx xxs="12" lg="2" className="mb-4 t-grade-div-btn">
                <Card>
                    <CardBody>
                        <CardTitle>
                            학생 선택
                        </CardTitle>
                        <select className="form-control" onClick={e => onClickGrade(e.target.value)}>
                            {totalGrade.map((i, index) => (
                                <option value={i} key={index}>{i}학년</option>
                            ))}
                        </select>
                        <div className="t-grade-padding-top"/>
                        <select className="form-control" onClick={e => onClickHomeClass(e.target.value)}>
                            {totalHomeClass.map((i, index) => (
                                <option value={i} key={index}>{i}반</option>
                            ))}
                        </select>
                        <div className="t-grade-padding-top"/>
                        <select className="form-control" onClick={e => onClickStudent(e.target.value)}>
                            {totalStudent.map((i, index) => (
                                <option value={i} key={index}>{i}</option>
                            ))}
                        </select>
                        <div className="t-grade-padding-top"/>
                        <select className="form-control" onClick={e => onClickSemesterCode(e.target.value)}>
                            {semesterCodeList.map((i, index) => (
                                <option value={i} key={index}>{i}</option>
                            ))}
                        </select><br/>
                        <Button color="primary" type="submit" onClick={onClickGetScore}>
                            확인
                        </Button>
                        {isWarning && <><br/>
                            <span>모두 정확하게<br/>선택해 주십시오</span>
                        </>}
                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="10" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4">성적</CardTitle>
                        {isCheck ? <span>학생을 선택해주세요</span> : (<>
                            <form>
                                <Row>
                                    <div className="t-grade-div-left">
                                        <FormGroup className="error-l-75">
                                            <Label>국어</Label>
                                            <input className="form-control" value={kor}/>
                                        </FormGroup>
                                        <FormGroup className="error-l-75">
                                            <Label>영어</Label>
                                            <input className="form-control" value={eng}/>
                                        </FormGroup>
                                        <FormGroup className="error-l-75">
                                            <Label>수학</Label>
                                            <input className="form-control" value={mat}/>
                                        </FormGroup>

                                    </div>
                                    <div className="t-grade-div-right">
                                        <FormGroup className="error-l-75">
                                            <Label>탐구1</Label>
                                            <input className="form-control" value={tam1}/>
                                        </FormGroup>
                                        <FormGroup className="error-l-75">
                                            <Label>탐구2</Label>
                                            <input className="form-control" value={tam2}/>
                                        </FormGroup>
                                    </div>
                                </Row>
                            </form>
                        </>)}
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
        <Row className="rounded">
            <Colxx xxs="12" lg="12" className="mb-4">
                <Card>
                    <CardBody>
                        <CardTitle>표준점수 기반 배치표 분석</CardTitle>
                        <div className="chart-container">
                            <BarHorizontal data={BarHorizontalData}/>
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
    </>
}
export default Mock