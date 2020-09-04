import React, {useEffect, useState} from "react";
import {Row, Card, CardBody, CardTitle, Modal, ModalBody, ModalHeader} from 'reactstrap'
import axios from 'axios'
import './main.css'
import schoolsList from '../../assets/data/schools.json'

const Mypage = ({history}) => {
    const [name, setName] = useState("")
    const [userId, setUserId] = useState("")
    const [schoolCode, setSchoolCode] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [curGrade, setCurGrade] = useState("")
    const [homeClass, setHomeClass] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [isPwOk, setIsPwOk] = useState(false)
    const [isPsFail, setIsPwFail] = useState(false)
    const [isNewPw, setIsNewPw] = useState(false)
    const [isOldPw, setIsOldPw] = useState(false)
    const [newUserPw, setNewUserPw] = useState("")
    const [isChanged, setIsChanged] = useState(false)
    const [isSchoolModal, setIsSchoolModal] = useState(false)
    const [selectedSchool, setSelectedSchool] = useState({})
    const [schools, setSchools] = useState(schoolsList)
    useEffect(() => {
        axios.get(`http://localhost:5000/user/find/${localStorage.getItem("userCode")}`)
            .then(({data}) => {
                setName(data.name)
                setUserId(data.userId)
                setSchoolCode(data.schoolCode)
                setSchoolName(data.schoolName)
                setCurGrade(data.curGrade)
                setHomeClass(data.homeClass)
                setPhone(data.phone)
                setEmail(data.email)
            })
    }, [])
    const onSubmit = (userId, schoolCode, schoolName, curGrade, homeClass, phone, email) => {
        axios.post(
            'http://localhost:5000/user/update',
            {
                userCode: localStorage.getItem("userCode"),
                userId: userId,
                schoolCode: schoolCode,
                schoolName: schoolName,
                curGrade: curGrade,
                homeClass: homeClass,
                phone: phone,
                email: email
            },
            {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            .then(window.location.reload())
        //then 부분 리듀서로 처리하기
    }

    const onChangePassword = value => {
        if (value.length != 0) {
            axios.get(`http://localhost:5000/user/check/${localStorage.getItem("id")}/${value}`)
                .then(({data}) => {
                    if (data === 'FAIL') {
                        setIsPwFail(true)
                        setIsOldPw(true)
                        setIsPwOk(false)
                        setIsNewPw(false)
                    } else {
                        setIsPwFail(false)
                        setIsPwOk(true)
                        setTimeout(() => {
                            setIsOldPw(false)
                            setIsNewPw(true)
                            setIsPwOk(false)
                        }, 500)
                    }
                })
                .catch(error => {
                    throw(error)
                })
        }
    }
    const onClickUpdatePw = () => {
        axios.get(`http://localhost:5000/user/update/${localStorage.getItem("id")}/${newUserPw}`)
            .then(() => {
                setIsChanged(true)
                setTimeout(() => {
                    setIsPwOk(false)
                    setIsPwFail(false)
                    setIsNewPw(false)
                    setIsOldPw(false)
                    setIsChanged(false)
                }, 800)
            })
    }
    const searchSchools = input => {
        setSelectedSchool({})
        if (input.length < 0) console.log(`Error`)
        switch (input.length) {
            case 0:
                setSchools(schoolsList)
                break
            case 1:
                setSchools(schoolsList.filter(
                    item => item.schoolName.charAt(0) === input
                ))
                break
            default:
                setSchools(schoolsList.filter(
                    item => item.schoolName.includes(input)
                ))
                break
        }
    }
    const onClickSearchButton = () => {
        setIsSchoolModal(true)
        setSelectedSchool({})
        setSchools(schoolsList)
    }
    const onClickSetSchool = () => {
        setIsSchoolModal(false)
        if(selectedSchool !== {}){
            setSchoolCode(selectedSchool.schoolCode)
            setSchoolName(selectedSchool.schoolName)
        }
    }
    return <Card>
        <CardBody>
            <CardTitle>마이페이지</CardTitle><br/>
            <form id="signupform" style={{textAlign: "right"}}>
                <div className="row form-group">
                    <label className="col-sm-2">이름</label>
                    <span style={{paddingLeft: 15}}>{name}</span>
                </div>
                <div className="row form-group">
                    <label className="col-sm-2">아이디</label>
                    <span style={{paddingLeft: 15}}>{userId}</span>
                </div>
                <div className="row form-group">
                    <label className="col-sm-2 col-form-label">비밀번호</label>
                    <div className="col-sm-8 mypage-btn">
                        <button type="button" className="btn btn-outline-primary"
                                onClick={() => setIsOldPw(true)}>비밀번호
                            변경하기
                        </button>
                    </div>
                    <Modal
                        isOpen={isOldPw}
                        toggle={() => setIsOldPw(!isOldPw)}
                    >
                        <ModalBody>
                            <h6 className="font_Nanum_Gothic">현재 비밀번호를 입력해주세요.</h6>
                            <input name="password" type="password" className="form-control"
                                   onChange={e => onChangePassword(e.target.value)}/>
                            <br/>
                            {isPwOk && <span className="mypage-ok">확인되었습니다.</span>}
                            {isPsFail && <span className="mypage-fail">비밀번호를 정확히 입력해 주세요.</span>}
                        </ModalBody>
                    </Modal>
                    <Modal
                        isOpen={isNewPw}
                        toggle={() => setIsNewPw(!isNewPw)}
                    >
                        <ModalBody>
                            <h6 className="font_Nanum_Gothic">변경할 비밀번호를 입력해주세요.</h6>
                            <input name="password" type="password" className="form-control"
                                   onChange={e => setNewUserPw(e.target.value)}/>
                            <br/>
                            {isChanged && <span className="mypage-ok">완료되었습니다.</span>}
                            <div className="mypage-align">
                                <button className="btn btn-outline-primary" onClick={onClickUpdatePw}>변경
                                </button>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
                <div className="row form-group">
                    <label className="col-sm-2 col-form-label">학교</label>
                    <div className="col-sm-8">
                        <input className="form-control" value={schoolName} readOnly
                               onChange={e => setSchoolName(e.target.value)}/>
                    </div>
                    <button type="button" className="btn btn-outline-primary mypage-width100"
                            onClick={() => onClickSearchButton()}>검색
                    </button>
                    <Modal
                        isOpen={isSchoolModal}
                        toggle={() => setIsSchoolModal(!isSchoolModal)}
                    >
                        <ModalHeader>학교 검색</ModalHeader>
                        <ModalBody>
                            <input className="form-control" placeholder="학교를 검색해주십시오"
                                   onChange={e => searchSchools(e.target.value.trim())}/>
                            <br/>
                            <select className="form-control"
                                    onClick={e => setSelectedSchool(schools[e.target.value])}>
                                {schools.map((i, index) => <option key={index} value={index}>{i.schoolName}</option>)}
                            </select>
                            <div className="mypage-align">
                                <br/>
                                <button type="button" className="btn btn-outline-primary"
                                        onClick={() => onClickSetSchool()}>확인
                                </button>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
                <div className="row form-group">
                    <label className="col-sm-2 col-form-label">학년</label>
                    <span style={{margin: 8}}/>
                    <select className="col-sm-3 form-control" value={curGrade}
                            onChange={e => setCurGrade(e.target.value)}>
                        <option value="1">1학년</option>
                        <option value="2">2학년</option>
                        <option value="3">3학년</option>
                    </select>
                    <span style={{margin: -8}}/>
                    <label className="col-sm-1 col-form-label">반</label>
                    <div className="col-sm-4">
                        <input className="form-control" defaultValue={homeClass}
                               onChange={e => setHomeClass(e.target.value)}/>
                    </div>
                </div>
                <div className="row form-group">
                    <label className="col-sm-2 col-form-label">연락처</label>
                    <div className="col-sm-8">
                        <input className="form-control" defaultValue={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                </div>
                <div className="row form-group">
                    <label className="col-sm-2 col-form-label">이메일</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" defaultValue={email}
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="btn mr-3 btn-primary user-width100"
                            onClick={() => onSubmit(userId, schoolCode, schoolName, curGrade, homeClass, phone, email)}>
                        변경하기
                    </button>
                    <button type="button" className="btn btn-outline-primary user-width90"
                            onClick={() => history.goBack()}>
                        취소
                    </button>
                </div>
            </form>
        </CardBody>
    </Card>
}
export default Mypage