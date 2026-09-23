import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Runs an automated WCAG 2.1 AA scan (via axe-core) against a built Storybook
 * story rendered in isolation (`iframe.html?id=...&viewMode=story`).
 */
async function expectNoA11yViolations(page: import('@playwright/test').Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  await page.waitForSelector('#storybook-root', { state: 'attached' });
  await disableTransitions(page);

  // Native <dialog>/popover stories (modal, offcanvas, dropdown, tooltip)
  // open via a JS call that triggers focus-trap setup and an initial style
  // recalculation; scanning on the same tick as `waitForSelector` can catch
  // that first paint before it settles. A double rAF forces the browser to
  // complete a full render cycle first, deterministically, without an
  // arbitrary timeout.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      })
  );
  await page.waitForTimeout(300);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}

/**
 * Bootstrap's `.btn` (and other) hover/focus-visible states cross-fade color
 * and background-color over ~150ms. `reducedMotion: 'reduce'` in the
 * Playwright config only emulates the `prefers-reduced-motion` media feature
 * — it doesn't itself freeze transitions that aren't explicitly gated behind
 * that query, and most of Bootstrap's own base transitions aren't. Axe can
 * therefore sample color-contrast mid-crossfade and report a transient,
 * non-representative "violation" for colors that never appear in any
 * settled state. Forcing all transitions/animations to be instant before
 * scanning removes that entire class of flake.
 */
async function disableTransitions(page: import('@playwright/test').Page): Promise<void> {
  await page.addStyleTag({
    content: '*, *::before, *::after { transition: none !important; animation: none !important; }',
  });
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

  test('DsAccordionItemComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-disclosure-accordion--default');
  });

  test('DsAlertComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-feedback-alert--default');
  });

  test('DsAlertComponent (Dismissible) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-feedback-alert--dismissible');
  });

  test('DsBadgeComponent (Dismissible) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-content-badge--dismissible');
  });

  test('DsDropdownComponent (Default, closed) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-overlay-dropdown--default');
  });

  test('DsDropdownComponent menu has no violations once opened', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dropdown--default&viewMode=story');
    await disableTransitions(page);
    await page.getByRole('button', { name: 'Actions' }).click();
    await expect(page.getByRole('menu')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('DsOffcanvasComponent (Default, open) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-overlay-offcanvas--default');
  });

  test('DsPaginationComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-navigation-pagination--default');
  });

  test('DsProgressComponent (WithVisibleValue) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-feedback-progress--with-visible-value');
  });

  test('DsTabsComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-navigation-tabs--default');
  });

  test('DsToastComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-feedback-toast--default');
  });

  test('DsTooltipComponent (Default, closed) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-overlay-tooltip--default');
  });

  test('DsTooltipComponent popup has no violations once shown on focus', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-tooltip--default&viewMode=story');
    await disableTransitions(page);
    await page.getByRole('button', { name: 'Save draft' }).focus();
    await expect(page.getByRole('tooltip')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('DsFlipCardComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-content-flip-card--default');
  });

  test('DsCardComponent (WithFooterActions) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-content-card--with-footer-actions');
  });
});
