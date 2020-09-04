import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Row, Modal, ModalHeader, ModalBody} from "reactstrap"
import axios from 'axios'
import './notice.css'
import {useDispatch} from "react-redux";

const NoticeDetail = ({history, match}) => {
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [contents, setContents] = useState("")
    const [commentContents, setCommentContents] = useState("")
    const [comment, setComment] = useState([])
    const [file, setFile] = useState([])
    const id = localStorage.getItem("id")
    useEffect(() => {
        getTotal()
    }, [])
    const getTotal = () => {
        axios.get(`http://localhost:5000/notice/detail/${match.params.id}`)
            .then(({data}) => {
                let temp = data.notice
                setComment(data.noticeComment)
                setFile(data.files)
                setCategory(temp.category)
                setTitle(temp.title)
                setContents(temp.contents)
                setCreateDate(temp.createDate.slice(0, 10))
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
    const onClickCommentDelete = commentNo => {
        axios.get(`http://localhost:5000/noticecomment/delete/${commentNo}`)
            .then(() => {
                getTotal()
            })
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
                <CardTitle style={{paddingLeft: 5}}>{title}</CardTitle>
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
                        <label className="col-sm-1 col-form-label" style={{textAlign: "center"}}>댓글</label>
                        <span className="col-sm-10">
                            <textarea placeholder="댓글을 입력하세요" className="form-control" value={commentContents}
                                      onChange={e => setCommentContents(e.target.value)}/>
                        </span>
                            <button type="button" className="btn border-0 btn-outline-primary" onClick={onClickComment}>
                                등록
                            </button>
                    </span>
                    <div style={{textAlign: "center"}}>
                        <button type="button" className="btn mr-3 btn-primary" onClick={() => history.goBack()}>
                            목록
                        </button>
                        <br/>
                    </div>
                </form>
            </CardBody>
        </Card>
    </>
}
export default NoticeDetail