import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {ReactSortable, Sortable,Swap,MultiDrag} from 'react-sortablejs'
import {FormGroup, Table} from "reactstrap";
import {useSelector, useDispatch} from 'react-redux'

import './dndTimetable.css'
import '../classesMain.css'

const timetableType = {SET_TIMETABLE : 'classes/SET_TIMETABLE'}
export const setTimetableReducer = action =>({type : timetableType.SET_TIMETABLE, lessons :action})
export const tTimetableReducer = (state = {}, action) =>{
  switch(action.type) {
    case timetableType.SET_TIMETABLE : return {...state, lessons : action}
    default: return state
  }
}

const Timetable = () => {
    const [basicInfo, setBasicInfo] = useState({});
    const [showModal,setShowModal] = useState(false)
    const userCode = localStorage.getItem("userCode")
    const [monday,setMonday] = useState([])
    const [tuesday,setTuesday] = useState([])
    const [wednesday,setWednesday] = useState([])
    const [thursday,setThursday] = useState([])
    const [friday,setFriday] = useState([])
    const [timetable, setTimetable] = useState([])
    const [selectedOne, setSelectedOne] = useState([])
    const [updatedtable, setUpdatedtable] = useState({})
    const dispatch = useDispatch()

    const timetablewInfo = () =>{
        axios
        .get(`http://localhost:5000/tschedule/dndTimetable/${userCode}`)
        .then(res =>{
            dispatch(setTimetableReducer(res.data.list))
            setMonday(res.data.list.dndMon)
            setTuesday(res.data.list.dndTue)
            setWednesday(res.data.list.dndWed)
            setThursday(res.data.list.dndThu)
            setFriday(res.data.list.dndFri)
        })
        .catch(err =>{throw(err)})

        axios
            .get(`http://localhost:5000/tschedule/dndTimetable/${userCode}`)
            .then(res => {
                const allSchedule = [];
                const first = [];
                const second = [];
                const third = [];
                const forth = [];
                const fifth = [];
                const sixth = [];
                Object.entries(res.data.list).forEach(([key, value]) => {
                    first.push(value[0]);
                    second.push(value[1]);
                    third.push(value[2]);
                    forth.push(value[3]);
                    fifth.push(value[4]);
                    sixth.push(value[5]);
                })
                allSchedule.push(first, second, third, forth, fifth, sixth)
                setTimetable(allSchedule);
            })

        axios
            .get(`http://localhost:5000/tsubject/basicInfo?cUserCode=${userCode}`)
            .then(res =>{
                setBasicInfo(res.data.map)
            })
            .catch(err =>{throw(err)})
    }
    const handleDeleteOne = (period) =>{
        setShowModal(true)
        setSelectedOne(period)
     }
    const goDBDelete = (period) =>{
        setShowModal(false);
        axios
            .post(`http://localhost:5000/tschedule/deleteOne/${userCode}`,
                {id: period.id,
                    day : period.day,
                    period: period.period,
                    subjectCode : "",
                    subjectName : "-"},
                {authorization: 'JWT fefege..',
                    Accept : 'application/json',
                    'Content-Type': 'multipart/form-data',
                })
            .then(()=>deleteSwitch(period.day)
            )
            .catch(err =>{throw(err)})
        window.location.reload()

    }
    const goDBCreate = (period) =>{
        setSelectedOne(period)
        axios
            .post(`http://localhost:5000/tschedule/deleteOne/${userCode}`,
                {id: period.id,
                    day : period.day,
                    period: period.period,
                    subjectCode : basicInfo.subjectCode,
                    subjectName : basicInfo.subjectName},
                {authorization: 'JWT fefege..',
                    Accept : 'application/json',
                    'Content-Type': 'multipart/form-data',
                })
            .then(()=>createSwitch(period.day),
        window.location.reload()

    )
            .catch(err => {throw(err)})

    }
    const deleteSwitch = (period) =>{
        switch(period.day){
            case "mon" : monday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = "";
                    period.subjectName = "-";
                }
            }); break;
            case "tue" :  tuesday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = "";
                    period.subjectName = "-";
                }
            }); break;
            case "wed" :  wednesday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = "";
                    period.subjectName = "-";
                }
            }); break;
            case "thur" :  thursday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = "";
                    period.subjectName = "-";
                }
            }); break;
            case "fri" :  friday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = "";
                    period.subjectName = "-";
                }
            }); break;
        }
    } 
    const createSwitch = (period) =>{
        switch(period.day){
            case "mon" : monday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = basicInfo.subjectCode;
                    period.subjectName = basicInfo.subjectName;
                }
            }); break;
            case "tue" :  tuesday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = basicInfo.subjectCode;
                    period.subjectName = basicInfo.subjectName;
                }
            }); break;
            case "wed" :  wednesday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = basicInfo.subjectCode;
                    period.subjectName = basicInfo.subjectName;
                }
            }); break;
            case "thur" :  thursday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = basicInfo.subjectCode;
                    period.subjectName = basicInfo.subjectName;
                }
            }); break;
            case "fri" :  friday.forEach(period =>{
                if(period.id == selectedOne.id){
                    period.subjectCode = basicInfo.subjectCode;
                    period.subjectName = basicInfo.subjectName;
                }
            }); break;
        }
    } 

    const updateSchedule = () => {
        const jmon = []
        const jtue = []
        const jwed = []
        const jthu = []
        const jfri = []
        monday.forEach(period =>{
            jmon.push(period.subjectCode)
        })
        tuesday.forEach(period=>{
            jtue.push(period.subjectCode)
        })
        wednesday.forEach(period=>{
            jwed.push(period.subjectCode)
        })
        thursday.forEach(period=>{
            jthu.push(period.subjectCode)
        })
        friday.forEach(period=>{
            jfri.push(period.subjectCode)
        })

        axios
        .post(`http://localhost:5000/tschedule/updateSchedule/${userCode}`,
        {payload:
            {mon : jmon,
            tue : jtue,
            wed : jwed,
            thu : jthu,
            fri : jfri}
        },
        {
            authorization: 'JWT fefege..',
            Accept : 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        .then(
        )
        .catch(error =>{throw(error)})
    }

    useEffect(()=>{
        timetablewInfo()
    },[])
    
    return (
        <>
            {showModal === true &&
                <>
            <div className="Modal-overlay"/>
                <div className="Modal">
                    <p className="title">{selectedOne.subjectName}</p>
                    <div className="content">
                        <div>
                        <FormGroup>
                            <p>삭제하시겠습니까?</p>
                        </FormGroup>
                        </div>
                    </div>
                    <div className="button-wrap">
                        <button onClick={() => setShowModal(false)}> Cancel</button>
                        <button onClick={() => goDBDelete(selectedOne)}> Confirm</button>
                    </div>
                </div>
        </>}

        <div className="timetable_wrapper">

        <div className="timetable_container" style={{width:"30%"}}>
             <table className="schedule_table">
                 <thead>
                 <tr>
                     <td></td>
                     <td className="table_head">MON</td>
                     <td className="table_head">TUE</td>
                     <td className="table_head">WED</td>
                     <td className="table_head">THU</td>
                     <td className="table_head">FRI</td>
                 </tr>
                 </thead>
                 <tbody>
                 {timetable.map((arr, i) => {
                     return (
                         <tr key={i}>
                             <td className="table_head">{i + 1}</td>
                             {arr.map((period,i) => <td className="empty_cube" key={i}>{period.subjectName}</td>)}
                         </tr>
                     )
                 })}
                 </tbody>
                </table>
             </div>
            <div className="timetable_container" style={{width:"65%"}}>
                <div className="dnd_container"> </div>
                <ReactSortable className="column"
                group = {"day"}
                swap="true"
                connectedSortable
                chosenClass="sortable-chosen"
                list={monday} setList={setMonday}
                >
                    {monday.map((item,i) =>(
                        <div className="lessons_item_container" key={i}>{item.subjectName}
                        {item.subjectName == "-"? 
                        <button className="tr_state_button" style={{backgroundColor:"#2c4d6e"}} onClick={()=>goDBCreate(item)}>create</button>:
                        <button className="tr_state_button" style={{backgroundColor:"rgb(238, 168, 168)", border:"1px solid rgb(248, 103, 103)"}}onClick={() => handleDeleteOne(item)}>delete</button>}
                        
                        </div>
                ))}
                </ReactSortable> 
                <ReactSortable className="column"
                group = {"day"}
                swap="true"
                connectedSortable
                direction="vertical"
                list={tuesday} setList={setTuesday} >
                    {tuesday.map((item,i) =>(
                        <div className="lessons_item_container" key={i}>{item.subjectName}
                        {item.subjectName == "-"? 
                        <button className="tr_state_button" style={{backgroundColor:"#2c4d6e"}} onClick={()=>goDBCreate(item)}>create</button>:
                        <button className="tr_state_button" style={{backgroundColor:"rgb(238, 168, 168)", border:"1px solid rgb(248, 103, 103)"}}onClick={()=>handleDeleteOne(item)}>delete</button>}
                        </div>
                ))}
                </ReactSortable>
                <ReactSortable className="column"
                group = {"day"}
                swap="true"
                connectedSortable
                direction="vertical"
                list={wednesday} setList={setWednesday} >
                    {wednesday.map((item,i) =>(
                        <div className="lessons_item_container" key={i}>{item.subjectName}
                        {item.subjectName == "-"? 
                        <button className="tr_state_button" style={{backgroundColor:"#2c4d6e"}} onClick={()=>goDBCreate(item)}>create</button>:
                        <button className="tr_state_button" style={{backgroundColor:"rgb(238, 168, 168)", border:"1px solid rgb(248, 103, 103)"}} onClick={()=>handleDeleteOne(item)}>delete</button>}
                        </div>
                ))}</ReactSortable>
                <ReactSortable className="column"
                group = {"day"}
                swap="true"
                swapThreshold="1"
                direction="vertical"
                list={thursday} setList={setThursday} >
                    {thursday.map((item,i) =>(
                        <div className="lessons_item_container" key={i}>{item.subjectName}
                        {item.subjectName == "-"? 
                        <button className="tr_state_button" style={{backgroundColor:"#2c4d6e"}} onClick={()=>goDBCreate(item)}>create</button>:
                        <button className="tr_state_button" style={{backgroundColor:"rgb(238, 168, 168)", border:"1px solid rgb(248, 103, 103)"}} onClick={()=>handleDeleteOne(item)}>delete</button>}
                        </div>
                ))}</ReactSortable>
                <ReactSortable className="column"
                               group = {"day"}
                               swap="true"
                               connectedSortable
                               direction="horizontal"
                               direction="vertical"
                               list={friday} setList={setFriday} >
                    {friday.map((item,i) =>(
                        <div className="lessons_item_container" key={i}>{item.subjectName}
                            {item.subjectName == "-"?
                                <button className="tr_state_button" style={{backgroundColor:"#2c4d6e"}} onClick={()=>goDBCreate(item)}>create</button>:
                                <button className="tr_state_button" style={{backgroundColor:"rgb(238, 168, 168)", border:"1px solid rgb(248, 103, 103)"}} onClick={()=>handleDeleteOne(item)}>delete</button>}
                        </div>
                    ))}</ReactSortable>
                <div ><button className="modify_button" onClick={()=>updateSchedule()}>Modify</button></div>

            </div>

            </div>
        </>
    );
};

export default Timetable;

