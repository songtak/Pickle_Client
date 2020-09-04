import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import {chartTooltip} from './chartTooltip'

const radarChartOptions = {
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
    scale: {
        ticks: {
            display: false,
        },
    },
    tooltips: chartTooltip,
};

const RadarChart = ({ data, shadow = false }) => {
    const chartContainer = useRef(null);
    const [, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            if (shadow) {
                Chart.defaults.radarWithShadow = Chart.defaults.radar;
                Chart.controllers.radarWithShadow = Chart.controllers.radar.extend({
                    draw(ease) {
                        Chart.controllers.radar.prototype.draw.call(this, ease);
                        const {
                            chart: { ctx },
                        } = this;
                        ctx.save();
                        ctx.shadowColor = 'rgba(0,0,0,0.2)';
                        ctx.shadowBlur = 7;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 7;
                        ctx.responsive = true;
                        Chart.controllers.radar.prototype.draw.apply(this, arguments);
                        ctx.restore();
                    },
                });
            }
            // @ts-ignore
            const context = chartContainer.current.getContext('2d');
            const newChartInstance = new Chart(context, {
                type: shadow ? 'radarWithShadow' : 'radar',
                options: radarChartOptions,
                data,
            });
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, data, shadow]);

    return <canvas ref={chartContainer} />;
};
export default RadarChart