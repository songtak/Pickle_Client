import React from "react";
import './s-streaming.css'
import {Card, CardBody, CardTitle, Table,Alert} from "reactstrap";
import picklelogo from '../../assets/img/main_logo.png'
import io from 'socket.io-client'
import axios from "axios";
import {connect} from "react-redux";

const studentStreamingTypes = {REQUEST: "studentStreaming/REQUEST",
                                                                 GETFILE :"studentStreaming/GETFILE",
                                                                DOWNLOAD : "studentStreaming/DOWNLOAD",
                                                                ATTEND : "studentStreaming/ATTEND"}

const studentStreamingRequest = (data) => ({type: studentStreamingTypes.REQUEST, payload: data})
const studentStreamingGetFile = (data) => ({type: studentStreamingTypes.GETFILE, payload: data})
const studentStreamingDownloadFile = (data) => ({type: studentStreamingTypes.DOWNLOAD, payload: data})
const studentStreamingAttend = (data) => ({type: studentStreamingTypes.ATTEND, payload: data})
export const studentStreamingReducer = ( state = {classCode : "", studentList : [], lectureMeterialList:[]}, action) => {
    switch (action.type){
        case studentStreamingTypes.REQUEST: return {...state, classCode: action.payload.classCode, studentList: action.payload.studentList}
        case studentStreamingTypes.GETFILE : return {...state, lectureMeterialList :action.payload.fileList}
        case studentStreamingTypes.DOWNLOAD : return {...state}
        case studentStreamingTypes.ATTEND : return {...state}
        default: return state
    }
}

const studentStreamingApis = () => dispatch => {
    axios.get(`http://localhost:5000/streamings/student/100018001`)
        .then(({data})=>{
            dispatch(studentStreamingRequest(data))
        })
        .catch(error => {throw (error)})
}
const fileListApis = ()=>dispatch => {
    axios.get(`http://localhost:5000/file/list/subject/1`)
        .then(({data})=>{
            dispatch(studentStreamingGetFile(data))
        })
}
const fileDownloadApis = (fileId, fileName)=> {
    axios.get(`http://localhost:5000/file/download/${fileId}`,{
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    }).then(res =>{
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    })
}
const studentAttendApis = ()=> dispatch =>{
    axios.get(`http://localhost:5000/streamings/student/attend/100018001}`)
        .then(()=>{
          dispatch(studentStreamingAttend())
        })
}
export class studentStreaming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peer: null,
            localStream: null,
            remoteStream : null,
            pcConfig : {'iceServers' : [{urls: 'stun:stun.l.google.com:19302'},
                    {urls:  'turn:numb.viagenie.ca', credential : "muazkh", username : "webrtc@live.com"}]},
            studentCode : "100018002",
            localStreamAdded : false,
            firstVisible : false,
            additionalVisible : false
        }
        this.localVideoRef = React.createRef();
        this.remoteVideoRef = React.createRef();
        this.socket = io.connect('https://secret-dawn-11778.herokuapp.com/')
        this.sendMessage = this.sendMessage.bind(this)
        this.handleOffer = this.handleOffer.bind(this)
        this.handleNewICECandidateMsg = this.handleNewICECandidateMsg.bind(this)
        this.setRemoteTrack = this.setRemoteTrack.bind(this)
        this.iceCandidateHandler = this.iceCandidateHandler.bind(this)
    }
    componentDidMount() {
        this.props.studentAttendApis()
        this.props.studentStreamingApis()
        this.props.fileListApis()
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
                this.localVideoRef.current.srcObject = stream
                this.setState({localStream : stream})
                this.socket.emit('joinRoom', {roomName : "Kor112", code : this.state.studentCode})
            })
        this.setState({firstVisible : true})
        window.setTimeout(()=>{   this.setState({firstVisible : false}) },2000)
        this.socket.on('recOffer', message=>{
            console.log(`receive offer from teacher`)
            this.handleOffer(message)
        })
        this.socket.on('recCandidate', message=>{
            this.handleNewICECandidateMsg(message)
        })
    }
    componentWillUnmount() {
        this.setState({additionalVisible : true})
        window.setTimeout(()=>{   this.setState({additionalVisible : false}) },2000)
        if (this.state.peer){
            this.state.peer.close()
        }

    }

    sendMessage(message){
        this.socket.emit('message', message)
    }
    handleOffer(message){
        console.log("callee receive offer")
        let {peer, localStream} = this.state
        peer = new RTCPeerConnection(this.state.pcConfig)
        localStream.getTracks().forEach(track=>peer.addTrack(track,localStream))
        peer.onicecandidate = (e)=>{this.iceCandidateHandler(e)}
        peer.ontrack = e =>{this.setRemoteTrack(e)}
        peer.setRemoteDescription(new RTCSessionDescription(message.sdp))
            .then(()=>{
                console.log(`success set remote description `)
            })
            .then(()=>{
                if (peer!=null) {
                    peer.createAnswer().then(answer => {
                        peer.setLocalDescription(answer).then(() => console.log('peer set remote description success'))
                    })
                        .then(() => {
                            this.sendMessage({
                                name: this.state.studentCode,
                                target: message.teacherCode,
                                type: "answer",
                                sdp: peer.localDescription
                            })
                        })
                }
            })
        this.setState({peer})
    }
    setRemoteTrack(e){
        console.log(`remote stream added on track`)
        if (e.streams[0]){
            this.remoteVideoRef.current.srcObject  = e.streams[0]
        }
    }
    iceCandidateHandler(e){
        if (e.candidate){
            console.log(`peer send candidate to 100000103`)
            this.sendMessage({
                name : this.state.studentCode,
                type : "candidate",
                target : "100000103",
                candidate: e.candidate
            })
        }
    }
    handleNewICECandidateMsg(message){
        let {peer} = this.state
        if (peer!=null){
            peer.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                console.log('success icecandidate added'))
            this.setState({peer})
        }
    }
    downloadFile(e,fileId,fileName){
        e.preventDefault()
        this.props.fileDownloadApis(fileId,fileName);
    }
    render() {
        return (
            <>
                <Alert color="success" isOpen={this.state.firstVisible} style={{position :"fixed", top : "0px", width : "20%", textAlign : "center", padding : "2% 2%", margin : "1% 1%"}}>
                  출석이 인정되었습니다.
                </Alert>
                <div style={{textAlign : "center"}}>
                    <img src={picklelogo} onClick={() => window.location.href="/student"}/>
                </div>
                <div className="s-streaming-container">
                    <div className="s-streaming-streaming-container">
                        <div className="s-streaming-video-container" >
                            <video ref={this.remoteVideoRef} className="s-streaming-teacher-video" autoPlay controls/></div>
                        <div className="s-streaming-comment-container">
                            <Card>
                            </Card>
                        </div>
                    </div>
                    <div className="s-streaming-items-container">
                        <div className="s-streaming-member-list-container">
                            <Card>
                                <CardTitle className="s-streaming-member-list-title">멤버 리스트</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "150px",
                                        overflow: "auto",
                                        margin : "auto"}}>
                                        <Table responsive className="s-streaming-member-list-table">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>학번</th>
                                                <th>이름</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.studentList && this.props.studentList.map((student,i)=><tr>
                                                <th scope="row">{i+1}</th>
                                                <td>{student.substring(1,10)}</td>
                                                <td>{student.substring(12,15)}</td>
                                            </tr>)}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="s-streaming-lecture-meterials-container">
                            <Card>
                                <CardTitle className="s-streaming-lecture-meterials-title">강의자료</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "150px",
                                        overflow: "auto",
                                        margin : "auto"}}>
                                        <Table  size="sm" className="s-streaming-lecture-meterials-table">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>파일명</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.lectureMeterialList && this.props.lectureMeterialList.map((lectureMeterial,i)=><tr>
                                                <th scope="row">{i+1}</th>
                                                <td>{lectureMeterial.fileName}</td>
                                                <td><div onClick={e=>{this.downloadFile(e,lectureMeterial.id,lectureMeterial.fileName)}}>다운</div></td>
                                            </tr>)}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <video ref={this.localVideoRef} autoPlay controls className="s-streaming-student-video" />
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = ({studentStreamingReducer})=>{
    const {
        classCode,
       studentList,
        lectureMeterialList,
    } = studentStreamingReducer;
    return {
        classCode,
        studentList,
        lectureMeterialList
    }
}
const connectedStudentStreaming = connect(mapStateToProps,{studentStreamingApis, fileListApis,fileDownloadApis,studentAttendApis})(studentStreaming)
export default connectedStudentStreaming