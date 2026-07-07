/**
 * 数字滚动动画 Composable
 * 从 0 滚动到目标值，支持带单位/前缀/后缀的字符串
 * 使用 requestAnimationFrame + 缓动函数实现
 */
import { ref, watch, onUnmounted } from 'vue'

/**
 * @param {String|Number} targetValue - 目标值，如 1234、'¥ 1,286'、'23.8%'
 * @param {Number} duration - 动画时长，默认 1500ms
 * @returns {ref} animatedValue - 当前动画值
 */
export function useCountUp(targetValue, duration = 1500) {
  const animatedValue = ref('0')
  let rafId = null
  let startTime = null
  let startNum = 0
  let endNum = 0
  let prefix = ''
  let suffix = ''
  let decimalPlaces = 0

  // 解析字符串，提取纯数字、前缀、后缀
  function parseValue(val) {
    const str = String(val)
    const cleaned = str.replace(/,/g, '')
    const match = cleaned.match(/^(-?[^\d]*)(\d+(?:\.\d+)?)(.*)$/)
    if (match) {
      const numStr = match[2]
      const decimalPlaces = numStr.includes('.') ? numStr.split('.')[1].length : 0
      return {
        prefix: match[1] || '',
        num: parseFloat(numStr) || 0,
        suffix: match[3] || '',
        decimalPlaces,
      }
    }
    return { prefix: '', num: parseFloat(cleaned) || 0, suffix: '', decimalPlaces: 0 }
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 缓出曲线
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    const raw = startNum + (endNum - startNum) * easeProgress
    const current = decimalPlaces > 0 ? raw.toFixed(decimalPlaces) : Math.round(raw)
    animatedValue.value = prefix + Number(current).toLocaleString() + suffix

    if (progress < 1) {
      rafId = requestAnimationFrame(animate)
    }
  }

  function startAnimation() {
    if (rafId) cancelAnimationFrame(rafId)
    startTime = null
    rafId = requestAnimationFrame(animate)
  }

  watch(
    () => targetValue.value,
    (newVal) => {
      const parsed = parseValue(newVal)
      prefix = parsed.prefix
      endNum = parsed.num
      suffix = parsed.suffix
      decimalPlaces = parsed.decimalPlaces
      startNum = parseFloat(animatedValue.value.replace(/[^\d.-]/g, '')) || 0
      startAnimation()
    },
    { immediate: true }
  )

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
  })

  return animatedValue
}
