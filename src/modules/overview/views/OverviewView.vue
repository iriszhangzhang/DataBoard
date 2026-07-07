<!--
  Dashboard 主视图
  包含：Header、统计卡片、3个图表
-->
<template>
  <div class="dashboard-view">
    <!-- 背景光晕装饰 -->
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>

    <Header :title="title" :subtitle="subtitle" :current-time="currentTime" />

    <div class="dashboard-body">
      <div class="stats-row">
        <StatCard
          v-for="(stat, index) in stats"
          :key="index"
          :label="stat.label"
          :value="stat.value"
          :icon="stat.icon"
          :trend="stat.trend"
        />
      </div>

      <div class="chart-grid">
        <ChartCard title="月度销售趋势" :option="barOption" :update-time="lastUpdateTime" />
        <ChartCard title="周度趋势" :option="lineOption" :update-time="lastUpdateTime" />
        <ChartCard title="品类分布" :option="pieOption" :update-time="lastUpdateTime" />
      </div>

      <div class="dashboard-footer">数据更新时间：{{ lastUpdateTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getBarChartOption, getLineChartOption, getPieChartOption } from '../utils/chartHelper.js'
import dashboardData from '../../../data/dashboardData.js'
import Header from '../components/Header.vue'
import StatCard from '../components/StatCard.vue'
import ChartCard from '../components/ChartCard.vue'

const currentTime = ref('')
const lastUpdateTime = ref('')

const data = ref(dashboardData)

const title = computed(() => data.value.title)
const subtitle = computed(() => data.value.subtitle)
const stats = computed(() => data.value.stats)

const barOption = computed(() => {
  const salesData = data.value.salesData || []
  return getBarChartOption(salesData, 'month', 'value')
})

const lineOption = computed(() => {
  const trendData = data.value.trendData || []
  return getLineChartOption(trendData, 'week', 'value')
})

const pieOption = computed(() => {
  const categoryData = data.value.categoryData || []
  return getPieChartOption(categoryData, 'name', 'value')
})

function updateTime() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  currentTime.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  lastUpdateTime.value = currentTime.value
}

updateTime()
setInterval(updateTime, 1000)
</script>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

/* 背景光晕装饰 */
.bg-glow {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  filter: blur(80px);
}

.bg-glow-1 {
  top: -10%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: rgba(79, 172, 254, 0.06);
}

.bg-glow-2 {
  bottom: -10%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: rgba(0, 242, 254, 0.05);
}

.dashboard-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-2xl) var(--spacing-3xl);
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

.dashboard-footer {
  text-align: center;
  color: var(--text-muted);
  font-size: var(--font-size-xs);
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--border-default);
  letter-spacing: 0.5px;
}

@media screen and (max-width: 1200px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-grid {
    grid-template-columns: 1fr;
  }
}
</style>
