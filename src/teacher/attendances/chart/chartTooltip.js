export const ThemeColors = () => {
const rootStyle = getComputedStyle(document.body);
    return {
        themeColor1: rootStyle.getPropertyValue('--theme-color-1').trim(),
        themeColor2: rootStyle.getPropertyValue('--theme-color-2').trim(),
        themeColor3: rootStyle.getPropertyValue('--theme-color-3').trim(),
        themeColor4: rootStyle.getPropertyValue('--theme-color-4').trim(),
        themeColor5: rootStyle.getPropertyValue('--theme-color-5').trim(),
        themeColor6: rootStyle.getPropertyValue('--theme-color-6').trim(),
        themeColor1_10: rootStyle.getPropertyValue('--theme-color-1-10').trim(),
        themeColor2_10: rootStyle.getPropertyValue('--theme-color-2-10').trim(),
        themeColor3_10: rootStyle.getPropertyValue('--theme-color-3-10').trim(),
        themeColor4_10: rootStyle.getPropertyValue('--theme-color-3-10').trim(),
        themeColor5_10: rootStyle.getPropertyValue('--theme-color-3-10').trim(),
        themeColor6_10: rootStyle.getPropertyValue('--theme-color-3-10').trim(),
        primaryColor: rootStyle.getPropertyValue('--primary-color').trim(),
        foregroundColor: rootStyle.getPropertyValue('--foreground-color').trim(),
        separatorColor: rootStyle.getPropertyValue('--separator-color').trim(),
    };
};

export const chartTooltipColor = ThemeColors()

export const chartTooltip = {
    backgroundColor: chartTooltipColor.foregroundColor,
    titleFontColor: chartTooltipColor.primaryColor,
    borderColor: chartTooltipColor.themeColor2,
    borderWidth: 0.5,
    bodyFontColor: chartTooltipColor.primaryColor,
    bodySpacing: 10,
    xPadding: 15,
    yPadding: 15,
    cornerRadius: 0.15,
};

export const centerTextPlugin = {
  afterDatasetsUpdate(chart) {},
  beforeDraw(chart) {
    const width = chart.chartArea.right;
    const height = chart.chartArea.bottom;
    const { ctx } = chart.chart;
    ctx.restore();

    let activeLabel = chart.data.labels[0];
    let activeValue = chart.data.datasets[0].data[0];
    let dataset = chart.data.datasets[0];
    let meta = dataset._meta[Object.keys(dataset._meta)[0]];
    let { total } = meta;

    let activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1));
    activePercentage = chart.legend.legendItems[0].hidden
      ? 0
      : activePercentage;

    if (chart.pointAvailable) {
      activeLabel = chart.data.labels[chart.pointIndex];
      activeValue =
        chart.data.datasets[chart.pointDataIndex].data[chart.pointIndex];

      dataset = chart.data.datasets[chart.pointDataIndex];
      meta = dataset._meta[Object.keys(dataset._meta)[0]];
      total = meta.total;
      activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1));
      activePercentage = chart.legend.legendItems[chart.pointIndex].hidden
        ? 0
        : activePercentage;
    }

    ctx.font = '36px Nunito, sans-serif';
    ctx.fillStyle = ThemeColors().primaryColor;
    ctx.textBaseline = 'middle';

    const text = `${activePercentage}%`;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);

    ctx.font = '14px Nunito, sans-serif';
    ctx.textBaseline = 'middle';

    const text2 = activeLabel;
    const textX2 = Math.round((width - ctx.measureText(text2).width) / 2);
    const textY2 = height / 2 - 30;
    ctx.fillText(text2, textX2, textY2);

    ctx.save();
  },
  beforeEvent(chart, event, options) {
    const firstPoint = chart.getElementAtEvent(event)[0];

    if (firstPoint) {
      chart.pointIndex = firstPoint._index;
      chart.pointDataIndex = firstPoint._datasetIndex;
      chart.pointAvailable = true;
    }
  },
};
