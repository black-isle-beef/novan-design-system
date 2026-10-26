import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Runs an automated WCAG 2.1 AA scan (via axe-core) against a built Storybook
 * story rendered in isolation (`iframe.html?id=...&viewMode=story`).
 */
async function expectNoA11yViolations(page: import('@playwright/test').Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  await page.waitForSelector('#storybook-root', { state: 'attached' });
  // An unknown story id renders Storybook's error page, which Axe passes
  // trivially; fail loudly instead of reporting a vacuous "no violations".
  await expect(page.locator('#storybook-root > *').first(), `story "${storyId}" did not render`).toBeAttached();
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

  // The collapsed rail is only reachable by interaction, so no story renders it directly.
  test('DsSidebarComponent keeps its links named and passes Axe once collapsed', async ({ page }) => {
    await page.goto('/iframe.html?id=components-navigation-sidebar--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'attached' });
    await disableTransitions(page);
    // Let the Storybook a11y addon's own scan finish first ("Axe is already running").
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Collapse sidebar' }).click();
    const toggle = page.getByRole('button', { name: 'Expand sidebar' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    const sidebar = page.getByRole('navigation', { name: 'Sidebar' });
    for (const name of ['Dashboard', 'Projects', 'Team', 'Settings']) {
      await expect(sidebar.getByRole('link', { name })).toBeVisible();
    }

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('DsCookieBannerComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-structural-cookiebanner--default');
  });

  test('DsCookieBannerComponent (Consent) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-structural-cookiebanner--consent');
  });

  test('DsBreadcrumbComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-navigation-breadcrumb--default');
  });

  test('DsFormsComponent (Showcase Dashboard) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-forms-showcase-dashboard--default');
  });

  test('DsTextInputComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-forms-text-input--default');
  });

  test('DsFormSelectComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-forms-form-select--default');
  });

  test('DsFormValidationComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-forms-form-validation--default');
  });

  for (const story of [
    'checkboxes-switches',
    'radio-buttons',
    'control-sizes-file-color',
    'input-group',
    'range-slider',
    'form-layout',
  ]) {
    test(`Forms ${story} (Default) has no violations`, async ({ page }) => {
      await expectNoA11yViolations(page, `components-forms-${story}--default`);
    });
  }

  // Label in Name (WCAG 2.5.3): the accessible name must contain the visible label, so an aria-label must not replace it.
  test('Forms controls are named by their visible labels', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-form-select--default&viewMode=story');
    await expect(page.getByRole('combobox', { name: 'Standard Single Select' })).toBeVisible();
    await expect(page.getByRole('listbox', { name: 'Multi-Select Control' })).toBeVisible();

    await page.goto('/iframe.html?id=components-forms-input-group--default&viewMode=story');
    await expect(page.getByRole('textbox', { name: 'Suffix Addon' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Segmented Action Button Addon' })).toBeVisible();
  });

  test('DsFormValidationComponent reports errors on an invalid submit without moving focus', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-form-validation--default&viewMode=story');
    const submit = page.getByRole('button', { name: 'Submit Registration' });
    await expect(submit).toBeEnabled();

    await submit.focus();
    await submit.press('Enter');

    await expect(page.getByRole('textbox', { name: /Email Address/ })).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('Email address is required.')).toBeVisible();
    await expect(submit).toBeFocused();
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

  test('DsAccordionComponent (SingleOpen) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-disclosure-accordion--single-open');
  });

  // jsdom doesn't implement `<details name>` exclusivity, so the single-open
  // behavior is checked here in a real browser.
  test('DsAccordionComponent opening one item closes the others', async ({ page }) => {
    await page.goto('/iframe.html?id=components-disclosure-accordion--single-open&viewMode=story');
    const items = page.locator('details.accordion-item');
    await expect(items.nth(0)).toHaveAttribute('open', '');

    await page.getByText('Can I change plans later?').click();

    await expect(items.nth(1)).toHaveAttribute('open', '');
    await expect(items.nth(0)).not.toHaveAttribute('open', '');
    await expect(items.nth(2)).not.toHaveAttribute('open', '');
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

  test('DsPaginationComponent keeps focus on Previous after reaching the first page', async ({ page }) => {
    await page.goto('/iframe.html?id=components-navigation-pagination--interactive&viewMode=story');
    const page2 = page.getByRole('button', { name: 'Page 2', exact: true });
    await page2.click();
    await expect(page2).toHaveAttribute('aria-current', 'page');
    const previous = page.getByRole('button', { name: 'Previous page' });
    await previous.focus();

    await previous.press('Enter');

    await expect(page.getByRole('button', { name: 'Page 1', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(previous).toHaveAttribute('aria-disabled', 'true');
    await expect(previous).toBeFocused();
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
    const trigger = page.getByRole('button', { name: 'Save draft' });
    await trigger.focus();
    await expect(page.getByRole('tooltip')).toBeVisible();
    // The description must land on the focused control itself, not its <ds-tooltip> wrapper.
    await expect(trigger).toHaveAccessibleDescription('Saves your current draft');

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('DsTooltipComponent stays open while the pointer moves onto the popup', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-tooltip--default&viewMode=story');
    await disableTransitions(page);
    const trigger = page.getByRole('button', { name: 'Save draft' });
    await trigger.hover();
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeVisible();

    // Cross the gap between trigger and popup the way a real pointer does, rather than jumping straight onto it.
    const triggerBox = (await trigger.boundingBox())!;
    const tooltipBox = (await tooltip.boundingBox())!;
    const x = triggerBox.x + triggerBox.width / 2;
    await page.mouse.move(x, (tooltipBox.y + tooltipBox.height + triggerBox.y) / 2);
    await page.waitForTimeout(50);
    await page.mouse.move(x, tooltipBox.y + tooltipBox.height / 2);

    await expect(tooltip).toBeVisible();
  });

  test('DsFlipCardComponent (Default) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-content-flip-card--default');
  });

  test('DsCardComponent (WithFooterActions) has no violations', async ({ page }) => {
    await expectNoA11yViolations(page, 'components-content-card--with-footer-actions');
  });
});

test.describe('Charcoal & Copper theme: WCAG 2.1 AA accessibility', () => {
  for (const story of ['header', 'cookie-banner', 'buttons', 'form-controls', 'alert', 'badge', 'progress', 'toast', 'modal', 'sidebar']) {
    test(`${story} has no violations`, async ({ page }) => {
      await expectNoA11yViolations(page, `themes-charcoal-copper--${story}`);
      await expect(page.locator('html')).toHaveAttribute('data-ds-theme', 'copper');
    });
  }

  // The stories above are scanned one at a time; the Docs page shows them all at
  // once, where inline rendering once put the theme's light text on Storybook's
  // white docs canvas. Each story must render in its own themed iframe there.
  test('Docs page renders every story in its own themed iframe', async ({ page }) => {
    await page.goto('/iframe.html?id=themes-charcoal-copper--docs&viewMode=docs');
    // Ten stories, plus the Docs page's primary preview of the first one.
    const frames = page.locator('iframe[src*="themes-charcoal-copper--"]');
    await expect(frames).toHaveCount(11);

    const modal = page.frameLocator('iframe[src*="themes-charcoal-copper--modal"]');
    await expect(modal.getByRole('dialog', { name: 'Dismiss the checklist?' })).toBeVisible();
    const buttons = page.frameLocator('iframe[src*="themes-charcoal-copper--buttons"]');
    await expect(buttons.getByRole('button', { name: 'Save draft' })).toBeVisible();
    await expect(buttons.locator('html')).toHaveAttribute('data-ds-theme', 'copper');

    const results = await new AxeBuilder({ page })
      .include('iframe[src*="themes-charcoal-copper--"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('header (app variant) keeps its menu reachable below md', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto('/iframe.html?id=themes-charcoal-copper--header&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'attached' });
    await disableTransitions(page);
    // Let the Storybook a11y addon's own scan finish first ("Axe is already running").
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Open main menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Pages' })).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('primary buttons fall back to solid copper with a border under prefers-contrast: more', async ({ page }) => {
    await page.emulateMedia({ contrast: 'more' });
    await page.goto('/iframe.html?id=themes-charcoal-copper--buttons&viewMode=story');
    const button = page.getByRole('button', { name: 'Publish' });
    await expect(button).toHaveCSS('background-image', 'none');
    await expect(button).toHaveCSS('border-top-color', 'rgb(255, 255, 255)');
  });
});
