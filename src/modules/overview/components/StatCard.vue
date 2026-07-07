<!--
  统计卡片组件
  Props: label, value, icon, trend
-->
<template>
  <div class="stat-card glass-card animate-in" :style="animationStyle">
    <div class="stat-icon">
      <span class="icon-emoji">{{ icon }}</span>
      <span class="icon-glow"></span>
    </div>
    <div class="stat-info">
      <div class="stat-label">{{ label }}</div>
      <div class="stat-value">{{ animatedValue }}</div>
      <div v-if="trend" class="stat-trend" :class="trendClass">
        <span class="trend-arrow">{{ trendArrow }}</span>
        <span class="trend-text">{{ trend }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCountUp } from '../../../common/composables/useCountUp.js'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '📊',
  },
  trend: {
    type: String,
    default: '',
  },
})

const animatedValue = useCountUp(
  computed(() => props.value),
  1500
)

// 趋势样式：正数为上升绿色，负数为下降红色
const trendClass = computed(() => {
  if (!props.trend) return ''
  const isPositive = props.trend.startsWith('+')
  const isNegative = props.trend.startsWith('-')
  if (isPositive) return 'trend-up'
  if (isNegative) return 'trend-down'
  return ''
})

const trendArrow = computed(() => {
  if (!props.trend) return ''
  const isPositive = props.trend.startsWith('+')
  const isNegative = props.trend.startsWith('-')
  if (isPositive) return '↑'
  if (isNegative) return '↓'
  return ''
})

const animationStyle = {
  animationDelay: '80ms',
}
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-2xl);
  cursor: default;
}

.stat-icon {
  position: relative;
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
}

.icon-emoji {
  position: relative;
  z-index: 2;
}

/* 图标光晕 */
.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79, 172, 254, 0.2), transparent);
  z-index: 1;
  pointer-events: none;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  flex: 1;
  min-width: 0;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-body);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: var(--font-weight-normal);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  letter-spacing: 0.5px;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.stat-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  width: fit-content;
}

.trend-up {
  color: var(--color-success);
  background: rgba(0, 212, 170, 0.1);
}

.trend-down {
  color: var(--color-danger);
  background: rgba(248, 113, 113, 0.1);
}

.trend-arrow {
  font-size: 12px;
}

.trend-text {
  font-size: var(--font-size-xs);
}
</style>
