import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {ReactSortable, Sortable} from 'react-sortablejs';

import './classesMain.css'
import './subjectDetail.css'

import axios from 'axios'
import { NavLink } from 'react-router-dom'

const SubjectDetail = ({history,match}) => {
  const [basicInfo, setBasicInfo] = useState({})
  const [lessonDetail, setLessonDetail] = useState(false)
  const [lessons, setLessons] = useState([])
  const [lessonOne, setLessonOne] = useState({})
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonContent, setLessonContent] = useState('')
  const [updatedLessonTitle,setUpdatedLessonTitle] = useState('')
  const [updatedLessonContent,setUpdatedLessonContent] = useState('')
  const [lessonFile, setLessonFile] = useState('')
  const [showDefault, setShowDefault] = useState("init")
  const [numbers,setNumbers] = useState([{index : 1},{index : 2},{index : 3},{index : 4},{index : 5},{index : 6},{index : 7},{index : 8},{index : 9},{index : 10},
    {index : 11},{index : 12},{index : 13},{index : 14},{index : 15},{index : 16},{index : 17},{index : 18},{index : 19},{index : 20}])
 
  useEffect(()=>{
    getLessonList()
    getBasicInfo()
  },[])

    const getBasicInfo = () =>{
      axios
      .get(`http://localhost:5000/tsubject/basicInfo?cUserCode=${localStorage.getItem("userCode")}`)
      .then(({ data }) => {
          setBasicInfo(data.map)
      })
    }
    const getLessonList = () => {
        axios
            .get(`http://localhost:5000/tsubject/detailList/${localStorage.getItem("userCode")}`)
            .then(({data}) => {
                    setLessons(data.list)
                    
                })
            .catch(error => {throw(error)})
    };

    const updateList = async() =>{
      axios
      .post(`http://localhost:5000/tsubject/updateList/${localStorage.getItem("userCode")}`,
      { updatedList : lessons},
       {
        authorization: 'JWT fefege..',
        Accept : 'application/json',
        'Content-Type': 'multipart/form-data',
    })
      .then(() =>{
      })
      .catch(err =>{throw(err)})
    }
    
    const deleteOne = async() => {
      axios
      .get(`http://localhost:5000/tsubject/deleteOne/${localStorage.getItem("userCode")}?lessonId=${lessonOne.id}`)
      .then( 
        setLessonOne({
          id : lessonOne.id,
          lessonNo : lessonOne.lessonNo,
          lessonTitle : "",
          lessonDetail : ""
        },
        setShowDefault("init"),
        lessons.forEach(lesson =>{
          if(lesson.id == lessonOne.id){
            lesson.lessonTitle = " ";
            lesson.lessonDetail = " ";
          }
        })
        ),
      )
      .catch(err =>{ throw(err)})
    }
    const deleteAll = () =>{
      const lessonIds = []
      lessons.forEach(lesson=>{
        lessonIds.push(lesson.id)
      })
      axios
      .post(`http://localhost:5000/tsubject/deleteAll/${localStorage.getItem("userCode")}`,
      {"list" : lessonIds},
      {
        authorization: 'JWT fefege..',
        Accept : 'application/json',
        'Content-Type': 'multipart/form-data',
       })
      .then(
        lessons.forEach(lesson=>{
          lesson.lessonTitle = " ";
          lesson.lessonDetail = " ";
        }),
        setShowDefault("init"),  
        window.location.reload()    
      )
      .catch(err =>{throw(err)})
    }

    const showContent = lessonId =>{
      lessons.forEach(content =>{
          if(content.id == lessonId){
              setLessonDetail(false)
              setShowDefault("read")
              setLessonOne(content)
          }
      })
  }
  const handleCancel = () =>{
    setLessonDetail(false)
    setShowDefault("read")
  }
 
  const handleInsertLesson = () =>{
      setLessonDetail(false)
      setShowDefault("updated")
      handleUpdate()

  }
  const handleUpdate = async() =>{
    axios
      .post(`http://localhost:5000/tsubject/updateOne`,
      {userCode : localStorage.getItem("userCode"), 
       lessonId : lessonOne.id,
       lessonNo : lessonOne.lessonNo,
       lessonTitle : updatedLessonTitle,
       lessonDetail : updatedLessonContent,
       },
       {
        authorization: 'JWT fefege..',
        Accept : 'application/json',
        'Content-Type': 'multipart/form-data'
    })
      .then(
        lessons.forEach(lesson=>{
          if(lesson.id == lessonOne.id){
            lesson.lessonTitle = updatedLessonTitle;
            lesson.lessonDetail = updatedLessonContent;
          }
        })
      )
      .catch(
        err => {throw(err)})
  }
  const test = lessonOne.lessonTitle
    return (
      <>
      <PerfectScrollbar>
      <div className="classes_wrapper">

          {lessonDetail === true &&
              <div className="classes_container">
              <div className="detail_title detail_align">
                <h3 className="font_Nanum_Gothic">학습목표 수정</h3><hr/>
                <h5 className="font_Nanum_Gothic">{basicInfo.userName}과 {lessonOne.lessonNo}차시</h5>
              </div>
              <textarea id="lesson_title_input" 
              className="detail_title detail_align"
              defaultValue={lessonOne.lessonTitle} 
              onChange={e => setUpdatedLessonTitle(e.target.value)}
               >

              </textarea>
              <textarea 
              className="detail_content" 
              onChange={e => setUpdatedLessonContent(e.target.value)} 
              defaultValue={lessonOne.lessonDetail}>
              </textarea> 
            <button className="timetable_button detail_pointer" onClick={handleInsertLesson}>학습목표 수정</button>
            <button className="timetable_button detail_pointer" onClick={handleCancel}>취소</button>
          </div>
          }
          {lessonDetail === false &&
            <div className="classes_container ">
              <div>{basicInfo.subjectName}과 {lessonOne.lessonNo}차시</div>
                <div className="detail_title detail_align detail_border ">
                  {showDefault == "init" && <div style={{whiteSpace: "pre-line", textAlign:"left"}}>{lessonOne.lessonTitle}</div>}
                  {showDefault == "read" && <div style={{whiteSpace: "pre-line", textAlign:"left"}}>{lessonOne.lessonTitle}</div>}
                  {showDefault == "updated" && <div style={{whiteSpace: "pre-line", textAlign:"left"}}>{updatedLessonTitle}</div>}
                </div>
                <div className="detail_title detail_border ">

                  </div>

                <div className="detail_content detail_border detail_margin ">
                <PerfectScrollbar>
                  {showDefault == "init" && <p>차시를 선택하세요</p> } 
                  {showDefault == "read" && <p style={{whiteSpace: "pre-line", textAlign:"left"}}>{lessonOne.lessonDetail}</p>}
                  {showDefault == "updated" && <p style={{whiteSpace: "pre-line", textAlign:"left"}}>{updatedLessonContent}</p>}
                </PerfectScrollbar>
                </div>
                {/* <div>
                    <img className="detail_icon detail_pointer" onClick={()=>{setLessonDetail(!lessonDetail)}} src="https://www.kindpng.com/picc/b/112/1121065.png"/>
                </div> */}
                <div style={{textAlign:"center", display:"flex"}} >
                   <NavLink to={`${match.url}/class`} style={{width:"50%"}}>
                   <button style={{width :'60%',float:"right", marginTop:"1.5rem" ,marginRight:"0.3rem" }} className="timetable_button detail_pointer">목록으로</button>
                   </NavLink>
                   <button style={{width :'30%', float:"left", marginTop:"1.5rem",marginLeft:"0.3rem"}} className="timetable_button detail_pointer" 
                   onClick={()=>setLessonDetail(true)}>수정하기</button>
                </div>
             </div>
          }
          <div className="classes_container" >
          
            <div style={{height:"450px"}}>
            <PerfectScrollbar>
            <div style={{float:"left",width : "10%",padding: "0.5rem"}}>
              <div>
                <ReactSortable
                sort={false}
                list = {numbers} setList={setNumbers}>
                {numbers.map((item,i) =>(
                  <div className="lessons_item_container" key={i}>{item.index}</div>
                ))}
                </ReactSortable>
              </div>
            </div>
              <div className="detail_list" style={{float:"left"}}>
                
                <ReactSortable 
                chosenClass={"sortable-chosen"}
                dataIdAttr ={lessons.i}
                list={lessons} setList={setLessons} >
                    {lessons.map((item,i) =>(
                        <div className="lessons_item_container" key={item.lessonNo} onClick={()=>showContent(item.id)} >{item.lessonTitle}</div>
                    ))}
                 </ReactSortable>
              </div>
              </PerfectScrollbar>

              </div>

              <div className="button_container attendance_margin">
                  <div>
                    <button onClick={updateList} className="timetable_button detail_pointer" >Modify</button>
                    <button onClick={deleteOne} className="timetable_button detail_pointer" >Delete</button>
                    <button onClick={deleteAll} className="timetable_button detail_pointer" >Delete All</button>
                  </div>

                  <div style={{margin:"0.4rem"}}>
                      <p></p>
                  </div>

                  <button className="streaming_button"><NavLink to="/teacherstreaming">CREATE</NavLink></button>
              </div>
          </div>

      </div>
      </PerfectScrollbar>
      </>
    )

};

export default SubjectDetail;