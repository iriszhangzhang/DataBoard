<!--
  图表卡片组件
  Props: title, option, updateTime
-->
<template>
  <div class="chart-card glass-card animate-in" :style="animationStyle">
    <!-- 四角 L 型装饰 -->
    <div class="corner-decor top-left"></div>
    <div class="corner-decor top-right"></div>
    <div class="corner-decor bottom-left"></div>
    <div class="corner-decor bottom-right"></div>

    <div class="chart-header">
      <div class="title-accent"></div>
      <h3 class="chart-title">{{ title }}</h3>
    </div>

    <div v-if="loading" class="chart-skeleton">
      <div class="skeleton-bar"></div>
      <div class="skeleton-bar"></div>
      <div class="skeleton-bar"></div>
    </div>

    <div v-show="!loading" ref="chartRef" class="chart-container"></div>

    <div v-if="updateTime" class="chart-footer">更新于 {{ updateTime }}</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  option: {
    type: Object,
    default: () => ({}),
  },
  updateTime: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const chartRef = ref(null)
let chartInstance = null

const animationStyle = {
  animationDelay: '160ms',
}

onMounted(async () => {
  await nextTick()
  initChart()
})

onUnmounted(() => {
  disposeChart()
})

watch(
  () => props.option,
  (newOption) => {
    if (chartInstance && newOption) {
      chartInstance.setOption(newOption, true)
    }
  },
  { deep: true }
)

function initChart() {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  if (props.option) {
    chartInstance.setOption(props.option, true)
  }

  window.addEventListener('resize', handleResize)
}

function disposeChart() {
  if (chartInstance) {
    window.removeEventListener('resize', handleResize)
    chartInstance.dispose()
    chartInstance = null
  }
}

function handleResize() {
  if (chartInstance) {
    chartInstance.resize()
  }
}
</script>

<style scoped>
.chart-card {
  display: flex;
  flex-direction: column;
  min-height: 420px;
  padding: 0;
  animation-delay: 160ms;
}

/* 四角 L 型装饰线 */
.corner-decor {
  position: absolute;
  width: 8px;
  height: 8px;
  pointer-events: none;
  opacity: 0.6;
  transition: opacity var(--duration-normal);
}

.chart-card:hover .corner-decor {
  opacity: 1;
}

.top-left {
  top: 0;
  left: 0;
  border-top: 2px solid var(--border-glow);
  border-left: 2px solid var(--border-glow);
}

.top-right {
  top: 0;
  right: 0;
  border-top: 2px solid var(--border-glow);
  border-right: 2px solid var(--border-glow);
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid var(--border-glow);
  border-left: 2px solid var(--border-glow);
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid var(--border-glow);
  border-right: 2px solid var(--border-glow);
}

.chart-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 16px var(--spacing-2xl) 0;
}

/* 标题左侧装饰条 */
.title-accent {
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--color-primary), var(--color-secondary));
  flex-shrink: 0;
}

.chart-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

/* 加载骨架屏 */
.chart-skeleton {
  padding: 16px var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  justify-content: center;
}

.skeleton-bar {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--bg-card-skeleton) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    var(--bg-card-skeleton) 75%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s infinite;
}

.skeleton-bar:nth-child(1) {
  width: 80%;
}

.skeleton-bar:nth-child(2) {
  width: 60%;
}

.skeleton-bar:nth-child(3) {
  width: 45%;
}

.chart-container {
  flex: 1;
  width: 100%;
  min-height: 340px;
}

.chart-footer {
  text-align: right;
  color: var(--text-muted);
  font-size: var(--font-size-xs);
  padding: 8px var(--spacing-2xl);
  border-top: 1px solid var(--border-default);
}
</style>
