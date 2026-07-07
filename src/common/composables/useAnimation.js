/**
 * 错落入场动画 Composable
 * 为数组中的每个元素生成依次延迟的动画 class
 */
export function useAnimation(items, delayStep = 80) {
  return items.map((_, index) => ({
    class: 'animate-in',
    style: {
      animationDelay: `${index * delayStep}ms`,
    },
  }))
}
