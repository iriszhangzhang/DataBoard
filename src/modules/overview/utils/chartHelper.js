/**
 * ECharts 图表配置生成工具
 * 所有配置统一：深色主题、动画、配色板
 */

/* 统一基础配置 */
const baseChartOption = {
  backgroundColor: 'transparent',
  textStyle: {
    color: '#94a3b8',
    fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif',
  },
  tooltip: {
    backgroundColor: 'rgba(11, 15, 26, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#e2e8f0' },
    padding: [12, 16],
    borderRadius: 8,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
    containLabel: true,
  },
  animationDuration: 1200,
  animationEasing: 'cubicOut',
}

/* 统一配色板 */
const chartColors = ['#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140', '#a18cd1']

/* 坐标轴共用样式 */
const axisStyle = {
  axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
  axisLabel: { color: '#94a3b8', fontSize: 12 },
  splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.06)' } },
}

/**
 * 生成柱状图配置
 * @param {Array} data - 数据数组
 * @param {string} xKey - x轴字段名
 * @param {string} yKey - y轴字段名
 * @returns {Object} ECharts option
 */
export function getBarChartOption(data, xKey, yKey) {
  const xData = data.map((item) => item[xKey])
  const yData = data.map((item) => item[yKey])

  return {
    ...baseChartOption,
    xAxis: {
      type: 'category',
      data: xData,
      ...axisStyle,
    },
    yAxis: {
      type: 'value',
      ...axisStyle,
    },
    series: [
      {
        type: 'bar',
        data: yData,
        barWidth: '50%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#4facfe' },
              { offset: 1, color: '#00f2fe' },
            ],
          },
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#00f2fe' },
                { offset: 1, color: '#4facfe' },
              ],
            },
          },
        },
      },
    ],
  }
}

/**
 * 生成折线图配置
 * @param {Array} data - 数据数组
 * @param {string} xKey - x轴字段名
 * @param {string} yKey - y轴字段名
 * @returns {Object} ECharts option
 */
export function getLineChartOption(data, xKey, yKey) {
  const xData = data.map((item) => item[xKey])
  const yData = data.map((item) => item[yKey])

  return {
    ...baseChartOption,
    xAxis: {
      type: 'category',
      data: xData,
      boundaryGap: false,
      ...axisStyle,
    },
    yAxis: {
      type: 'value',
      ...axisStyle,
    },
    series: [
      {
        type: 'line',
        data: yData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#4facfe',
          width: 3,
        },
        itemStyle: {
          color: '#4facfe',
          borderWidth: 2,
          borderColor: '#fff',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(79, 172, 254, 0.4)' },
              { offset: 1, color: 'rgba(79, 172, 254, 0.02)' },
            ],
          },
        },
      },
    ],
  }
}

/**
 * 生成环形饼图配置
 * @param {Array} data - 数据数组
 * @param {string} nameKey - 名称字段名
 * @param {string} valueKey - 值字段名
 * @returns {Object} ECharts option
 */
export function getPieChartOption(data, nameKey, valueKey) {
  const pieData = data.map((item) => ({
    name: item[nameKey],
    value: item[valueKey],
  }))

  return {
    ...baseChartOption,
    tooltip: {
      ...baseChartOption.tooltip,
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      bottom: '0%',
      left: 'center',
      textStyle: { color: '#94a3b8', fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'rgba(11, 15, 26, 0.8)',
          borderWidth: 2,
        },
        label: {
          show: true,
          color: '#e0e0e0',
          fontSize: 12,
          formatter: '{b}\n{d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(79, 172, 254, 0.5)',
          },
        },
        data: pieData.map((item, index) => ({
          ...item,
          itemStyle: { color: chartColors[index % chartColors.length] },
        })),
      },
    ],
  }
}
