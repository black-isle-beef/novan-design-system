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
  test('Button Bootstrap variants have no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-buttons--bootstrap-variants');
  });

  test('DsHeroComponent (Primary) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-hero--primary');
  });

  test('DsImageBannerComponent (ImageLeft) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-image-banner--image-left');
  });

  test('DsImageBannerComponent (ImageRight) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-image-banner--image-right');
  });

  test('DsImageBannerComponent (Sweep) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-image-banner--sweep');
  });

  test('DsImageBannerComponent (ImageOnlyPill) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-image-banner--image-only-pill');
  });

  test('DsMainNavComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-navigation-nav-bar--default');
  });

  test('DsHeaderComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-structural-header--default');
  });

  test('DsFooterComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-structural-footer--default');
  });

  test('DsSidebarComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-navigation-sidebar--default');
  });

  test('DsCookieBannerComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-cookiebanner--default');
  });

  test('DsBreadcrumbComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-navigation-breadcrumb--default');
  });

  test('DsFormsComponent (Showcase Dashboard) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-forms-showcase-dashboard--default');
  });

  test('DsTextInputComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-forms-text-input--default');
  });

  test('DsFormSelectComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-forms-form-select--default');
  });

  test('DsFormValidationComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-global-forms-form-validation--default');
  });

  test('DsLandingPageComponent template (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'templates-landing-page--default');
  });

  test('DsModalComponent (Default, open) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-overlay-modal--default');
  });

  test('DsModalComponent (WithFooterActions) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-overlay-modal--with-footer-actions');
  });
});
