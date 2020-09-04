import React, {useEffect, useState} from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios'
import {Card, CardBody, Row, Col, Table} from 'reactstrap';
import './grades.css'
import MultiSelect from 'react-multi-select-component';
import {useDispatch} from "react-redux";
import Select from 'react-select'
import CardHeader from "reactstrap/es/CardHeader";

const LIST_GRADE = 'sGrade/LIST_GRADE'
const listAction = data => ({type: LIST_GRADE, payload:data});
export const sGradeReducer = (state = {list : []}, action) => {
    switch (action.type) {
        case LIST_GRADE: return {list : action.payload}
        default: return state
    }
}



const Grade = () => {
    const dispatch = useDispatch()
    const [selectGrade, setSelectGrade] = useState(0);
    const [selectExam, setSelectExam] = useState([]);
    const [selectSubject, setSelectSubject] = useState([]);

    const [chartDataMain , setChartDataMain] = useState({});

    const [searchDataChart1, setSearchDataChart1] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const [mainScoreList, setMainScoreList]=useState([]);
    const [userScoreList, setUserScoreList]=useState([]);
    const [allScore, setAllScore]=useState([]);


    const [kor, setKor]=useState([]);
    const [eng, setEng]=useState([]);
    const [mat, setMat]=useState([]);
    const [his, setHis]=useState([]);
    const [phl, setPhl]=useState([]);
    const [eco, setEco]=useState([]);
    const [phy, setPhy]=useState([]);
    const [bio, setBio]=useState([]);
    const [for2, setFor2]=useState([]);

    const [avgKor, setAvgKor]=useState([]);
    const [avgEng, setAvgEng]=useState([]);
    const [avgMat, setAvgMat]=useState([]);
    const [avgHis, setAvgHis]=useState([]);
    const [avgPhl, setAvgPhl]=useState([]);
    const [avgEco, setAvgEco]=useState([]);
    const [avgPhy, setAvgPhy]=useState([]);
    const [avgBio, setAvgBio]=useState([]);
    const [avgFor2, setAvgFor2]=useState([]);

    const [mainChart, setMainChart] =useState({});


    const [firstShow, setFirstShow]=useState(false);
    const [secondShow, setSecondShow]=useState(false);
    const [thirdShow, setThirdShow]=useState(false);
    const [fourthShow, setFourthShow]=useState(false);

    const [firstChart, setFirstChart]=useState([]);
    const [secondChart, setSecondChart]=useState([]);
    const [thirdChart, setThirdChart]=useState([]);
    const [fourthChart, setFourthChart]=useState([]);


    const [korC, setKorC]=useState({});
    const [engC, setEngC]=useState({});
    const [matC, setMatC]=useState({});
    const [hisC, setHisC]=useState({});
    const [phlC, setPhlC]=useState({});
    const [ecoC, setEcoC]=useState({});
    const [phyC, setPhyC]=useState({});
    const [bioC, setBioC]=useState({});
    const [for2C, setFor2C]=useState({});


    const gradeOptions = [
        { label: "1학년", value: "20"},
        { label: "2학년", value: "19"},
        { label: "3학년", value: "18"}
    ]

    const examOptions = [
        { label: "1학기 1회고사", value: "11"},
        { label: "1학기 2회고사", value: "12"},
        { label: "2학기 1회고사", value: "21"},
        { label: "2학기 2회고사", value: "22"}
    ]

    const subjectOptions = [
        { label: '국어', value: "kor"},
        { label: '영어', value: "eng"},
        { label: '수학', value: "mat"},
        { label: '한국사', value: "his"},
        { label: '생활과 윤리', value: "phl"},
        { label: '경제', value: "eco"},
        { label: '물리학', value: "phy"},
        { label: '생명과학', value: "bio"},
        { label: '제 2 외국어', value: "for"}
    ]


    const searchWord = {
        grade:selectGrade,
        exam: selectExam,
        subject: selectSubject
    }


    useEffect(()=>{
        axios.get(`http://localhost:5000/student/grade/${localStorage.getItem("userCode")}`)//여기에 로컬 스토리지에서 유저코드 들고와서 넣기;
            .then(({data})=>{
                setMainScoreList(data.sgmainChart);
                setUserScoreList(data.sguserScore);
                setKor(data.kor);
                setEng(data.eng);
                setMat(data.mat);
                setHis(data.his);
                setPhl(data.phl);
                setEco(data.eco);
                setPhy(data.phy);
                setBio(data.bio);
                setFor2(data.for2);
                setAvgKor(data.kor);
                setAvgEng(data.eng);
                setAvgMat(data.mat);
                setAvgHis(data.his);
                setAvgPhl(data.phl);
                setAvgEco(data.eco);
                setAvgPhy(data.phy);
                setAvgBio(data.bio);
                setAvgFor2(data.for2);
            })
            .catch(err=>{console.log(err);throw err;})
    },[])
    useEffect(() => {
        setMainChart({
            labels:['국어', '영어', '수학', '한국사', '생활과 윤리', '경제', '물리학', '생명과학', '제2외국어'],
            datasets:[
                {
                    label: '내 점수',
                    data: userScoreList,
                    backgroundColor:[
                        '#ecc95e','#db2c5e','#33b3f6','#f87335',
                        '#4fee8e','#f12839','#1448fd','#b7e832',
                        '#6c5df5'
                    ]
                },
                {
                    label:'과목 평균점수',
                    data:mainScoreList,
                    backgroundColor:[
                        '#ce9f0c','#801c39','#1e6387','#823d1d',
                        '#256a40','#490c11','#122c87','#5d761a',
                        '#352e74'
                    ]
                }
            ]
        })
    }, [mainScoreList,userScoreList]);

    const mainOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 10,
                }
            }]
        },
        maintainAspectRatio: false
    }
    useEffect(() => {
        setKorC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: kor,
                    borderColor:'rgba(243,198,58,0.74)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [39, 51, 38, 46, 51, 57, 49, 54, 61, 55],
                    borderColor:'rgba(99,76,4,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [kor, avgKor]);

    useEffect(() => {
        setEngC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: eng,
                    borderColor:'rgba(234,36,129,0.74)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [51, 46, 58, 46, 39, 61, 55, 34, 45, 61],
                    borderColor:'rgba(104,18,52,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [eng, avgEng]);

    useEffect(() => {
        setMatC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: mat,
                    borderColor:'rgba(33,194,215,0.74)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [38, 45, 51, 62, 59, 55, 46, 32, 62, 57],
                    borderColor:'rgba(4,45,68,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [mat, avgMat]);

    useEffect(() => {
        setHisC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: his,
                    borderColor:'rgba(243,138,58,0.74)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [51, 46, 58, 46, 39, 61, 55, 34, 45, 61],
                    borderColor:'rgba(99,37,4,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [his, avgHis]);

    useEffect(() => {
        setPhlC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: phl,
                    borderColor:'rgba(95,250,97,0.8)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [39, 51, 38, 46, 51, 57, 49, 54, 61, 55],
                    borderColor:'rgba(4,99,20,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [phl, avgPhl]);

    useEffect(() => {
        setEcoC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: eco,
                    borderColor:'rgba(222,30,30,0.58)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [42, 38, 58, 61, 39, 61, 52, 34, 45, 61],
                    borderColor:'rgba(61,2,2,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [eco, avgEco]);

    useEffect(() => {
        setPhyC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: phy,
                    borderColor:'rgba(16,72,234,0.74)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [39, 46, 41, 46, 55, 61, 43, 52, 45, 61],
                    borderColor:'rgba(2,6,50,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [phy, avgPhy]);

    useEffect(() => {
        setBioC({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: bio,
                    borderColor:'rgba(157,243,58,0.74)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: [51, 46, 58, 46, 39, 61, 55, 34, 45, 34],
                    borderColor:'rgba(29,76,9,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [bio, avgBio]);

    useEffect(() => {
        setFor2C({
            labels:['1학년 1학기 1회', '1학년 1학기 2회', '1학년 2학기 1회', '1학년 2학기 2회',
                '2학년 1학기 1회', '2학년 1학기 2회', '2학년 2학기 1회', '2학년 2학기 2회',
                '3학년 1학기 1회', '3학년 1학기 2회', '3학년 2학기 1회', '3학년 2학기 2회'],
            datasets:[
                {
                    label: '내 점수',
                    data: for2,
                    borderColor:'rgba(151,77,236,0.74)',
                    borderWidth: '3',
                    backgroundColor:[
                        'rgba(236,201,94,0)'
                    ]
                },
                {
                    label:'평균점수',
                    data: avgFor2,
                    borderColor:'rgba(37,4,99,0.74)',
                    backgroundColor:[
                        'rgba(206,159,12,0)'
                    ]
                }
            ]
        })
    }, [for2, avgFor2]);



    const search = ()=>{
        let tmpSubjectList=[];
        let tmpExamList=[];
        function maketmpList(specificList) {
            for(let i=0; i<selectSubject.length;i++) {
                console.log(`selectedSubject.value = ${selectSubject[i].value}`)
                switch (selectSubject[i].value) {
                    case "kor": tmpSubjectList[i]=specificList[0]; break;
                    case "eng": tmpSubjectList[i]=specificList[1]; break;
                    case "mat": tmpSubjectList[i]=specificList[2]; break;
                    case "his": tmpSubjectList[i]=specificList[3]; break;
                    case "phl": tmpSubjectList[i]=specificList[4]; break;
                    case "eco": tmpSubjectList[i]=specificList[5]; break;
                    case "phy": tmpSubjectList[i]=specificList[6]; break;
                    case "bio": tmpSubjectList[i]=specificList[7]; break;
                    case "for": tmpSubjectList[i]=specificList[8]; break;
                }
            }
        }
        switch(localStorage.getItem("userCode").substring(4,6)){//일단은 현재 학년만 들고오는 형식으로 함.

            case "20" : maketmpList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            case "19" : maketmpList([10,11,12,13,14,15,16,17,18]);
            case "18" : maketmpList([19, 20, 21, 22, 23, 24, 25, 26, 27]);

        };
        for(let i=0; i<selectExam.length;i++){
            tmpExamList[i]=selectExam[i].value;
        };

        axios.post(`http://localhost:5000/student/grade/search/${localStorage.getItem("userCode")}`, {
            examList: tmpExamList,//["11","12"...]
            subjectList: tmpSubjectList, //[11,23,27...]
        }).then(({data})=>{
                if(data.sgSearchUser){
                    let sgSearchUser = data.sgSearchUser;
                    let sgSearchTotal =data.sgSearchTotal;
                    if(sgSearchUser.firstFirst){
                        let labels =[]
                        for(let i =0;i<sgSearchUser.firstFirst.length;i++){
                            labels[i]=i;
                        }
                        setFirstChart({
                            labels: labels,
                            datasets:[
                                {
                                    label: '내 점수',
                                    data: sgSearchUser.firstFirst,
                                    backgroundColor:[
                                        '#ecc95e','#db2c5e','#33b3f6','#f87335',
                                        '#4fee8e','#f12839','#1448fd','#b7e832',
                                        '#6c5df5'
                                    ]
                                },
                                {
                                    label:'과목 평균점수',
                                    data:sgSearchTotal.firstFirst,
                                    backgroundColor:[
                                        '#ce9f0c','#801c39','#1e6387','#823d1d',
                                        '#256a40','#490c11','#122c87','#5d761a',
                                        '#352e74'
                                    ]
                                }
                            ]
                        })
                        setFirstShow(true);
                    }
                    if(sgSearchUser.firstSecond){
                        let labels =[]
                        for(let i =0;i<sgSearchUser.firstSecond.length;i++){
                            labels[i]=i;
                        }
                        setSecondChart({
                            labels: labels,
                            datasets:[
                                {
                                    label: '내 점수',
                                    data: sgSearchUser.firstSecond,
                                    backgroundColor:[
                                        '#ecc95e','#db2c5e','#33b3f6','#f87335',
                                        '#4fee8e','#f12839','#1448fd','#b7e832',
                                        '#6c5df5'
                                    ]
                                },
                                {
                                    label:'과목 평균점수',
                                    data:sgSearchTotal.firstSecond,
                                    backgroundColor:[
                                        '#ce9f0c','#801c39','#1e6387','#823d1d',
                                        '#256a40','#490c11','#122c87','#5d761a',
                                        '#352e74'
                                    ]
                                }
                            ]
                        })
                        setSecondShow(true);
                    }
                    if(sgSearchUser.secondFirst){
                        let labels =[]
                        for(let i =0;i<sgSearchUser.secondFirst.length;i++){
                            labels[i]=i;
                        }
                        setThirdChart({
                            labels: labels,
                            datasets:[
                                {
                                    label: '내 점수',
                                    data: sgSearchUser.secondFirst,
                                    backgroundColor:[
                                        '#ecc95e','#db2c5e','#33b3f6','#f87335',
                                        '#4fee8e','#f12839','#1448fd','#b7e832',
                                        '#6c5df5'
                                    ]
                                },
                                {
                                    label:'과목 평균점수',
                                    data:sgSearchTotal.secondFirst,
                                    backgroundColor:[
                                        '#ce9f0c','#801c39','#1e6387','#823d1d',
                                        '#256a40','#490c11','#122c87','#5d761a',
                                        '#352e74'
                                    ]
                                }
                            ]
                        })
                        setThirdShow(true);
                    }
                    if(sgSearchUser.secondSecond){
                        let labels =[]
                        for(let i =0;i<sgSearchUser.secondSecond.length;i++){
                            labels[i]=i;
                        }
                        setFourthChart({
                            labels: labels,
                            datasets:[
                                {
                                    label: '내 점수',
                                    data: sgSearchUser.secondSecond,
                                    backgroundColor:[
                                        '#ecc95e','#db2c5e','#33b3f6','#f87335',
                                        '#4fee8e','#f12839','#1448fd','#b7e832',
                                        '#6c5df5'
                                    ]
                                },
                                {
                                    label:'과목 평균점수',
                                    data:sgSearchTotal.secondSecond,
                                    backgroundColor:[
                                        '#ce9f0c','#801c39','#1e6387','#823d1d',
                                        '#256a40','#490c11','#122c87','#5d761a',
                                        '#352e74'
                                    ]
                                }
                            ]
                        })
                        setFourthShow(true);
                    }
                }
            })
            .catch(err=>{console.log(err);throw err;})

    }
    useEffect(()=>{
        search();
    },[showDetail])
    const searchUserChart = (semester) => {
        switch (semester) {
            case 11 : break;
            case 12 : break;
            case 21 : break;
            case 22 : break;
            default: break;
        }
    }
    return (
        <>
            <div>
                <Card>
                    <CardBody>
                        <text className="s_g_header">{localStorage.getItem("name")} 성적분석</text>
                    </CardBody>
                </Card>
            </div>

            { showDetail === false &&
            <div>
                <div className="s_grade_search">
                    <Card>
                        <CardBody className="s_grade_cb">
                            <div>
                                <Table>
                                    <tr>
                                        <td><h2>검색</h2></td>
                                        <td className="s_grade_td_lb">학년</td>
                                        <td className="s_grade_td">
                                            <Select options={gradeOptions}
                                                    value={selectGrade}
                                                    onChange={setSelectGrade}>
                                                labelledBy={"GradeSelect"}
                                            </Select>
                                        </td>
                                        <td className="s_grade_td_lb"><label> 시험 </label></td>
                                        <td className="s_grade_td">
                                            <MultiSelect className="s_grade_selectSize"
                                                         options={examOptions}
                                                         value={selectExam}
                                                         onChange={setSelectExam}
                                                         labelledBy={"ExamSelect"}>

                                            </MultiSelect>
                                        </td>
                                        <td className="s_grade_td_lb"><label> 과목 </label></td>
                                        <td>
                                            <MultiSelect className="s_grade_sub"
                                                         options={subjectOptions}
                                                         value={selectSubject}
                                                         onChange={setSelectSubject}
                                                         labelledBy={"SubjectSelect"}
                                            />
                                        </td>
                                        <td><button className="s_grade_btn"
                                                    onClick={e => setShowDetail(!showDetail)}
                                                   /* onChange={searchChart1}*/
                                        >조 회</button></td>
                                    </tr>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </div>


                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            {/*<h2>최근 성</h2>*/}
                            <Row className="s_g_mainC">
                                <Bar data={mainChart}
                                 height={300}
                                 options={mainOptions}/>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>국어</h1>
                            <Line
                                data={korC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>영어</h1>
                            <Line
                                data={engC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>수학</h1>
                            <Line
                                data={matC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>한국사</h1>
                            <Line
                                data={hisC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>생활과 윤리</h1>
                            <Line
                                data={phlC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>경제</h1>
                            <Line
                                data={ecoC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>물리학</h1>
                            <Line
                                data={phyC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>생명과학</h1>
                            <Line
                                data={bioC}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="s_grade_center">
                    <Card>
                        <CardBody>
                            <h1>제 2 외국어</h1>
                            <Line
                                data={for2C}
                                width={100}
                                height={20}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                max: 100,
                                                stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                            }
                                        }]
                                    },
                                    tooltips: {
                                        displayColors: false,
                                        backgroundColor: "#0a6dff",
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return Intl.NumberFormat().format(tooltipItem.yLabel)
                                            }//function

                                        }//callbaks
                                    }

                                }}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>}

            {showDetail === true &&
            <div>
                <div className="s_grade_search">
                    <Card>
                        <CardBody>
                            <div>
                                <Table>
                                    <tr>
                                        <td><h2>검색</h2></td>
                                        <td className="s_grade_td_lb"><label>학년</label></td>
                                        <td className="s_grade_td">
                                            <Select options={gradeOptions}
                                                    value={selectGrade}
                                                    onChange={setSelectGrade}>
                                                labelledBy={"GradeSelect"}
                                            </Select>
                                        </td>

                                        <td className="s_grade_td_lb"><label> 시험 </label></td>
                                        <td className="s_grade_td">
                                            <MultiSelect className="s_grade_selectSize"
                                                         options={examOptions}
                                                         value={selectExam}
                                                         onChange={setSelectExam}
                                                         labelledBy={"ExamSelect"}>

                                            </MultiSelect>
                                        </td>

                                        <td className="s_grade_td_lb"><label> 과목 </label></td>
                                        <td>
                                            <MultiSelect className="s_grade_sub"
                                                         options={subjectOptions}
                                                         value={selectSubject}
                                                         onChange={setSelectSubject}
                                                         labelledBy={"SubjectSelect"}
                                            />
                                        </td>
                                        <td><button className="s_grade_btn" onClick={e => setShowDetail(!showDetail)}>검색</button></td>
                                    </tr>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </div>


                {firstShow && <div className="s_grade_center">
                    <Row>
                        <Col className="s_grade_col_left">
                            <Card>
                                <CardBody>
                                    <h2>1학기 1회고사</h2>
                                    <Bar data={firstChart}
                                         width={100}
                                         height={20}
                                         options={{
                                             legend: {
                                                 display: false,
                                             },
                                             scales: {
                                                 yAxes: [{
                                                     ticks: {
                                                         min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                         max: 100,
                                                         stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                                     }
                                                 }]
                                             },
                                             tooltips: {
                                                 displayColors: false,
                                                 backgroundColor: "#0a6dff",
                                                 callbacks: {
                                                     label: function(tooltipItem) {
                                                         return Intl.NumberFormat().format(tooltipItem.yLabel)
                                                     }//function
                                                 }//callbaks
                                             }
                                         }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>}

                {secondShow && <div className="s_grade_center">
                    <Row>
                        <Col className="s_grade_col_left">
                            <Card>
                                <CardBody>
                                    <h2>1학기 2회고사</h2>
                                    <Bar data={secondChart}
                                         width={100}
                                         height={20}
                                         options={{
                                             legend: {
                                                 display: false,
                                             },
                                             scales: {
                                                 yAxes: [{
                                                     ticks: {
                                                         min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                         max: 100,
                                                         stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                                     }
                                                 }]
                                             },
                                             tooltips: {
                                                 displayColors: false,
                                                 backgroundColor: "#0a6dff",
                                                 callbacks: {
                                                     label: function(tooltipItem) {
                                                         return Intl.NumberFormat().format(tooltipItem.yLabel)
                                                     }//function
                                                 }//callbaks
                                             }
                                         }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>}

                {thirdShow &&<div className="s_grade_center">
                    <Row>
                        <Col className="s_grade_col_left">
                            <Card>
                                <CardHeader>
                                    <h2>2학기 1회고사</h2>
                                </CardHeader>
                                <CardBody>
                                    <Bar data={thirdChart}
                                         width={100}
                                         height={20}
                                         options={{
                                             legend: {
                                                 display: false,
                                             },
                                             scales: {
                                                 yAxes: [{
                                                     ticks: {
                                                         min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                         max: 100,
                                                         stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                                     }
                                                 }]
                                             },
                                             tooltips: {
                                                 displayColors: false,
                                                 backgroundColor: "#0a6dff",
                                                 callbacks: {
                                                     label: function(tooltipItem) {
                                                         return Intl.NumberFormat().format(tooltipItem.yLabel)
                                                     }//function
                                                 }//callbaks
                                             }
                                         }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>}

                {fourthShow && <div className="s_grade_center">
                    <Row>
                        <Col className="s_grade_col_left">
                            <Card>
                                <CardHeader>
                                    <h2>2학기 1회고사</h2>
                                </CardHeader>
                                <CardBody>
                                    <Bar data={fourthChart}
                                         width={100}
                                         height={20}
                                         options={{
                                             legend: {
                                                 display: false,
                                             },
                                             scales: {
                                                 yAxes: [{
                                                     ticks: {
                                                         min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                                                         max: 100,
                                                         stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                                                     }
                                                 }]
                                             },
                                             tooltips: {
                                                 displayColors: false,
                                                 backgroundColor: "#0a6dff",
                                                 callbacks: {
                                                     label: function(tooltipItem) {
                                                         return Intl.NumberFormat().format(tooltipItem.yLabel)
                                                     }//function
                                                 }//callbaks
                                             }
                                         }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>}
            </div>}
        </>
    )};

export default Grade;