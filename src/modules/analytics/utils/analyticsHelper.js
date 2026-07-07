const chartColors = ['#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140']

const baseChartOption = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94a3b8', fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif' },
  tooltip: {
    backgroundColor: 'rgba(11, 15, 26, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#e2e8f0' },
    padding: [12, 16],
    borderRadius: 8,
  },
  animationDuration: 1200,
  animationEasing: 'cubicOut',
}

export function getGroupedBarOption(data, xKey, seriesKeys) {
  return {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: 'axis' },
    legend: {
      data: seriesKeys,
      textStyle: { color: '#94a3b8', fontSize: 12 },
      top: 0,
      right: 0,
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d[xKey]),
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#94a3b8', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: '#94a3b8', fontSize: 12 },
    },
    series: seriesKeys.map((key, i) => ({
      name: key,
      type: 'bar',
      data: data.map((d) => d[key]),
      barWidth: '20%',
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: chartColors[i % chartColors.length],
      },
    })),
  }
}

export function getRadarOption(indicatorData, seriesData) {
  return {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip },
    legend: {
      data: seriesData.map((s) => s.name),
      textStyle: { color: '#94a3b8', fontSize: 12 },
      top: 0,
      right: 0,
    },
    radar: {
      indicator: indicatorData.map((item) => ({
        name: item.name,
        max: 100,
      })),
      center: ['50%', '55%'],
      radius: '65%',
      axisName: { color: '#94a3b8', fontSize: 11 },
      splitArea: {
        areaStyle: { color: ['rgba(79,172,254,0.02)', 'rgba(79,172,254,0.04)'] },
      },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    },
    series: [
      {
        type: 'radar',
        data: seriesData.map((s, i) => ({
          value: indicatorData.map((ind) => s[ind.name]),
          name: s.name,
          areaStyle: { color: chartColors[i % chartColors.length] },
          lineStyle: { color: chartColors[i % chartColors.length], width: 2 },
          itemStyle: { color: chartColors[i % chartColors.length] },
        })),
      },
    ],
  }
}
