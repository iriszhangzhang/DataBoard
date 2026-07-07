<template>
  <div class="analytics-view">
    <div class="analytics-header animate-in">
      <div>
        <h2 class="page-title">深入分析</h2>
        <p class="page-desc">多维度交叉分析，洞察数据趋势</p>
      </div>
    </div>

    <div class="summary-row">
      <div v-for="s in summaryStats" :key="s.label" class="summary-item glass-card">
        <span class="summary-label">{{ s.label }}</span>
        <span class="summary-value">{{ s.value }}</span>
      </div>
    </div>

    <div class="chart-grid-2col">
      <div class="chart-card glass-card animate-in">
        <div class="chart-card-header">
          <div class="title-accent"></div>
          <h3>各品类季度销售额</h3>
        </div>
        <div ref="groupedBarRef" class="chart-container"></div>
      </div>
      <div class="chart-card glass-card animate-in">
        <div class="chart-card-header">
          <div class="title-accent"></div>
          <h3>品类综合能力雷达</h3>
        </div>
        <div ref="radarRef" class="chart-container"></div>
      </div>
    </div>

    <div class="chart-grid-full">
      <div class="chart-card glass-card animate-in">
        <div class="chart-card-header">
          <div class="title-accent"></div>
          <h3>用户增长 & 订单增长趋势</h3>
        </div>
        <div ref="lineRef" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import analyticsData from '../../../data/analyticsData.js'
import { getGroupedBarOption, getRadarOption } from '../utils/analyticsHelper.js'

const groupedBarRef = ref(null)
const radarRef = ref(null)
const lineRef = ref(null)
let groupedBarChart = null
let radarChart = null
let lineChart = null

const summaryStats = [
  { label: '年度总销售额', value: '¥ 6,280' },
  { label: '季度平均增长', value: '+18.5%' },
  { label: '最多品类', value: '电子产品' },
  { label: '最高满意度', value: '食品饮料 90%' },
]

function initCharts() {
  nextTick(() => {
    if (groupedBarRef.value) {
      groupedBarChart = echarts.init(groupedBarRef.value)
      groupedBarChart.setOption(
        getGroupedBarOption(analyticsData.categorySales, 'category', ['Q1', 'Q2', 'Q3', 'Q4'])
      )
    }
    if (radarRef.value) {
      radarChart = echarts.init(radarRef.value)
      radarChart.setOption(
        getRadarOption(analyticsData.performanceRadar, [
          { name: '电子产品' },
          { name: '服装服饰' },
          { name: '食品饮料' },
        ])
      )
    }
    if (lineRef.value) {
      const monthlyData = analyticsData.monthlyGrowth
      lineChart = echarts.init(lineRef.value)
      lineChart.setOption({
        backgroundColor: 'transparent',
        textStyle: { color: '#94a3b8' },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(11,15,26,0.9)',
          borderColor: 'rgba(255,255,255,0.1)',
          textStyle: { color: '#e2e8f0' },
          padding: [12, 16],
          borderRadius: 8,
        },
        legend: {
          data: ['用户增长', '订单增长'],
          textStyle: { color: '#94a3b8', fontSize: 12 },
          top: 0,
          right: 0,
        },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '20%', containLabel: true },
        xAxis: {
          type: 'category',
          data: monthlyData.map((d) => d.month),
          boundaryGap: false,
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
          axisLabel: { color: '#94a3b8', fontSize: 12 },
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
          axisLabel: { color: '#94a3b8', fontSize: 12 },
        },
        animationDuration: 1200,
        animationEasing: 'cubicOut',
        series: [
          {
            name: '用户增长',
            type: 'line',
            smooth: true,
            data: monthlyData.map((d) => d['用户增长']),
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { color: '#4facfe', width: 3 },
            itemStyle: { color: '#4facfe' },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(79,172,254,0.4)' },
                  { offset: 1, color: 'rgba(79,172,254,0.02)' },
                ],
              },
            },
          },
          {
            name: '订单增长',
            type: 'line',
            smooth: true,
            data: monthlyData.map((d) => d['订单增长']),
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { color: '#43e97b', width: 3 },
            itemStyle: { color: '#43e97b' },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(67,233,123,0.4)' },
                  { offset: 1, color: 'rgba(67,233,123,0.02)' },
                ],
              },
            },
          },
        ],
      })
    }
  })
}

function handleResize() {
  groupedBarChart?.resize()
  radarChart?.resize()
  lineChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  groupedBarChart?.dispose()
  radarChart?.dispose()
  lineChart?.dispose()
})
</script>

<style scoped>
.analytics-view {
  padding: var(--spacing-2xl) var(--spacing-3xl);
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

.analytics-header {
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.page-desc {
  font-size: var(--font-size-sm);
  color: var(--text-body);
  margin-top: var(--spacing-xs);
}

.summary-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg) var(--spacing-2xl);
}

.summary-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.summary-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.chart-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.chart-grid-full {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.chart-card {
  display: flex;
  flex-direction: column;
  min-height: 400px;
  padding: 0;
}

.chart-card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 16px var(--spacing-2xl) 0;
}

.title-accent {
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--color-primary), var(--color-secondary));
  flex-shrink: 0;
}

.chart-card h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.chart-container {
  flex: 1;
  width: 100%;
  min-height: 340px;
}

@media screen and (max-width: 1200px) {
  .summary-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-grid-2col {
    grid-template-columns: 1fr;
  }
}
</style>
