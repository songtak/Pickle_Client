import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import {chartTooltip} from './chartTooltip'


const barChartOptions = {
    legend: {
        position: 'bottom',
        labels: {
            padding: 30,
            usePointStyle: true,
            fontSize: 12,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                gridLines: {
                    display: true,
                    lineWidth: 1,
                    color: 'rgba(0,0,0,0.1)',
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 20,
                    min: 0,
                    max: 100,
                    padding: 20,
                },
            },
        ],
        xAxes: [
            {
                gridLines: {
                    display: false,
                },
            },
        ],
    },
    tooltips: chartTooltip,
};

const BarChart = ({ data, shadow = false }) => {
    const chartContainer = useRef(null);
    const [, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            if (shadow) {
                Chart.defaults.global.datasets.barWithShadow =
                    Chart.defaults.global.datasets.bar;
                Chart.defaults.barWithShadow = Chart.defaults.bar;
                Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
                    draw(ease) {
                        Chart.controllers.bar.prototype.draw.call(this, ease);
                        const {
                            chart: { ctx },
                        } = this;
                        ctx.save();
                        ctx.shadowColor = 'rgba(0,0,0,0.2)';
                        ctx.shadowBlur = 7;
                        ctx.shadowOffsetX = 5;
                        ctx.shadowOffsetY = 7;
                        ctx.responsive = true;
                        Chart.controllers.bar.prototype.draw.apply(this, arguments);
                        ctx.restore();
                    },
                });
            }
            // @ts-ignore
            const context = chartContainer.current.getContext('2d');
            const newChartInstance = new Chart(context, {
                type: shadow ? 'barWithShadow' : 'bar',
                options: barChartOptions,
                data,
            });
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, data, shadow]);

    return <canvas ref={chartContainer} />;
};

export default BarChart;
