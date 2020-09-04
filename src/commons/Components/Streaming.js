import React, {useRef, useState} from "react";
import {Card, CardBody} from 'reactstrap';
import '../Home.css'

const Streaming = () => {
    const localVideo = useRef()
    const onPlay = ()=>{
            navigator.mediaDevices.getUserMedia({video : true})
                .then(stream=>{
                    localVideo.current.srcObject = stream
                })
    }
    return <div className="main-streaming-div">
        <Card>
            <CardBody>
                <div className="main-streaming-container">
                    <div className="main-video-container">
                        <video className="main-video-component" autoPlay ref={localVideo} controls/>
                    </div>
                </div>
                <div className="main-div-padding">
                    <button className="btn border-0 btn-outline-primary main-fontsize15" onClick={onPlay}>
                        화상수업 체험해보기
                    </button>
                </div>
            </CardBody>
        </Card>
    </div>
}
export default Streaming