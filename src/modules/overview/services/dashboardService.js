/**
 * Dashboard 数据服务
 * 封装业务数据获取逻辑，供组件调用
 */

import { request } from './request.js'
import { logger } from '../../../common/logs/logger.js'

export async function fetchDashboardData() {
  return request('/dashboard')
}

export async function refreshDashboardData() {
  logger.info('[DashboardService] 手动刷新数据')
  return fetchDashboardData()
}
