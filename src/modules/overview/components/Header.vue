<!--
  顶部标题栏组件
  Props: title, subtitle, currentTime
-->
<template>
  <header class="dashboard-header animate-in">
    <div class="header-glow"></div>
    <div class="header-content">
      <div class="header-left">
        <div class="logo-mark">
          <span class="logo-icon">📊</span>
          <span class="logo-text">{{ title }}</span>
        </div>
        <div class="header-divider"></div>
        <p class="header-subtitle">{{ subtitle }}</p>
      </div>
      <div class="header-right">
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">在线</span>
        </div>
        <div class="header-divider vertical"></div>
        <div class="header-time">{{ currentTime }}</div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'DataBoard · 数据看板',
  },
  subtitle: {
    type: String,
    default: '开源教学级数据可视化大屏项目',
  },
  currentTime: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.dashboard-header {
  position: relative;
  padding: 20px 32px;
  border-bottom: 1px solid var(--border-default);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

/* 顶部装饰光晕 */
.header-glow {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 120px;
  background: radial-gradient(ellipse at center, rgba(79, 172, 254, 0.12), transparent 70%);
  pointer-events: none;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-mark {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 28px;
  line-height: 1;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
}

.header-divider {
  width: 1px;
  height: 24px;
  background: var(--border-default);
}

.header-divider.vertical {
  width: 24px;
  height: 1px;
}

.header-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-body);
  letter-spacing: 0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-success);
  box-shadow: 0 0 8px var(--color-success);
  animation: pulse 2s infinite;
}

.status-text {
  font-size: var(--font-size-sm);
  color: var(--color-success);
  font-weight: var(--font-weight-medium);
}

.header-time {
  font-size: var(--font-size-lg);
  color: var(--text-body);
  font-variant-numeric: tabular-nums;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  letter-spacing: 0.5px;
}
</style>
