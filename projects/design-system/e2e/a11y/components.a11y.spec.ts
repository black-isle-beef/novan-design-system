import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Runs an automated WCAG 2.1 AA scan (via axe-core) against a built Storybook
 * story rendered in isolation (`iframe.html?id=...&viewMode=story`).
 */
async function expectNoA11yViolations(page: import('@playwright/test').Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  await page.waitForSelector('#storybook-root', { state: 'attached' });

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}

test.describe('WCAG 2.1 AA accessibility', () => {
  test('DsHeroComponent (Primary) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'layout-hero--primary');
  });

  test('DsMainNavComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'layout-mainnav--default');
  });

  test('DsHeaderComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'layout-header--default');
  });

  test('DsFooterComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'layout-footer--default');
  });

  test('DsSidebarComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'layout-sidebar--default');
  });

  test('DsCookieBannerComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'layout-cookiebanner--default');
  });
});
