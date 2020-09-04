import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle} from 'reactstrap';
import './notice.css'
import {NavLink} from "react-router-dom";
import axios from 'axios'

const NoticeList = ({match, history}) => {
    const [list, setList] = useState([])
    const [pages, setPages] = useState([])
    const [pager, setPager] = useState({})
    const [category, setCategory] = useState(["전체 보기", "전체 공지"])
    const [selectedCate, setSelectedCate] = useState("")
    const [isVisible, setIsVisible] = useState(true)
    useEffect(() => {
        transPage('all', match.params.id - 1)
        axios.get(`http://localhost:5000/notice/getCategory`)
            .then(({data}) => {
                setCategory([...category].concat(data))
            })
    }, [])
    const transPage = (selectedCate, currentPage) => {
        let value = selectedCate
        if (selectedCate === '' || selectedCate === '전체 보기') value = 'all'
        axios.get(`http://localhost:5000/notice/list/${value}/${currentPage}`)
            .then(({data}) => {
                setList(data.list)
                setPager(data.pagination)
                let tempPages = []
                let temp = data.pagination
                if (temp.rowCount !== 0) {
                    setIsVisible(true)
                    let i = temp.startPage
                    for (; i <= temp.endPage; i++) {
                        tempPages.push(i + 1)
                    }
                } else {
                    setIsVisible(false)
                }
                setPages(tempPages)
            })
            .catch(err => {
                console.log(`${err}`)
            })
    }
    const handleSelectChange = value => {
        history.push(`/teacher/notice/list/1`)
        setSelectedCate(value)
        let temp = ''
        if (value === '전체 보기') {
            temp = ''
        } else {
            temp = value
        }
        transPage(temp, 0)
    }
    const onClickNext = () => {
        history.push(`/teacher/notice/list/${pager.nextBlock + 1}`)
        transPage(selectedCate, pager.nextBlock)
    }
    const onClickPrev = () => {
        history.push(`/teacher/notice/list/${pager.preBlock+1}`)
        transPage(selectedCate, pager.preBlock)
    }
    return <Card>
        <CardBody>
            <CardTitle>공지사항</CardTitle><br/>
            <div className="text-right">
                <select className="col-sm-2 t-notice-selectbox" onChange={e => handleSelectChange(e.target.value)}>
                    {category.map((i, index) => (<option key={index} value={i}>{i}</option>))}
                </select>
            </div>
            <table className="table t-notice-margin0" id={"t-notice-table"}>
                <thead>
                <tr>
                    <th>글번호</th>
                    <th>분류</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                </tr>
                </thead>
                <tbody>
                {list.map((i, index) => (
                    <tr key={index}>
                        <td className={"t-notice-width100"}>{i.id}</td>
                        <td className={"t-notice-width150"}>{i.category}</td>
                        <td className={"t-notice-textAlign-left"}><NavLink
                            to={`/teacher/notice/detail/${i.id}`}>{i.title}</NavLink>
                            <span className="m-2 t-notice-comment">[{i.commentCount}]</span>
                        </td>
                        <td className={"t-notice-width150"}>{i.makerName}</td>
                        <td className={"t-notice-width200"}>{i.createDate.slice(0, 10)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="text-right">
                <NavLink to={`/teacher/notice/write`}>
                    <button className="btn border-0 btn-outline-primary">쓰기</button>
                </NavLink>
            </div>
            <div className="btn-cover text-center">
                {isVisible ? <>
                        {pager.existPrev && (
                            <button onClick={() => onClickPrev()}
                                    className="btn border-0 btn-outline-primary">
                                이전
                            </button>
                        )}
                        {pages.map((i, index) =>
                            <NavLink to={`/teacher/notice/list/${i}`} key={index}>
                                <button onClick={() => {
                                    transPage(selectedCate, i - 1)
                                }} className="btn border-0 btn-outline-primary">
                                    {i}
                                </button>
                            </NavLink>
                        )}
                        {pager.existNext && (
                            <button onClick={() => onClickNext()}
                                    className="btn border-0 btn-outline-primary">
                                다음
                            </button>
                        )}
                    </>
                    :
                    <span>해당 글이 존재하지 않습니다</span>
                }


            </div>
        </CardBody>
    </Card>
}
export default NoticeList