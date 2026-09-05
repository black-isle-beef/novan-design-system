---
name: storybook-add-subtitle-description
description: "Use when a design-system component's Storybook autodocs page is missing a subtitle/description on its Docs page. Adds `parameters.docs.subtitle` and `parameters.docs.description.component` to any `*.stories.ts` file that doesn't already set them."
---

# Add Storybook Subtitle And Description

Act as a Principal Frontend Engineer maintaining `@black-isle-beef/novan-design-system`'s Storybook docs. This skill finds every component story file that is missing autodocs subheading/description text and adds it, without altering component behavior, existing args, or unrelated parameters.

## Why This Is Needed

The autodocs template renders `Title`, `Subtitle`, `Description`, `Primary`, `Controls`, `Stories` in that order. In this workspace:

- **`compodoc` is disabled** (see `.storybook/main.ts` / `angular.json` — compodoc errors on this Angular/Storybook version), so the `Description` block's usual fallback of reading JSDoc comments off the component class **does not work**. Without an explicit parameter, the Description block renders nothing.
- `Subtitle` has no JSDoc fallback at all — it only ever reads `parameters.docs.subtitle`.

So any component whose `.stories.ts` meta does not set `parameters.docs.subtitle` and `parameters.docs.description.component` will show a bare title with no subheading or description on its Docs page, even if the component class has a JSDoc comment.

## Step 1: Find Components Missing Docs Text

Every component's stories live at `projects/design-system/src/lib/components/*/*.component.stories.ts`. For each one, check whether the default-exported `meta` object already sets both:

```ts
parameters: {
  docs: {
    subtitle: '...',
    description: { component: '...' },
  },
},
```

Skip files that already set both. A file that only has `parameters: { layout: 'fullscreen' }` (or similar, from other work in this repo) still counts as missing — merge into the existing `parameters` object, do not replace it.

## Step 2: Source The Text

For each component missing docs text:

1. Open the sibling `<name>.component.ts` and read the JSDoc comment directly above the `@Component` class (every existing component in this library has one, e.g. `DsFooterComponent`, `DsHeroComponent`). This is the canonical description of what the component does and how it behaves — reuse it verbatim (reflowed to normal sentence spacing) as `description.component`. Do not invent new behavioral claims not already documented in the class JSDoc.
2. Derive `subtitle` as a short (roughly 3–8 word) tagline distinct from the description — usually the first clause of the JSDoc comment, or a plain restatement of the component's role (e.g. "Responsive multi-column footer", "Primary site navigation bar"). It must not just repeat the full description sentence.
3. If a component class has no JSDoc comment at all, do not fabricate a description of internal behavior you haven't verified — read the component's `.html` and inputs/outputs first, then write a factual one-to-two sentence description limited to what the template and public API actually do.

## Step 3: Apply The Parameter

Add or extend `parameters.docs` on the `meta` object. Preserve any existing `parameters` keys (e.g. `layout`) and any existing comment directly above `parameters` that explains an unrelated concern (e.g. the cookie-banner's `position: fixed` Docs-height comment) — append, don't delete.

```ts
const meta: Meta<DsFooterComponent> = {
  title: 'Components/Structural/Footer',
  component: DsFooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'Responsive multi-column footer',
      description: {
        component:
          'Multi-column responsive footer with grouped links, a copyright notice, and a slot for additional legal disclaimers.',
      },
    },
  },
  args: { /* ...unchanged... */ },
};
```

Do not touch `args`, `argTypes`, `decorators`, `render`, or individual named `Story` exports — this skill only adds docs subtitle/description metadata.

## Step 4: Validate

After editing all applicable files (on Windows PowerShell, use `npm.cmd` and `npx.cmd`):

```powershell
npm.cmd run build-storybook
```

Then spot-check at least one edited component's Docs page (`storybook-static/index.html?path=/docs/<story-id>--docs`) to confirm the Subtitle and Description now render under the title, and confirm an untouched component (if any remain) is unaffected. Re-run the existing suites to confirm no regressions:

```powershell
npx.cmd ng test design-system --watch=false
npx.cmd playwright test
```

## Completion Criteria

Every component's `.stories.ts` meta sets both `parameters.docs.subtitle` and `parameters.docs.description.component`, sourced from the component's own JSDoc (or a verified factual description when no JSDoc exists), with all pre-existing parameters, comments, args, and stories left intact. `build-storybook`, unit tests, and the Playwright a11y suite all still pass.
