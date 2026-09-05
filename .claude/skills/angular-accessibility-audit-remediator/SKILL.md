---
name: angular-accessibility-audit-remediator
description: "Use when auditing and fixing accessibility in this Angular design system, including semantic HTML, ARIA, keyboard interaction, focus management, contrast, Storybook coverage, Axe/Playwright checks, and accessible component APIs."
---

# Angular Accessibility Audit and Remediation

Act as a Principal Accessibility Engineer for this Angular design system. Perform a full accessibility audit, fix confirmed failures in the repository, and verify the repaired experience. Work directly in the codebase; do not merely propose patches.

If the user passed an argument, treat it as the audit scope (a component, a story, or a slice). With no argument, audit the whole public component surface.

Automated checks are necessary but incomplete. A clean Axe run is not proof of WCAG conformance. Combine static inspection, rendered Axe scans, keyboard checks, and a review of component APIs and states.

## Repository Context

- The Angular library lives in `projects/design-system` and exports from `projects/design-system/src/public-api.ts`.
- Storybook is built through the Angular architect target. Use `npm.cmd run build-storybook`, never the raw Storybook CLI.
- Playwright Axe tests live in `projects/design-system/e2e/a11y/` and run against built `storybook-static` through `npm.cmd run test:a11y`.
- Storybook addon accessibility auto-tests are intentionally disabled in `.storybook/preview.ts`; the Playwright Axe suite is the automated accessibility gate.
- On Windows PowerShell, use `npm.cmd` and `npx.cmd` to avoid execution-policy failures.

## Guardrails

- Inspect the current worktree before editing. Preserve unrelated user changes and do not modify `node_modules`, `dist`, `.angular`, `storybook-static`, or `test-results`.
- Use the Edit tool for source edits. Do not use broad search-and-replace or regex-only transformations that can alter Angular template semantics.
- Keep public selectors, component inputs/outputs, routes, visible labels, and behavior stable unless accessibility requires a deliberate, reported API change.
- Fix root causes rather than suppressing Axe rules, adding invalid ARIA, removing focus outlines, or using `aria-hidden` to conceal meaningful content.
- Do not invent alt text, labels, legal copy, or product claims. For an ambiguous image or icon, identify the product decision required and make only safe code changes.
- Audit one logical component or shared-style slice at a time. After the first substantive edit, run the narrowest validation that can disprove the fix before touching another slice.
- Treat static matches and automated violations as evidence, not proof. Verify every finding in source and rendered context; record false positives and intentional exceptions.

## Step 1: Establish the Baseline

1. Inspect `git status --short` and identify user changes to preserve.
2. Read the component/template/style, its unit tests, its stories, and any related Playwright test before editing.
3. Run the existing automated gate from the repository root:

```powershell
npm.cmd run test:a11y
```

4. Capture every Axe violation with its rule ID, impact, affected story URL, target, and help text. Do not truncate the output.
5. Run static searches for likely issues, then inspect every match in context. Examples:

```powershell
rg -n "\*ngIf|\*ngFor|\*ngSwitch|\(click\)=|tabindex=|role=|aria-|<img|<button|<a\b|<input|<select|<textarea" src projects/design-system/src
rg -n "outline:\s*(0|none)|user-select:\s*none|pointer-events:\s*none" src projects/design-system/src
```

6. Categorize confirmed findings under: semantics and landmarks; names, roles, and values; keyboard interaction; focus and dialogs; visual contrast and non-color cues; forms and error messaging; media; responsive and zoom behavior; and test/story coverage.

Before editing, report the count per category, the affected components/stories, and all false positives or intentional exceptions.

## Step 2: Audit Every Component State

For each public component, inspect the default story plus every meaningful variant, size, disabled, loading, error, empty, expanded/collapsed, and projected-content state. A component state missing a story is untested until a representative story is added.

Verify each of the following:

### Semantics and landmarks

- Use native `button`, `a`, `input`, `select`, `textarea`, `label`, `nav`, `main`, `header`, `footer`, `section`, `article`, `dialog`, and list elements when they model the interaction.
- Do not add ARIA roles that duplicate or conflict with native semantics. Prefer a native element over `role="button"`, `role="link"`, or manual keyboard handlers.
- Give every page or composed story one coherent landmark structure. Label multiple landmarks of the same type.
- Preserve logical heading order. Do not select a heading level only for its visual style.

### Accessible names, roles, and states

- Ensure every interactive control has an accessible name from visible text, an associated `<label>`, `aria-label`, or `aria-labelledby`.
- Use concise, accurate alternative text for meaningful images; use `alt=""` for decorative images. Do not use the filename, "image", or redundant text already adjacent to the image.
- Bind dynamic ARIA state directly to Angular signals. Do not stringify or duplicate state in imperative DOM code.

```ts
readonly expanded = signal(false);
readonly disabled = input(false);

@Component({
  // ...
  host: {
    '[attr.aria-disabled]': 'disabled()',
  },
})
export class DsDisclosureComponent {
  protected readonly expanded = signal(false);
}
```

```html
<button
  type="button"
  [attr.aria-expanded]="expanded()"
  [attr.aria-controls]="panelId"
  [disabled]="disabled()"
  (click)="expanded.update((value) => !value)"
>
  <ng-content select="[dsDisclosureLabel]"></ng-content>
</button>
@if (expanded()) {
  <section [id]="panelId"><ng-content></ng-content></section>
}
```

- Use `aria-busy` only while a region is genuinely loading. Pair a meaningful loading announcement with appropriate live-region behavior when the update is not otherwise obvious.
- Do not use `aria-label` to override clear visible text with different wording.

### Keyboard and focus

- Verify Tab and Shift+Tab order follows visual and DOM order without keyboard traps.
- Verify native controls retain their standard Enter and Space behaviors. Custom widgets must implement the relevant WAI-ARIA keyboard pattern completely, including Escape, arrow keys, Home, and End where required.
- Use `:focus-visible` for a visible focus indicator. Never remove the outline without a token-driven replacement of equal or better visibility.
- For dialogs, menus, disclosures, and banners, move focus only when the pattern requires it, retain focus appropriately while open, and restore it to the invoking control on close.
- Do not make a non-interactive element focusable merely to satisfy a test.

### Visual and responsive access

- Check default, hover, focus, active, disabled, error, and selected states. Never make color the only indicator of status or validation.
- Use semantic design tokens for foregrounds, backgrounds, borders, and focus rings. Do not introduce raw colors to work around contrast failures.
- Preserve content and operability at $200\%$ browser zoom, with text spacing overrides, narrow viewports, reduced motion, and Windows forced-colors mode where applicable.
- Keep touch targets practical and ensure labels do not overlap or clip at responsive breakpoints.
- Respect `prefers-reduced-motion` for nonessential animations and transitions.

### Forms and errors

- Associate each control with a visible label. Use `for` and `id` for native form fields; do not depend on placeholder text as a label.
- Connect help text and validation errors through `aria-describedby` only when that relationship is useful.
- Identify invalid values with `aria-invalid` and an accessible error message. Announce asynchronous validation or submission results when users need notification.
- Retain user-entered values and focus location when validation fails unless the interaction pattern requires a different outcome.

## Step 3: Implement Behavior-Preserving Fixes

Apply fixes in dependency order: shared token/global style defects, shared components, then individual component states and stories.

1. Make the smallest semantic, template, TypeScript, SCSS, test, and story updates necessary to correct one confirmed issue.
2. Use standalone Angular APIs and signals for new or updated component state. Keep template bindings declarative.
3. Add or update a focused unit test for rendered semantic elements, signals driving ARIA state, emitted events, and lifecycle/focus behavior where applicable.
4. Add a Storybook story for every repaired state so the story is a stable rendered fixture for Playwright.
5. Add or extend Playwright coverage for behavior Axe cannot prove, including keyboard interaction, focus restoration, and meaningful state transitions.

Use semantic Playwright locators, not brittle class or CSS selectors:

```ts
test('returns focus to the trigger after the banner closes', async ({ page }) => {
  await page.goto('/iframe.html?id=layout-cookiebanner--default&viewMode=story');
  const acceptButton = page.getByRole('button', { name: 'Accept' });

  await acceptButton.focus();
  await acceptButton.press('Enter');

  await expect(acceptButton).toBeFocused();
});
```

Do not add redundant ARIA attributes merely because an audit is quiet. Use `role="status"`, `role="alert"`, `aria-live`, or `aria-modal` only when the behavioral contract actually needs them.

## Step 4: Focused Verification Loop

After each logical slice, validate before expanding scope:

1. Run its closest unit test file, such as:

```powershell
npx.cmd ng test design-system --watch=false
```

2. Run the targeted Playwright test or test name when a browser behavior changed:

```powershell
npx.cmd playwright test projects/design-system/e2e/a11y/components.a11y.spec.ts
```

3. Rebuild Storybook after story, template, or global-style changes:

```powershell
npm.cmd run build-storybook
```

4. Rerun the relevant Axe scan and verify the previous violation is gone without introducing regressions.

If a fix fails, repair the same slice and rerun the same focused check. Do not proceed to unrelated components while it is failing.

## Step 5: Full Validation

When all confirmed issues are fixed, run these from the repository root in order:

```powershell
npm.cmd run build:tokens
npm.cmd run test:lib
npm.cmd run lint:ts
npm.cmd run lint:scss
npm.cmd run build:app
npm.cmd run build:lib
npm.cmd run test:a11y
```

If a command fails for a pre-existing unrelated reason, report it precisely with the owning file or configuration and do not claim that validation passed.

## Required Completion Output

Report findings first, ordered by severity. Then provide a concise file-by-file change report with the violation category, behavior-preserving fix, and focused validation for each affected file.

Finish with:

- baseline and final counts by accessibility category;
- every remaining finding, false positive, and intentional exception;
- Storybook coverage added or still missing;
- unit, lint, application/library build, and accessibility-test results;
- explicit product decisions that could not be safely inferred.

Never claim full WCAG conformance based only on automated tools. State the scope actually tested, including the rendered stories, browser, viewport conditions, and manual keyboard checks performed.
