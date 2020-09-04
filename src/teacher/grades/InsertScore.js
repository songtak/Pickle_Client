import React, {useState} from 'react';
import axios from 'axios'
import {Row, Card, CardBody, FormGroup, Label, Button, CardTitle} from 'reactstrap';
import {Colxx} from '../../commons/Components/CustomComponent';
import './grades.css'


const InsertScore = () => {
    const totalGrade = [1, 2, 3]
    const [totalHomeClass, setTotalHomeClass] = useState([''])
    const [totalStudent, setTotalStudent] = useState([''])
    const [semesterCodeList, setSemesterCodeList] = useState([''])
    const [grade, setGrade] = useState(0)
    const [homeClass, setHomeClass] = useState(0)
    const [student, setStudent] = useState('')
    const [semesterCode, setSemesterCode] = useState('')
    const [isWarning, setIsWarning] = useState(false)
    const [isCheck, setIsCheck] = useState(true)
    const year = new Date().getFullYear()
    const schoolCode = localStorage.getItem("schoolCode")
    const [kor, setKor] = useState(0)
    const [eng, setEng] = useState(0)
    const [mat, setMat] = useState(0)
    const [phl, setPhl] = useState(0)
    const [eco, setEco] = useState(0)
    const [his, setHis] = useState(0)
    const [bio, setBio] = useState(0)
    const [phy, setPhy] = useState(0)
    const [fore, setFore] = useState(0)
    const [isScoreWarning, setIsScoreWarning] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const getScore = () => {
        axios.get(`http://localhost:5000/teacher/grade/get/${schoolCode.concat(semesterCode, grade, homeClass, student)}`)
            .then(({data}) => {
                if(data.length !== 0){
                    for(let i=0; i<data.length; i++){
                        let temp = data[i].sub.slice(0, 2)
                        switch (temp){
                            case '국어': setKor(data[i].score); break;
                            case '영어': setEng(data[i].score); break;
                            case '수학': setMat(data[i].score); break;
                            case '한국': setHis(data[i].score); break;
                            case '경제': setEco(data[i].score); break;
                            case '생활': setPhl(data[i].score); break;
                            case '생명': setBio(data[i].score); break;
                            case '물리': setPhy(data[i].score); break;
                            default: setFore(data[i].score); break;
                        }
                    }
                }else {
                    setKor(0)
                    setEng(0)
                    setMat(0)
                    setHis(0)
                    setEco(0)
                    setPhl(0)
                    setBio(0)
                    setPhy(0)
                    setFore(0)
                }
                setIsCheck(false)
            })
    }
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
                setSemesterCode('')
                setSemesterCodeList(['1학기 중간고사', '1학기 기말고사', '2학기 중간고사', '2학기 기말고사'])
            })
    }
    const onClickStudent = value => {
        setIsWarning(false)
        setStudent(value)
        setSemesterCode('')
        setIsCheck(true)
    }
    const onClickSemesterCode = value => {
        switch (value){
            case '1학기 중간고사': setSemesterCode(`${year}11`); break;
            case '1학기 기말고사': setSemesterCode(`${year}12`); break;
            case '2학기 중간고사': setSemesterCode(`${year}21`); break;
            default: setSemesterCode(`${year}22`); break;
        }
        setIsWarning(false)
        setIsCheck(true)
    }
    const onClickGetScore = () => {
        if (grade === 0 || homeClass === 0 || student === '' || semesterCode === '') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
            getScore()
        }
    }
    const setScore = (input, sub) => {
        let subName = sub.slice(0, 2)
        let value = Number(input)
        if(isNaN(value) ||value < 0 || 100 < value){
            setIsScoreWarning(true)
        }else {
            setIsScoreWarning(false)
            if (subName === '국어') {
                setKor(value)
            } else if (subName === '영어') {
                setEng(value)
            } else if (subName === '수학') {
                setMat(value)
            } else if (subName === '생활') {
                setPhl(value)
            } else if (subName === '경제') {
                setEco(value)
            } else if (subName === '한국') {
                setHis(value)
            } else if (subName === '생명') {
                setBio(value)
            } else if (subName === '물리') {
                setPhy(value)
            } else {
                setFore(value)
            }
        }
    }
    const onSubmit = () => {
        if(isScoreWarning === false){
        axios.post(`http://localhost:5000/teacher/grade/input`,
                {kor: kor, eng: eng, mat: mat, phl: phl, eco: eco, his: his, bio: bio, phy: phy, for: fore, userInfo: schoolCode.concat(semesterCode, grade, homeClass, student)},
                {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                })
                .then(() => {
                    setIsCompleted(true)
                    setTimeout((() => setIsCompleted(false)), 1000)
                    getScore()
                })
        }
    };
    return (<>
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
                            <CardTitle className="mb-4">성적 입력 및 변경</CardTitle>
                            {isCheck ? <span>학생을 선택해주세요</span> : (
                                <form>
                                    <Row>
                                        <div className="t-grade-div-left">
                                            <FormGroup className="error-l-75">
                                                <Label>국어</Label>
                                                <input className="form-control" value={kor} onChange={e => setScore(e.target.value, '국어')}/>
                                            </FormGroup>
                                            <FormGroup className="error-l-75">
                                                <Label>영어</Label>
                                                <input className="form-control" value={eng} onChange={e => setScore(e.target.value, '영어')}/>
                                            </FormGroup>
                                            <FormGroup className="error-l-75">
                                                <Label>수학</Label>
                                                <input className="form-control" value={mat} onChange={e => setScore(e.target.value, '수학')}/>
                                            </FormGroup>
                                            <FormGroup className="error-l-75">
                                                <Label>경제</Label>
                                                <input className="form-control" value={eco} onChange={e => setScore(e.target.value, '경제')}/>
                                            </FormGroup>
                                            <FormGroup className="error-l-75">
                                                <Label>한국사</Label>
                                                <input className="form-control" value={his} onChange={e => setScore(e.target.value, '한국')}/>
                                            </FormGroup>
                                        </div>
                                        <div className="t-grade-div-right">
                                            <FormGroup className="error-l-75">
                                                <Label>생활과 윤리</Label>
                                                <input className="form-control" value={phl} onChange={e => setScore(e.target.value, '생활')}/>
                                            </FormGroup>
                                            <FormGroup className="error-l-75">
                                                <Label>생명과학</Label>
                                                <input className="form-control" value={bio} onChange={e => setScore(e.target.value, '생명')}/>
                                            </FormGroup>
                                            <FormGroup className="error-l-75">
                                                <Label>물리</Label>
                                                <input className="form-control" value={phy} onChange={e => setScore(e.target.value, '물리')}/>
                                            </FormGroup>
                                            <FormGroup className="error-l-75">
                                                <Label>제2외국어</Label>
                                                <input className="form-control" value={fore} onChange={e => setScore(e.target.value, '제2외국어')}/>
                                            </FormGroup>
                                        </div>
                                    </Row>
                                    <br/>
                                    <div className="t-grade-div-btn">
                                        <Button color="primary" onClick={onSubmit}>
                                            입력
                                        </Button>
                                        {isScoreWarning && <div className="invalid-feedback d-block">
                                            0부터 100까지의 숫자를 입력해주세요
                                        </div>}
                                        {isCompleted && <div className="t-grade-ok">성적이 입력되었습니다</div>}
                                    </div>
                                </form>
                            )}
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </>
    );
};
export default InsertScore;