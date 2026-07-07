/**
 * 自动刷新 Composable
 * @param {Function} fetchFn - 数据获取函数
 * @param {number} interval - 刷新间隔（毫秒），默认 30000
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { logger } from '../logs/logger.js'

export function useAutoRefresh(fetchFn, interval = 30000) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  let timer = null

  const refresh = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await fetchFn()
      logger.info('[AutoRefresh] 数据更新成功')
    } catch (e) {
      error.value = e.message || '数据加载失败'
      logger.error('[AutoRefresh] 数据更新失败', e.message)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    refresh()
    timer = setInterval(refresh, interval)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })

  return {
    data,
    loading,
    error,
    refresh,
  }
}
