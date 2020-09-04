import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const legend = {
    display: false,
    position: "bottom",
    labels: {
        fontColor: "black",
        fontSize: 12,
    }
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        ]
    },
    maintainAspectRatio: false
};

const BarHorizontal = ({data}) => {
    return <HorizontalBar data={data} options={options} legend={legend}/>
}
export default BarHorizontal