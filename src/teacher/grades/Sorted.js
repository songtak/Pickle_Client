import React, {useState} from "react";
import {NavLink} from "react-router-dom";


const Sorted = ({rank}) => {
    return <>
        <table className="table">
            <thead>
            <tr style={{textAlign: "center"}}>
                <th>등수</th>
                <th>이름</th>
                <th>점수</th>
            </tr>
            </thead>
            <tbody>
            {rank.map((i, index) => (
                <tr key={index} style={{textAlign: "center"}}>
                    <td>{i.rank}</td>
                    <td>{i.name}</td>
                    <td>{i.score}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}
export default Sorted