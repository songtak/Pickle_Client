import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Progress} from 'reactstrap';
import axios from 'axios'


const Grade = ({cardClass}) => {
    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/main/student/grade/${localStorage.getItem("id")}`)
            .then(({data}) => {
                setResult(data)
            })
    }, [])
    return <>
        <Card className={cardClass}>
            <CardBody>
                <CardTitle>
                    <i className="simple-icon-graduation"/> 내 성적
                </CardTitle>
                <br/>
                {result.map((i, index) => {
                    return(
                        <div key={index} className="mb-4">
                        <p className="mb-2">
                            {i.sub}
                            <span className="float-right text-muted">
                                            {i.score} 점
                                        </span>
                        </p>
                        <Progress value={i.score}/>
                    </div>
                    )
                })}
                {/*{result.map((s, index) => {
                    return (
                        <div key={index} className="mb-4">
                            <p className="mb-2">
                                {s.title}
                                <span className="float-right text-muted">
                                            {s.status}등 / {s.total}반
                                        </span>
                            </p>
                            <Progress value={((s.total - s.status) / s.total) * 100}/>
                        </div>
                    );
                })}*/}
            </CardBody>
        </Card>
    </>
}
export default Grade