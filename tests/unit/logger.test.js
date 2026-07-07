import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger, getErrorLogs, clearErrorLogs } from '../../src/common/logs/logger.js'

describe('logger', () => {
  beforeEach(() => {
    clearErrorLogs()
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logger.info 能够正常调用', () => {
    logger.info('测试信息', { key: 'value' })
    expect(console.log).toHaveBeenCalled()
  })

  it('logger.error 能够正常调用', () => {
    logger.error('测试错误', { code: 500 })
    expect(console.log).toHaveBeenCalled()
  })

  it('logger.warn 能够正常调用', () => {
    logger.warn('测试警告')
    expect(console.log).toHaveBeenCalled()
  })

  it('logger.debug 能够正常调用', () => {
    logger.debug('测试调试')
    expect(console.log).toHaveBeenCalled()
  })

  it('日志包含时间戳', () => {
    logger.info('带时间戳的日志')
    const logs = getErrorLogs()
    logger.error('持久化错误')
    const allLogs = getErrorLogs()
    expect(allLogs.length).toBeGreaterThan(0)
    expect(allLogs[0]).toHaveProperty('timestamp')
  })

  it('clearErrorLogs 能够清空日志', () => {
    logger.error('清空测试')
    expect(getErrorLogs().length).toBeGreaterThan(0)
    clearErrorLogs()
    expect(getErrorLogs().length).toBe(0)
  })
})
