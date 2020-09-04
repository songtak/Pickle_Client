import React, {useEffect, useState} from 'react';
import {Card, CardBody} from 'reactstrap';
import {CircularProgressbar} from 'react-circular-progressbar';
import axios from "axios";

const Attendance = () => {
    const [totalDay, setTotalDay] = useState(0)
    const [presentCount, setPresentCount] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:5000/main/student/attendance/${localStorage.getItem("id")}`)
            .then(({data}) => {
                setTotalDay(data.totalDay)
                setPresentCount(data.presentCount)

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
                        <p className="lead text-white">출석률</p>
                        <span className="text-small text-white">총 출석일: {presentCount}</span><br/>
                        <span className="text-small text-white">총 수업일: {totalDay}</span>
                    </div>
                </div>
                <div className="progress-bar-circle progress-bar-banner position-relative">
                    <CircularProgressbar
                        strokeWidth={4}
                        value={presentCount*100/totalDay}
                        text={`${((presentCount/totalDay)*100).toFixed(2)}%`}
                    />
                </div>
            </CardBody>
        </Card>
    );
};
export default React.memo(Attendance);