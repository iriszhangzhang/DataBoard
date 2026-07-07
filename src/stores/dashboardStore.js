/**
 * Dashboard 全局状态管理
 * 使用 Pinia 管理大屏全局状态
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchDashboardData } from '../modules/overview/services/dashboardService.js'

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboardData = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const lastUpdateTime = ref('')

  const stats = computed(() => dashboardData.value?.stats || [])
  const salesData = computed(() => dashboardData.value?.salesData || [])
  const trendData = computed(() => dashboardData.value?.trendData || [])
  const categoryData = computed(() => dashboardData.value?.categoryData || [])

  async function fetchDashboardDataAction() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchDashboardData()
      dashboardData.value = data
      lastUpdateTime.value = new Date().toLocaleString('zh-CN')
    } catch (e) {
      error.value = e.message || '数据加载失败'
    } finally {
      loading.value = false
    }
  }

  return {
    dashboardData,
    loading,
    error,
    lastUpdateTime,
    stats,
    salesData,
    trendData,
    categoryData,
    fetchDashboardData: fetchDashboardDataAction,
  }
})
