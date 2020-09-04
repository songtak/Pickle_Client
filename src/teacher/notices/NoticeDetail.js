import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Row, Modal, ModalHeader, ModalBody} from "reactstrap"
import axios from 'axios'
import './notice.css'
import {useDispatch} from "react-redux";

const NOTICE = "noticeDetail/NOTICE"
const getNotice = notice => ({type: NOTICE, payload: notice})
export const tNoticeDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTICE:
            return {...state, payload: action.payload}
        default:
            return state
    }
}

const NoticeDetail = ({history, match}) => {
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [contents, setContents] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [commentContents, setCommentContents] = useState("")
    const [comment, setComment] = useState([])
    const [file, setFile] = useState([])
    const [isModal, setIsModal] = useState(false);
    const [isPwOk, setIsPwOk] = useState(false)
    const [isPsFail, setIsPwFail] = useState(false)
    const dispatch = useDispatch()
    const id = localStorage.getItem("id")
    useEffect(() => {
        getTotal()
    }, [])
    const getTotal = () => {
        axios.get(`http://localhost:5000/notice/detail/${match.params.id}`)
            .then(({data}) => {
                let temp = data.notice
                dispatch(getNotice(temp))
                setComment(data.noticeComment)
                setFile(data.files)
                setCategory(temp.category)
                setTitle(temp.title)
                setPassword(temp.password)
                setContents(temp.contents)
                setCreateDate(temp.createDate.slice(0, 10))
                if (String(temp.makerId) === String(id)) setIsVisible(true)
            })
            .catch()
    }
    const onClickComment = e => {
        e.preventDefault()
        axios.post(
            `http://localhost:5000/noticecomment/save`,
            {userTableId: id, articleNo: match.params.id, commentContents: commentContents},
            {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            .then(() => {
                getTotal()
            })
    }
    const onChangeNoticeDelete = value => {
        if (value !== password) {
            setIsPwFail(true)
            setIsPwOk(false)
        } else {
            setIsPwFail(false)
            setIsPwOk(true)
            setTimeout(() =>
                axios.get(`http://localhost:5000/notice/delete/${match.params.id}`)
                    .then(() => {
                        history.goBack()
                    }), 800)
        }
    }
    const onClickCommentDelete = commentNo => {
        axios.get(`http://localhost:5000/noticecomment/delete/${commentNo}`)
            .then(() => {
                getTotal()
            })
    }
    const onClickModify = () => {
        history.push(`/teacher/notice/modify/${match.params.id}`)
    }
    const onClickDownload = (id, fileName) => {
        axios.get(`http://localhost:5000/file/download/${id}`, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        })
            .then(res =>{
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${fileName}`);
                    document.body.appendChild(link);
                    link.click();
                }
            )
    }
    return <>
        <Card>
            <CardBody>
                <CardTitle style={{paddingLeft: 5}}>{title}
                    {isVisible && <>
                        <span style={{paddingLeft: 10}}>
                            <button type="button" className="btn border-0 btn-outline-primary"
                                    onClick={() => onClickModify()}>
                                수정
                            </button>
                            <button type="button" className="btn border-0 btn-outline-primary"
                                    onClick={() => setIsModal(true)}>
                                삭제
                            </button>
                        </span>
                    </>}
                </CardTitle>

                <hr/>
                <Row className="t-notice-table">
                    <span className="t-notice-detail-td1">{category}</span>
                    <span className="t-notice-detail-td2">{createDate}</span>
                </Row>
                <br/>
                <form>
                    <div className="position-relative row form-group t-notice-form-div">
                        <div style={{whiteSpace: "pre-line"}}>
                            {contents}
                        </div>
                    </div>
                    <hr/>
                    <tr>
                        <td className="t-notice-width90">첨부파일</td>
                        <td>
                            {file.map((i, index) => (<>
                                <div key={index} onClick={() => onClickDownload(i.id, i.fileName)}>{i.fileName}</div>
                            </>))}
                        </td>
                    </tr>
                    <hr/>
                    <table>
                        <tbody>
                        {comment.map((i, index) => (
                            String(i.makerId) !== String(id) ? (
                                <tr key={index}>
                                    <td width="50px">
                                        <span className="mr-2 col-sm-2">{index + 1}</span>
                                    </td>
                                    <td width="100px">
                                        <span className="mr-2 col-sm-2">{i.makerName}</span>
                                    </td>
                                    <td>
                                        <span className="mr-9 col-sm-10">{i.commentContents}</span>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={index}>
                                    <td width="50px">
                                        <span className="mr-2 col-sm-2">{index + 1}</span>
                                    </td>
                                    <td width="100px">
                                        <span className="mr-2 col-sm-2">{i.makerName}</span>
                                    </td>
                                    <td>
                                        <span className="mr-9 col-sm-10">{i.commentContents}</span>
                                        <span className="t-notice-cursor"
                                              onClick={() => onClickCommentDelete(i.id)}>x</span>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                    <br/>
                    <span className="position-relative row form-group">
                        <label className="col-sm-1 col-form-label t-notice-textAlign-center">댓글</label>
                        <span className="col-sm-10">
                            <textarea placeholder="댓글을 입력하세요" className="form-control" value={commentContents}
                                      onChange={e => setCommentContents(e.target.value)}/>
                        </span>
                            <button type="button" className="btn border-0 btn-outline-primary" onClick={onClickComment}>
                                등록
                            </button>
                    </span>
                    <div className="t-notice-textAlign-center">
                        <button type="button" className="btn mr-3 btn-primary" onClick={() => history.goBack()}>
                            목록
                        </button>
                        <br/>
                    </div>
                </form>
            </CardBody>
        </Card>

        <Modal
            isOpen={isModal}
            toggle={() => setIsModal(!isModal)}
        >
            <ModalHeader>게시글 비밀번호를 입력해 주세요.</ModalHeader>
            <ModalBody>
                <input name="password" type="password" className="form-control"
                       onChange={e => onChangeNoticeDelete(e.target.value)}/>
                <br/>
                {isPwOk && <span className="t-notice-ok">확인되었습니다.</span>}
                {isPsFail && <span className="t-notice-cursor">비밀번호를 정확히 입력해 주세요.</span>}
            </ModalBody>
        </Modal>
    </>
}
export default NoticeDetail