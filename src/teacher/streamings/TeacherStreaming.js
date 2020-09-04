import React, {Component, createRef} from 'react';
import "react-perfect-scrollbar/dist/css/styles.css";
import {Table, Card, CardBody, CardTitle, Button, Alert} from "reactstrap";
import './t-streaming.css'
import picklelogo from '../../assets/img/main_logo.png'
import io from 'socket.io-client'
import {connect} from "react-redux";
import axios from 'axios'

const teacherStreamingTypes = {REQUEST: "teacherStreaming/REQUEST",
                                                                POST : "teacherStreaming/POST",
                                                                GETFILE :"teacherStreaming/GETFILE",
                                                                DOWNLOAD : "teacherStreaming/DOWNLOAD",
                                                                DELETE : "teacherStreaming/DELETE"}
const teacherStreamingRequest = (data) => ({type: teacherStreamingTypes.REQUEST, payload: data})
const teacherStreamingPost = (data) => ({type: teacherStreamingTypes.POST, payload: data})
const teacherStreamingGetFile = (data) => ({type: teacherStreamingTypes.GETFILE, payload: data})
const teacherStreamingDownloadFile = (data) => ({type: teacherStreamingTypes.DOWNLOAD, payload: data})
const teacherStreamingDeleteFile = (data)=> ({type : teacherStreamingTypes.DELETE, payload : data})
export const teacherStreamingReducer = ( state = {classCode : "", studentList : [], lectureMeterialList : []}, action ) => {
    switch (action.type){
        case teacherStreamingTypes.REQUEST: return {...state,  classCode: action.payload.classCode, studentList: action.payload.studentList}
        case teacherStreamingTypes.POST : return {...state}
        case teacherStreamingTypes.GETFILE : return {...state, lectureMeterialList :action.payload.fileList}
        case teacherStreamingTypes.DOWNLOAD : return {...state}
        case teacherStreamingTypes.DELETE : return {...state}
        default: return state
    }
}
const teacherStreamingApis = () => dispatch => {
    axios.get(`http://localhost:5000/streamings/teacher/100000301`)
        .then(({data})=>{
            dispatch(teacherStreamingRequest(data))
        })
        .catch(error => {throw (error)})
}
const fileListApis = ()=>dispatch => {
    axios.get(`http://localhost:5000/file/list/subject/1`)
        .then(({data})=>{
            dispatch(teacherStreamingGetFile(data))
        })
}
const postApis = (payload)=> dispatch =>{
    axios.post(`http://localhost:5000/file/upload/null/1`,payload,{
        authorization: 'JWT fefege..',
        Accept : 'application/json',
        'Content-Type': 'multipart/form-data'
    })
        .then(res=>
            dispatch(teacherStreamingPost(res.data))
        )
}
const fileDownloadApis = (fileId, fileName)=>dispatch => {
    console.log(`fileDownloadApis ${fileId}`)
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
const fileDeleteApis = (fileId)=>dispatch =>{
    axios.get(`http://localhost:5000/file/delete/${fileId}`)
        .then(res=>{
            dispatch(teacherStreamingDeleteFile())
        })
}
class TeacherStreaming extends Component{
    constructor(props) {
        super(props);
        this.state = {
            videoProps : [{poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif",ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student :""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", ref : createRef(), student : ""}],
            nowPageProps : [],
            nowPage : 0,
            noPrev : false,
            noNext : false,
            peers : {peer1 : null, peer2 : null, peer3 :null, peer4 : null, peer5 : null, peer6 : null},
            localStream: null,
            remoteStreams : {remoteStream1 : null, remoteStream2: null, remoteStream3 : null, remoteStream4: null, remoteStream5: null},
            pcConfig : {'iceServers' : [{urls: 'stun:stun.l.google.com:19302'},
                    {urls: 'turn:numb.viagenie.ca', credential : "muazkh", username : "webrtc@live.com"}]},
            classCode : "Kor112",
            teacherCode :"100000103", // 1000은 학교코드 00은 선생식별 103은 담당학년반
            selectedFile : null,
            attendanceRate : 0,
            visible : false,
            attendCode : "",
            studentList : [],

        }
        this.localVideoRef = React.createRef();
        this.socket = io.connect('https://secret-dawn-11778.herokuapp.com/')
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.offer = this.offer.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleIceCandidateMsg = this.handleIceCandidateMsg.bind(this)
        this.iceCandidateHandler = this.iceCandidateHandler.bind(this)
        this.setRemoteTrack= this.setRemoteTrack.bind(this)
        this.handlePost = this.handlePost.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
        this.deleteFile = this.deleteFile.bind(this)
    }

    componentDidMount() {
        this.props.teacherStreamingApis();
        this.props.fileListApis();
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
                this.localVideoRef.current.srcObject = stream;
                this.setState({localStream: stream})
            })
        this.setState({nowPageProps: this.state.videoProps.slice(0,6)})
        this.socket.emit('joinRoom', {roomName : "Kor112", code: this.state.teacherCode})
        this.socket.on('letOffer',data=>{
            console.log(`receive start offer message from server code ${data.studentCode}`)
            const {localStream} = this.state
            switch (data.studentCode) {
                case "100018001":
                    let {peer1} = this.state.peers
                    peer1 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer1.addTrack(track,localStream))
                    peer1.onicecandidate = (e) => {
                        this.iceCandidateHandler(e,peer1)
                        console.log(`caller send icecandidate message to 100018001`)
                    }
                    peer1.ontrack = e=> {
                        this.setRemoteTrack(e,peer1)
                    }
                    this.setState({peers : {peer1}})
                    break;
                case "100018002":
                    let {peer2} = this.state.peers
                    peer2 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer2.addTrack(track,localStream))
                    peer2.onicecandidate = e => {
                        this.iceCandidateHandler(e,peer2)
                        console.log(`caller send icecandidate message to 100018002`)
                    }
                    peer2.ontrack = e=> {
                        this.setRemoteTrack(e,peer2)
                    }
                    this.setState({peers : {peer2}})
                    break;
                case "100018003":
                    let {peer3} = this.state.peers
                    peer3 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer3.addTrack(track,localStream))
                    peer3.onicecandidate = (e) => {
                        this.iceCandidateHandler(e,peer3)
                        console.log(`caller send icecandidate message to 100018003`)
                    }
                    peer3.ontrack = e=> {
                        this.setRemoteTrack(e,peer3)
                    }
                    this.setState({peers : {peer3}})
                    break;
                case "100018004":
                    let {peer4} = this.state.peers
                    peer4 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer4.addTrack(track,localStream))
                    peer4.onicecandidate = (e) => {
                        this.iceCandidateHandler(e,peer4)
                        console.log(`caller send icecandidate message to 100018004`)
                    }
                    peer4.ontrack = e=> {
                        this.setRemoteTrack(e,peer4)
                    }
                    this.setState({peers : {peer4}})
                    break;
                case "100018005":
                    let {peer5} = this.state.peers
                    peer5 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer5.addTrack(track,localStream))
                    peer5.onicecandidate = (e) => {
                        this.iceCandidateHandler(e,peer5)
                        console.log(`caller send icecandidate message to 100018005`)
                    }
                    peer5.ontrack = e=> {
                        this.setRemoteTrack(e,peer5)
                    }
                    this.setState({peers : {peer5}})
                    break;
                case "100018006":
                    let {peer6} = this.state.peers
                    peer6 = new RTCPeerConnection(this.state.pcConfig)
                    localStream.getTracks().forEach(track=>peer6.addTrack(track,localStream))
                    peer6.onicecandidate = (e) => {
                        this.iceCandidateHandler(e,peer6)
                        console.log(`caller send icecandidate message to 100018006`)
                    }
                    peer6.ontrack = e=> {
                        this.setRemoteTrack(e,peer6)
                    }
                    this.setState({peers : {peer6}})
                    break;
            }
            this.setState({localStream})
            this.offer(data)
        })
        this.socket.on('recAnswer', message=>{
            switch (message.studentCode) {
                case "100018001":
                    let {peer1} = this.state.peers
                    if (peer1 !==null){
                        peer1.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(r =>
                            console.log(`success remotedescription set on peer1`))
                            .catch(e=>console.log(e))
                        this.setState({peers : {peer1}, attendanceRate : this.state.attendanceRate+1, visible : true, attendCode :100018001})
                        window.setTimeout(()=>{   this.setState({visible : false}) },2000)
                    }
                    break;
                case "100018002":
                    let {peer2} = this.state.peers
                    if (peer2 !=null){
                        peer2.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                            console.log(`success remotedescription set on peer2`))
                            .catch(e=>console.log(e))
                        this.setState({peers : {peer2}, attendanceRate : this.state.attendanceRate+1, visible : true, attendCode :100018002})
                        window.setTimeout(()=>{   this.setState({visible : false}) },2000)
                    }
                    break;
                case "100018003":
                    let {peer3} = this.state.peers
                    if (peer3!==null){
                        peer3.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                            console.log(`success remotedescription set on peer3`))
                            .catch(e=>console.log(e))
                        this.setState({peers : {peer3}, attendanceRate : this.state.attendanceRate+1, visible : true, attendCode :100018003})
                        window.setTimeout(()=>{   this.setState({visible : false}) },2000)
                    }
                    break;
                case "100018004":
                    let {peer4} = this.state.peers
                    if (peer4!==null){
                        peer4.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                            console.log(`success remotedescription set on peer4`))
                            .catch(e=>console.log(e))
                        this.setState({peers : {peer4}, attendanceRate : this.state.attendanceRate+1, visible : true, attendCode :100018004})
                        window.setTimeout(()=>{   this.setState({visible : false}) },2000)
                    }
                    break;
                case "100018005":
                    let {peer5} = this.state.peers
                    if (peer5!==null){
                        peer5.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                            console.log(`success remotedescription set on peer5`))
                            .catch(e=>console.log(e))
                        this.setState({peers : {peer5}, attendanceRate : this.state.attendanceRate+1, visible : true, attendCode :100018005})
                        window.setTimeout(()=>{   this.setState({visible : false}) },2000)
                    }
                    break;
                case "100018006":
                    let {peer6} = this.state.peers
                    if(peer6!==null){
                        peer6.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                            console.log(`success remotedescription set on peer6`))
                            .catch(e=>console.log(e))
                        this.setState({peers : {peer6}, attendanceRate : this.state.attendanceRate+1, visible : true , attendCode :100018006})
                        window.setTimeout(()=>{   this.setState({visible : false}) },2000)
                    }
                    break;
            }
        })
        this.socket.on('recCandidate', message=>{
            this.handleIceCandidateMsg(message)
        })
    }
    componentWillUnmount() {
        if (this.state.peers.peer1 && this.state.peers.peer2 && this.state.peers.peer3&& this.state.peers.peer4&& this.state.peers.peer5&& this.state.peers.peer6){
            this.state.peers.peer1.close()
            this.state.peers.peer2.close()
            this.state.peers.peer3.close()
            this.state.peers.peer4.close()
            this.state.peers.peer5.close()
            this.state.peers.peer6.close()
        }
    }

    setRemoteTrack(e,peer){
        const {peer1, peer2, peer3, peer4, peer5, peer6} = this.state.peers
        if (e.streams[0]){
            switch (peer) {
                case peer1 :
                    this.state.videoProps[0].ref.current.srcObject =e.streams[0]
                    break;
                case peer2 :
                    this.state.videoProps[1].ref.current.srcObject =e.streams[0]
                    break;
                case peer3 :
                    this.state.videoProps[2].ref.current.srcObject =e.streams[0]
                    break;
                case peer4 :
                    this.state.videoProps[3].ref.current.srcObject =e.streams[0]
                    break;
                case peer5 :
                    this.state.videoProps[4].ref.current.srcObject =e.streams[0]
                    break;
                case peer6 :
                    this.state.videoProps[5].ref.current.srcObject =e.streams[0]
                    break;
            }
        }
    }
    handleIceCandidateMsg(message){
        switch (message.name) {
            case "100018001" :
                const {peer1} = this.state.peers
                if (peer1!==null){
                    peer1.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                        console.log('success icecandidate added'))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer1}})
                }

                break;
            case "100018002" :
                const {peer2} = this.state.peers
                if (peer2!==null){
                    peer2.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                        console.log('success icecandidate added'))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer2}})
                }

                break;
            case "100018003" :
                const {peer3} = this.state.peers
                if (peer3!==null){
                    peer3.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                        console.log('success icecandidate added'))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer3}})
                }

                break;
            case "100018004" :
                const {peer4} = this.state.peers
                if (peer4!==null){
                    peer4.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                        console.log('success icecandidate added'))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer4}})
                }

                break;
            case "100018005" :
                const {peer5} = this.state.peers
                if (peer5!==null){
                    peer5.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                        console.log('success icecandidate added'))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer5}})
                }

                break;
            case "100018006" :
                const {peer6} = this.state.peers
                if (peer6!==null){
                    peer6.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                        console.log('success icecandidate added'))
                        .catch(e=>console.log(e))
                    this.setState({peers : {peer6}})
                }

                break;
        }
    }
    sendMessage(message){
        this.socket.emit('message',message)
    }
    iceCandidateHandler(e,peer) {
        const {peer1, peer2, peer3, peer4, peer5, peer6} = this.state.peers
        if (e.candidate) {
            switch (peer) {
                case peer1 :
                    this.sendMessage({
                        type: "candidate",
                        target: "100018001",
                        candidate: e.candidate
                    })
                    break;
                case peer2 :
                    this.sendMessage({
                        type: "candidate",
                        target: "100018002",
                        candidate: e.candidate
                    })
                    break;
                case peer3 :
                    this.sendMessage({
                        type: "candidate",
                        target: "100018003",
                        candidate: e.candidate
                    })
                    break;
                case peer4 :
                    this.sendMessage({
                        type: "candidate",
                        target: "100018004",
                        candidate: e.candidate
                    })
                    break;
                case peer5 :
                    this.sendMessage({
                        type: "candidate",
                        target: "100018005",
                        candidate: e.candidate
                    })
                    break;
                case peer6 :
                    this.sendMessage({
                        type: "candidate",
                        target: "100018006",
                        candidate: e.candidate
                    })
                    break;
            }
        }
    }

    offer(data){
        switch (data.studentCode) {
            case "100018001":
                let {peer1} = this.state.peers
                if (peer1!==null){
                    peer1.createOffer().then(offer=>{
                        peer1.setLocalDescription(offer)
                            .then(()=>{
                                console.log("peer1 set local description success")
                            })
                            .catch(e=>{
                                console.log(e)
                            })})
                        .then(()=>{
                            this.sendMessage({
                                name : this.state.teacherCode,
                                target :data.studentCode,
                                type : "offer",
                                sdp : peer1.localDescription
                            })
                        })
                    this.setState({peers : {peer1}})
                }

                break;
            case "100018002" :
                let {peer2} = this.state.peers
                if (peer2!==null){
                    peer2.createOffer().then(offer=>{
                        peer2.setLocalDescription(offer)
                            .then(()=>{
                                console.log("peer2 set local description success")
                            })
                            .catch(e=>{
                                console.log(e)
                            })})
                        .then(()=>{
                            this.sendMessage({
                                name : this.state.teacherCode,
                                target :data.studentCode,
                                type : "offer",
                                sdp : peer2.localDescription
                            })
                        })
                    this.setState({peers : {peer2}})
                }
                break
            case "100018003" :
                let {peer3} = this.state.peers
                if (peer3!==null){
                    peer3.createOffer().then(offer=>{
                        peer3.setLocalDescription(offer)
                            .then(()=>{
                                console.log("peer3 set local description success")
                            })
                            .catch(e=>{
                                console.log(e)
                            })})
                        .then(()=>{
                            this.sendMessage({
                                name : this.state.teacherCode,
                                target :data.studentCode,
                                type : "offer",
                                sdp : peer3.localDescription
                            })
                        })
                    this.setState({peers : {peer3}})
                }

                break
            case "100018004" :
                let {peer4} = this.state.peers
                if (peer4!==null){
                    peer4.createOffer().then(offer=>{
                        peer4.setLocalDescription(offer)
                            .then(()=>{
                                console.log("peer4 set local description success")
                            })
                            .catch(e=>{
                                console.log(e)
                            })})
                        .then(()=>{
                            this.sendMessage({
                                name : this.state.teacherCode,
                                target :data.studentCode,
                                type : "offer",
                                sdp : peer4.localDescription
                            })
                        })
                    this.setState({peers : {peer4}})
                }
                break
            case "100018005" :
                let {peer5} = this.state.peers
                if (peer5!==null){
                    peer5.createOffer().then(offer=>{
                        peer5.setLocalDescription(offer)
                            .then(()=>{
                                console.log("peer5 set local description success")
                            })
                            .catch(e=>{
                                console.log(e)
                            })})
                        .then(()=>{
                            this.sendMessage({
                                name : this.state.teacherCode,
                                target :data.studentCode,
                                type : "offer",
                                sdp : peer5.localDescription
                            })
                        })
                    this.setState({peers : {peer5}})
                }
                break
            case "100018006" :
                let {peer6} = this.state.peers
                if (peer6!==null){
                    peer6.createOffer().then(offer=>{
                        peer6.setLocalDescription(offer)
                            .then(()=>{
                                console.log("peer6 set local description success")
                            })
                            .catch(e=>{
                                console.log(e)
                            })})
                        .then(()=>{
                            this.sendMessage({
                                name : this.state.teacherCode,
                                target :data.studentCode,
                                type : "offer",
                                sdp : peer6.localDescription
                            })
                        })
                    this.setState({peers : {peer6}})
                }
                break
        }
    }
    nextPage(){
        this.setState({nowPageProps : this.state.videoProps.slice((this.state.nowPage+1)*6,(this.state.nowPage+1)*6+6),nowPage : this.state.nowPage+1})
    }
    prevPage(){
        this.setState({nowPageProps : this.state.videoProps.slice((this.state.nowPage-1)*6,(this.state.nowPage-1)*6+6), nowPage : this.state.nowPage-1})
    }
    handlePost(){
        const formData = new FormData()
        formData.append('file', this.state.selectedFile)
        this.props.postApis(formData)
        this.props.fileListApis()
    }
    downloadFile(e,fileId,fileName){
        e.preventDefault()
        this.props.fileDownloadApis(fileId,fileName);

    }
    deleteFile(e,fileId){
        e.preventDefault()
        this.props.fileDeleteApis(fileId)
        this.props.fileListApis()
    }

    render() {
        return (
            <>
                <Alert color="success" isOpen={this.state.visible} style={{position :"fixed", top : "0px",width : "20%", textAlign : "center", padding : "2% 2%", margin : "1% 1%"}}>
                    학생번호 {this.state.attendCode}가 수업에 참여했습니다. <br/> 출석율 {this.state.attendanceRate*4}%
                </Alert>
                <div style={{textAlign : "center"}}>
                    <img src={picklelogo} onClick={() => window.location.href="/teacher"}/>
                </div>
                <table className="t-streaming-student-video"> <tr>
                    {this.state.nowPage!==0 ?
                        <td><Button disabled={false} onClick={this.prevPage}>이전</Button></td>:<td><Button disabled={true} onClick={this.prevPage}>이전</Button></td>
                    }
                    {this.state.nowPageProps.map((props,i)=>{
                        return (<td> <Card><p className="t-streaming-student-name"> {props.student}</p></Card>
                            <video className="t-streaming-student-video-component" autoPlay ref={props.ref} poster={props.poster}/></td>)
                    })}
                    {this.state.nowPage!==4 ?
                        <td><Button disabled={false} onClick={this.nextPage}>다음</Button></td>:<td><Button disabled={true} onClick={this.nextPage}>다음</Button></td>
                    }
                </tr>
                </table>
                <div className="t-streaming-container">
                    <div className="t-streaming-streaming-container">
                        <div className="t-streaming-video-container" >
                            <video ref={this.localVideoRef} className="t-streaming-video-component" autoPlay controls/>
                            <div className="t-streaming-comment-container">
                                <Card>
                                </Card></div>
                        </div>
                    </div>
                    <div className="t-streaming-items-container">
                        <div className="t-streaming-member-list-container">
                            <Card>
                                <CardTitle className="t-streaming-member-list-title">멤버 리스트</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "550px",
                                        overflow: "auto",
                                        margin: "auto"}}>
                                        <Table responsive className="t-streaming-member-list-table">
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
                        <div className="t-streaming-lecture-meterials-container">
                            <Card>
                                <CardTitle className="t-streaming-lecture-meterials-title">강의자료</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "80px",
                                        overflow: "auto",
                                        margin: "auto"}}>
                                        <Table size="sm" className="t-streaming-lecture-meterials-table">
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
                                                <td><div onClick={e=>{this.deleteFile(e,lectureMeterial.id)}}>삭제</div></td>
                                            </tr>)}
                                            </tbody>
                                        </Table>
                                        <input type="file" name="file" onChange={e=>this.setState({selectedFile : e.target.files[0]})}/>
                                            <button type="button" onClick={this.handlePost}>업로드</button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = ({teacherStreamingReducer})=>{
    const {
        classCode,
        studentList,
        lectureMeterialList
    } = teacherStreamingReducer;
    return {
        classCode,
        studentList,
        lectureMeterialList
    }
}
const connectedTeacherStreaming = connect(mapStateToProps,{teacherStreamingApis, postApis, fileListApis,fileDownloadApis, fileDeleteApis})(TeacherStreaming)
export default connectedTeacherStreaming