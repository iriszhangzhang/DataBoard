import { test, expect } from '@playwright/test'

test.describe('DataBoard Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('页面标题包含 DataBoard 或 数据看板', async ({ page }) => {
    const title = await page.title()
    expect(title).toMatch(/DataBoard|数据看板/)
  })

  test('至少一个 .stat-card 元素存在', async ({ page }) => {
    const statCards = await page.locator('.stat-card').count()
    expect(statCards).toBeGreaterThanOrEqual(1)
  })

  test('至少一个 .chart-container 元素存在', async ({ page }) => {
    const chartContainers = await page.locator('.chart-container').count()
    expect(chartContainers).toBeGreaterThanOrEqual(1)
  })

  test('页面不应有严重控制台错误', async ({ page }) => {
    const errors = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.reload()
    await page.waitForTimeout(2000)
    expect(errors.length).toBe(0)
  })
})
