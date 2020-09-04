import React from "react";
import {Row} from 'reactstrap';
import Grade from "./HomeComponent/Grade";
import Streaming from "../../commons/Components/Streaming";
import Attendance from './HomeComponent/Attendance'
import Notice from "../../commons/Components/Notice";
import {Colxx} from "../../commons/Components/CustomComponent"

const Home = () => {
    return <div className="rounded">
        <Row>
            <Colxx xl="8" lg="12" className="mb-4">
                <Streaming/>
            </Colxx>
            <Colxx xl="4" lg="12" className="mb-4">
                <Grade cardClass={'h-100'}/>
            </Colxx>
        </Row>
        <Row>
            <Colxx lg="12" xl="4" className="mb-4">
                <Attendance/>
            </Colxx>
            <Colxx lg="12" xl="8" className="mb-4">
                <Notice/>
            </Colxx>
        </Row>
    </div>
}
export default Home