import React, {useEffect, useState} from "react";
import {Card, CardBody, Row} from "reactstrap";
import axios from "axios";
import {useSelector} from "react-redux";

const NoticeModify = ({history, match}) => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState(["선택", "전체 공지"])
    const [password, setPassword] = useState("")
    const [select, setSelect] = useState("")
    const [contents, setContents] = useState("")
    const [file, setFile] = useState(null)
    const [isMessageContents, setIsMessageContents] = useState(false)
    const [isMessageCategory, setIsMessageCategory] = useState(false)
    const detail = useSelector(state => state.tNoticeDetailReducer.payload, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/notice/getCategory`)
            .then(({data}) => {
                setCategory([...category].concat(data))
            })
        setTitle(detail.title)
        setPassword(detail.password)
        setContents(detail.contents)
        setSelect(detail.category)
    }, [])
    const onclickSubmit = e => {
        e.preventDefault()
        let a = false
        let b = false
        if(select === '' || select === '선택') a = true
        if(contents === '') b = true
        if(a || b){
            if(a && b){
                setIsMessageCategory(a)
                setIsMessageContents(b)
            }else if(b){
                setIsMessageCategory(a)
                setIsMessageContents(b)
            }else {
                setIsMessageCategory(a)
                setIsMessageContents(b)
            }
        } else {
            setIsMessageCategory(a)
            setIsMessageContents(b)
            axios
                .post(`http://localhost:5000/notice/update`,
                    {title: title, password: password, contents: contents, category: select, id: match.params.id},
                    {
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    })
                .then(({data}) => {
                    postApis(detail.id)
                    history.goBack()
                })
                .catch(error => {
                    throw(error)
                })
        }

    }
    const onChangeFile = e => {
        setFile(e.target.files[0])
    }
    const postApis = articleNo => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post(`http://localhost:5000/file/upload/${articleNo}/null`, formData, {
            authorization: 'JWT fefege..',
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        })
            .then()
    }
    return <>
        <Card className="font_Nanum_Gothic">
            <CardBody>
                <h1>수정하기</h1><br/>
                <form>
                    <Row className="form-group">
                        <label className="col-sm-2 col-form-label">
                            제목
                        </label>
                        <div className="col-sm-10">
                            <input name="title" className="form-control" value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                        </div>
                    </Row>
                    <Row className="form-group">
                        <label className="col-sm-2 col-form-label">카테고리</label>
                        <div className="col-sm-10">
                            <select className="col-sm-3 form-control" value={select} onChange={e => {
                                setSelect(e.target.value)
                            }}>
                                {category.map((temp) => (<option value={temp} key={temp}>{temp}</option>))}
                            </select>
                        </div>
                    </Row>
                    <Row className="form-group">
                        <label className="col-sm-2 col-form-label">비밀번호</label>
                        <div className="col-sm-10">
                            <input name="password" type="password" className="form-control" value={password}
                                   onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </Row>
                    <Row className="form-group">
                        <label className="col-sm-2 col-form-label">내용</label>
                        <div className="col-sm-10">
                            <textarea name="text" className="form-control" style={{height: '250px'}}
                                      value={contents} onChange={e => setContents(e.target.value)}/>
                        </div>
                    </Row>
                    <Row className="form-group">
                        <label className="col-sm-2 col-form-label">파일 첨부</label>
                        <div className="col-sm-10">
                            <input name="file" type="file" className="form-control-file" onChange={onChangeFile.bind(this)}/></div>
                    </Row>
                    <br/>
                    <div className="text-center">
                        <button type="button" className="btn mr-3 btn-primary t-notice-width100"
                                onClick={onclickSubmit}>
                            등록
                        </button>
                        <button type="button" className="btn btn-outline-primary t-notice-width90"
                                onClick={() => history.goBack()}>
                            취소
                        </button>
                        <br/>
                        {isMessageContents && <><span style={{color: "red"}}>내용을 작성해 주십시오</span><br/></>}
                        {isMessageCategory && <span style={{color: "red"}}>카테고리를 설정해 주십시오</span>}
                    </div>
                </form>
            </CardBody>
        </Card>
    </>
}
export default NoticeModify