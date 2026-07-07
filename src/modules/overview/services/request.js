/**
 * 统一请求层
 * 根据 VITE_USE_MOCK 自动切换数据源
 * 包含请求/响应拦截器，自动记录日志
 */

import { logger } from '../../../common/logs/logger.js'
import dashboardMock from '../mocks/dashboardMock.js'

const isMock = import.meta.env.VITE_USE_MOCK === 'true'

export async function request(url, options = {}) {
  const startTime = Date.now()

  logger.info(`[Request] ${options.method || 'GET'} ${url}`, { params: options.body || null })

  try {
    if (isMock) {
      // Mock 模式：模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200))
      const mockData = await getMockData(url)
      const cost = Date.now() - startTime
      logger.info(`[Response] ${url}`, { status: 200, cost: `${cost}ms` })
      return mockData
    }

    // 真实 API 模式
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const cost = Date.now() - startTime

    if (!response.ok) {
      const err = new Error(`HTTP ${response.status}: ${response.statusText}`)
      logger.error(`[Response Error] ${url}`, { status: response.status, cost: `${cost}ms` })
      throw err
    }

    const data = await response.json()
    logger.info(`[Response] ${url}`, { status: 200, cost: `${cost}ms` })
    return data
  } catch (error) {
    logger.error(`[Request Failed] ${url}`, { error: error.message })
    throw error
  }
}

function getMockData(url) {
  if (url.includes('dashboard')) {
    return dashboardMock
  }
  throw new Error(`Mock 数据未找到: ${url}`)
}

export function switchApiMode(mode) {
  // 预留接口：后续可用于切换 API 模式
  logger.info(`[Config] 切换 API 模式: ${mode}`)
}
