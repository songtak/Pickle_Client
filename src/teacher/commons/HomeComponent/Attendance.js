import React, {useEffect, useState} from 'react';
import {Card, CardBody} from 'reactstrap';
import {CircularProgressbar} from 'react-circular-progressbar';
import axios from "axios";

const Attendance = () => {
    const [count, setCount] = useState(0)
    const [percent, setPercent] = useState(0)
    const homeClass = localStorage.getItem("homeClass")
    const curGrade = localStorage.getItem("curGrade")
    const schoolCode = localStorage.getItem("schoolCode")
    useEffect(() => {
        axios.get(`http://localhost:5000/main/teacher/attendance/${schoolCode}/${curGrade}/${homeClass}`)
            .then(({data}) => {
                setCount(data.count)
                setPercent(data.percent)
            })
    }, [])
    return (
        <Card className="progress-banner">
            <CardBody className="justify-content-between d-flex flex-row align-items-center">
                <div>
                    <i
                        className="simple-icon-pie-chart mr-2 text-white align-text-bottom d-inline-block"
                    />
                    <div>
                        <p className="lead text-white">오늘의 출석률</p>
                        <p className="text-small text-white">우리 반 인원: {count}</p>
                    </div>
                </div>
                <div className="progress-bar-circle progress-bar-banner position-relative">
                    <CircularProgressbar
                        strokeWidth={4}
                        value={percent}
                        text={`${percent}%`}
                    />
                </div>
            </CardBody>
        </Card>
    );
};
export default React.memo(Attendance);