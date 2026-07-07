/**
 * 日志系统
 * 分级输出：DEBUG / INFO / WARN / ERROR
 * 开发环境输出到控制台
 * ERROR 级别持久化到 localStorage
 */

const LEVELS = ['debug', 'info', 'warn', 'error']
const COLORS = {
  debug: '#a8b2c9',
  info: '#4facfe',
  warn: '#f6c177',
  error: '#ff6b6b',
}

export const logger = {
  debug: (msg, meta) => log('debug', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  error: (msg, meta) => log('error', msg, meta),
}

function log(level, msg, meta) {
  const timestamp = new Date().toISOString()
  const prefix = `[${level.toUpperCase()}] ${timestamp}`

  const entry = {
    level,
    msg,
    meta: meta || null,
    timestamp,
  }

  if (import.meta.env.DEV) {
    console.log(`[${level.toUpperCase()}] ${timestamp}`, msg, meta || '')
  }

  if (level === 'error') {
    saveToLocalStorage(entry)
  }
}

function saveToLocalStorage(entry) {
  try {
    const key = 'databoard_error_logs'
    const logs = JSON.parse(localStorage.getItem(key) || '[]')
    logs.unshift(entry)
    if (logs.length > 100) logs.length = 100
    localStorage.setItem(key, JSON.stringify(logs))
  } catch (e) {
    console.warn('[Logger] localStorage 写入失败', e)
  }
}

export function getErrorLogs() {
  try {
    return JSON.parse(localStorage.getItem('databoard_error_logs') || '[]')
  } catch {
    return []
  }
}

export function clearErrorLogs() {
  localStorage.removeItem('databoard_error_logs')
}
