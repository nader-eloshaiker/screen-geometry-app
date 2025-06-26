import { expect, test } from '@playwright/test'
import { MotionGlobalConfig } from 'framer-motion'

test('Smoke Test Screens Page', async ({ page }) => {
  MotionGlobalConfig.skipAnimations = true

  // Load Page and navigate to Screens
  await page.goto('/')

  const screensLink = await page.getByTestId('large-header-menu').getByRole('link', { name: 'Screens' })
  await screensLink.click()

  // Does the skeleton loader show up?
  // await expect(page.getByTestId('SkeletonTableRow')).toHaveCount(5)
  // await expect(page.getByTestId('SkeletonImage')).toBeVisible()

  // Load default table and check for button spinner
  await expect(page.getByRole('button', { name: /Load/i })).toBeVisible()
  await page.getByRole('button', { name: /Load/i }).click()

  await expect(page.getByTestId('ButtonSpinner')).toBeVisible()
  await expect(
    page.locator('div').filter({ hasText: 'A list of common Screen specifications has been generated' }).nth(1)
  ).toBeVisible()

  // Check for table data
  const tableOriginal = page.getByTestId('ScreenTable')
  await expect(tableOriginal.locator('tbody > tr')).toHaveCount(6)
  await expect(tableOriginal).toContainText('49"')
  await expect(tableOriginal).toContainText('40"')
  await expect(tableOriginal).toContainText('38"')
  await expect(tableOriginal).toContainText('34"')
  await expect(tableOriginal).toContainText('32"')
  await expect(tableOriginal).toContainText('27"')

  // Delete row and check for count
  await page.getByRole('row', { name: '27" 16:9 24" x 13" 3840 x 2160' }).getByTitle('Delete').click()
  // Check for table data
  const tableDeletedRow = page.getByTestId('ScreenTable')
  await expect(tableDeletedRow.locator('tbody > tr')).toHaveCount(5)
  await expect(tableDeletedRow).not.toContainText('27"')

  // Create new row and check for count
  await page.getByRole('button', { name: 'Create Screen' }).click()
  await page.getByText(/Select Screen/i).click()
  await page.getByPlaceholder(/Search Screen list/i).fill('27')
  await page.getByText('4K UHD 27" 3840x2160 16:9').click()
  await page.getByRole('button', { name: 'Create', exact: true }).click()

  // Check for table data
  const tableAddedRow = page.getByTestId('ScreenTable')
  await expect(tableAddedRow.locator('tbody > tr')).toHaveCount(6)

  // Edit row and check for updated row
  await page.getByRole('row', { name: '32" 16:9 28" x 16" 3840 x 2160' }).getByTitle('Edit').click()
  await page.getByLabel('Screen Size').click()
  await page.getByLabel('Screen Size').dblclick()
  await page.getByLabel('Screen Size').click()
  await page.getByLabel('Screen Size').fill('31')
  await page.getByRole('button', { name: 'Update' }).click()

  // Check for table data
  const tableUpdatedRow = page.getByTestId('ScreenTable')
  await expect(tableUpdatedRow.locator('tbody > tr')).toHaveCount(6)
  await expect(tableUpdatedRow).toContainText('31"')
  await expect(tableUpdatedRow).not.toContainText('32"')

  /**
   * Test for Screen Panel
   **/

  const showCheckbox = page.getByRole('row', { name: '49" 32:9 47" x 13" 5120 x 1440' }).getByTitle('Show')

  // Check if panel is visible
  await expect(showCheckbox).toBeChecked()
  await expect(page.getByTestId('ScreenPanel-49')).toBeVisible()

  // Check if panel is hidden
  await showCheckbox.click()
  await expect(showCheckbox).not.toBeChecked()
  await expect(page.getByTestId('ScreenPanel-49')).not.toBeVisible()

  // Check if panel is visible
  await showCheckbox.click()
  await expect(showCheckbox).toBeChecked()
  await expect(page.getByTestId('ScreenPanel-49')).toBeVisible()

  await expect(page.locator('div').filter({ hasText: 'CreatedScreen list' }).nth(3)).not.toBeVisible()
})
