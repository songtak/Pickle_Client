const chartTooltip = {
    backgroundColor: "#8ebb4e",
    titleFontColor: "#8ebb4e",
    borderColor: "#8ebb4e",
    borderWidth: 0.5,
    bodyFontColor: "#8ebb4e",
    bodySpacing: 10,
    xPadding: 15,
    yPadding: 15,
    cornerRadius: 0.15,
};

export const lineChartOptions = {
    legend: {
        display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    plugins: {
        datalabels: {
            display: false,
        },
    },
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
                    stepSize: 10,
                    min: 0,
                    max: 100,
                    padding: 5,
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