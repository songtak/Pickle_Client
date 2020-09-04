import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { chartTooltip, centerTextPlugin } from './chartTooltip';

const lineChartOptions = {
    legend: {
        display: true,
    },
    responsive: true,
    borderAlign : 'inner',
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    plugins: {
        datalabels: {
            display: true,
        },
    },
    scales: {
        yAxes: [
            {
                gridLines: {
                    display: true,
                    lineWidth: 0.5,
                    color: 'rgba(0,0,0,0.1)',
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 10,
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
};

const LineChart = ({ data, shadow = false }) => {
    const chartContainer = useRef(null);
    const [, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            if (shadow) {
                Chart.controllers.lineWithShadow = Chart.controllers.line;
                Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
                    draw(ease) {
                        Chart.controllers.line.prototype.draw.call(this, ease);
                        const {
                            chart: { ctx },
                        } = this;
                        ctx.save();
                        ctx.shadowColor = 'rgba(0,0,0,0.15)';
                        ctx.shadowBlur = 10;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 10;
                        ctx.responsive = true;
                        ctx.stroke();
                        Chart.controllers.line.prototype.draw.apply(this, arguments);
                        ctx.restore();
                    },
                });
            }
            // @ts-ignore
            const context = chartContainer.current.getContext('2d');
            const newChartInstance = new Chart(context, {
                type: shadow ? 'lineWithShadow' : 'line',
                options: lineChartOptions,
                data,
            });
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, data, shadow]);

    return <canvas ref={chartContainer} />;
};

export default LineChart;