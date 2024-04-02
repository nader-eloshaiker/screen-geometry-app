import { expect, test } from '@playwright/test'

test('Smoke Test Screens Page', async ({ page }) => {
  // Load Page and Naviate to Screens
  await page.goto('/')
  await page.getByRole('link', { name: 'Screens' }).click()

  // Does the skeleton loader show up?
  await expect(page.getByTestId('SkeletonTableRow')).toHaveCount(5)
  await expect(page.getByTestId('SkeletonImage')).toBeVisible()

  // Load default table and check for button spinner
  await expect(page.getByRole('button', { name: 'Load Screens' })).toBeVisible()
  await page.getByRole('button', { name: 'Load Screens' }).click()
  await expect(page.getByTestId('ButtonSpinner')).toBeVisible()
  await expect(page.locator('div').filter({ hasText: 'CreatedScreen list' }).nth(3)).toBeVisible()

  // Check for table data
  const tableOriginal = await page.getByTestId('ScreenTable')
  await expect(tableOriginal.locator('tbody > tr')).toHaveCount(6)
  await expect(tableOriginal).toContainText('49"')
  await expect(tableOriginal).toContainText('40"')
  await expect(tableOriginal).toContainText('38"')
  await expect(tableOriginal).toContainText('34"')
  await expect(tableOriginal).toContainText('32"')
  await expect(tableOriginal).toContainText('27"')

  // Delete row and check for count
  await page.getByRole('row', { name: 'show checkbox 27" 16:9 24" x' }).getByLabel('delete button').click()

  // Check for table data
  const tableDeletedRow = await page.getByTestId('ScreenTable')
  await expect(tableDeletedRow.locator('tbody > tr')).toHaveCount(5)
  await expect(tableDeletedRow).not.toContainText('27"')

  // Create new row and check for count
  await page.getByRole('button', { name: 'Create Screen' }).click()
  await page.getByPlaceholder('Type to filter list...').click()
  await page.getByPlaceholder('Type to filter list...').fill('27')
  await page.getByText('4K UHD 27" 3840x2160 16:').click()
  await page.getByRole('button', { name: 'Create', exact: true }).click()
  await page.getByRole('button', { name: 'Close' }).click()

  // Check for table data
  const tableAddedRow = await page.getByTestId('ScreenTable')
  await expect(tableAddedRow.locator('tbody > tr')).toHaveCount(6)

  // Edit row and check for updated row
  await page.getByRole('row', { name: 'show checkbox 32" 16:9 28" x' }).getByLabel('edit button').click()
  await page.getByLabel('Screen Size').click()
  await page.getByLabel('Screen Size').dblclick()
  await page.getByLabel('Screen Size').click()
  await page.getByLabel('Screen Size').fill('31')
  await page.getByRole('button', { name: 'Update' }).click()

  // Check for table data
  const tableUpdatedRow = await page.getByTestId('ScreenTable')
  await expect(tableUpdatedRow.locator('tbody > tr')).toHaveCount(6)
  await expect(tableUpdatedRow).toContainText('31"')
  await expect(tableUpdatedRow).not.toContainText('32"')

  /**
   * Test for Screen Panel
   **/

  const showCheckbox = await page.getByRole('row', { name: 'show checkbox 49" 32:9 47" x' }).getByLabel('show checkbox')

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
