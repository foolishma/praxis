import { expect, test } from '@playwright/test'

test.describe('Praxis smoke', () => {
  test('home loads hero signal', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('#hero')).toBeVisible()
  })

  test('command palette opens', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Control+K')
    await expect(page.getByPlaceholder('Jump to section...')).toBeVisible()
    await page.keyboard.press('Escape')
  })

  test('brief page loads', async ({ page }) => {
    await page.goto('/brief')
    await expect(page.getByRole('heading', { name: /Project brief/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Back to Performance Lab/i })).toHaveAttribute('href', '/#lab')
  })
})
