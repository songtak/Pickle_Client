import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Card, CardBody} from 'reactstrap';
import axios from "axios";
import {useSelector} from "react-redux";

const Notice = () => {
    const [list, setList] = useState([])
    const [position, setPosition] = useState("teacher")
    const user = useSelector(state => state.mainpageReducer.payload)
    useEffect(() => {
        axios.get(`http://localhost:5000/notice/mainPage`)
            .then(({data}) => {
                setList(data)
            })
            .catch(err => {
                console.log(`${err}`)
            })
        //프로젝트 올리기 전 꼭 지우기
        //if(user.positionChecker == 1) setPosition("student")
    }, [])
    return <Card>
        <CardBody>
            <table className="table">
                <thead>
                <tr style={{textAlign: "center"}}>
                    <th>분류</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                </tr>
                </thead>
                <tbody>
                {list.map((i, index) =>
                    <tr style={{textAlign: "center"}} key={index}>
                        <td style={{width: 150}}>{i.category}</td>
                        <td style={{textAlign: "left"}}><NavLink
                            to={`/${position}/notice/detail/${i.id}`}>{i.title}</NavLink>
                        </td>
                        <td style={{width: 150}}>{i.makerName}</td>
                        <td style={{width: 150}}>{i.createDate.slice(0, 10)}</td>
                    </tr>)}
                </tbody>
            </table>
        </CardBody>
    </Card>
}
export default Notice