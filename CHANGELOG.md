# Changelog

All notable changes to `@black-isle-beef/novan-design-system` are documented here.

## [2.4.0](https://github.com/black-isle-beef/novan-design-system/compare/v2.3.0...v2.4.0) (2026-09-23)

### Features

* enhance form validation with ARIA attributes and improve accessibility in header component ([53710cd](https://github.com/black-isle-beef/novan-design-system/commit/53710cdd490ead0c29a6187ee1a7660cd49f440c))
* implement dark mode support and add example section for live preview ([15656ae](https://github.com/black-isle-beef/novan-design-system/commit/15656aef320e3236f03e37057752c96332b2014d))

## [2.3.0](https://github.com/black-isle-beef/novan-design-system/compare/v2.2.0...v2.3.0) (2026-09-21)

### Features

* add fixed height for split layout images in image banner component ([1a2a2ed](https://github.com/black-isle-beef/novan-design-system/commit/1a2a2ed74f5efda05e877092f995bc9e99c5e3d1))

## [2.2.0](https://github.com/black-isle-beef/novan-design-system/compare/v2.1.0...v2.2.0) (2026-09-20)

### Features

* enhance accessibility by updating aria-labelledby and adding unique heading IDs ([98c3a2a](https://github.com/black-isle-beef/novan-design-system/commit/98c3a2a07b320b1ae2c246fd91fc78345aa5928c))

## [2.1.0](https://github.com/black-isle-beef/novan-design-system/compare/v2.0.0...v2.1.0) (2026-09-19)

### Features

* add new favicon images in various sizes ([42f1fbe](https://github.com/black-isle-beef/novan-design-system/commit/42f1fbe43347d79706fab1d7e5bf7dd8a88cc609))

## [2.0.0](https://github.com/black-isle-beef/novan-design-system/compare/v1.1.0...v2.0.0) (2026-09-19)

### ⚠ BREAKING CHANGES

* **nav:** ds-sidebar, ds-breadcrumb, ds-footer, and ds-main-nav now
render internal hrefs via Angular's RouterLink instead of a plain anchor
href, and require Router to be provided in the host application (e.g. via
provideRouter(...) or RouterModule). Applications using these components
without Router configured will fail to navigate on internal links.

This release also adds 9 new components since v1.0.0: Modal, Offcanvas,
Toast, Tooltip, Dropdown, Tabs, Accordion, Alert, Card/FlipCard, Badge,
and Pagination/Spinner/Progress, along with new elevation and motion
design tokens. These were previously released under a minor version
without the breaking navigation change being reflected; this commit
corrects the semver classification going forward.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

### Features

* **nav:** require Angular Router for internal links in nav components; add 9 new components ([43b2ecd](https://github.com/black-isle-beef/novan-design-system/commit/43b2ecd0c1afb72b09c7a51158217aabfbdc95bb))

### Bug Fixes

* **button:** raise disabled-state opacity to preserve AA contrast ([1ceefc6](https://github.com/black-isle-beef/novan-design-system/commit/1ceefc697f049dbcde54d092b9e6fc978d1b417a))
* **modal,offcanvas:** honor prefers-reduced-motion for open animations ([eb1a94a](https://github.com/black-isle-beef/novan-design-system/commit/eb1a94ae5066408d013a6f3f0993d502c34e94c2))

## [1.1.0](https://github.com/black-isle-beef/novan-design-system/compare/v1.0.0...v1.1.0) (2026-09-19)

### Features

* **alert:** add DsAlertComponent with template, styles, tests, and stories ([820d884](https://github.com/black-isle-beef/novan-design-system/commit/820d8846d84ba5658ab15202734e0ad3a6c70450))
* **badge:** add DsBadgeComponent with dismissible functionality, styles, tests, and stories ([f49cda7](https://github.com/black-isle-beef/novan-design-system/commit/f49cda777cc52ddd2f9744acbac0cd735ce8165d))
* **card:** introduce DsCard and DsFlipCard components with associated styles, stories, and tests ([5a2b497](https://github.com/black-isle-beef/novan-design-system/commit/5a2b497fc5f002a29aa48513ca48f121bfe0c456))
* **dropdown:** add DsDropdownComponent and DsMenuItemComponent with templates, styles, and tests ([ef11927](https://github.com/black-isle-beef/novan-design-system/commit/ef11927607aa61e5c014675563bcd294decd3b17))
* **modal:** implement DsModalComponent with elevation and motion tokens ([74d4965](https://github.com/black-isle-beef/novan-design-system/commit/74d4965bfca4b9ace29a3592a24a959b52da585c))
* **offcanvas:** add DsOffcanvasComponent with template, styles, tests, and stories ([5905923](https://github.com/black-isle-beef/novan-design-system/commit/5905923cf8f61c6424a408dfb28e9bf69815b1e1))
* **pagination:** add DsPaginationComponent with template, styles, tests, and stories ([d024626](https://github.com/black-isle-beef/novan-design-system/commit/d02462628fc9fe5e99a6bf18c1a4f597fbbdf9b8))
* **pagination:** enhance tests for DsPaginationComponent with improved element selection ([7d6044b](https://github.com/black-isle-beef/novan-design-system/commit/7d6044b2b7c609843a7df883159cb6f59942d02d))
* **progress:** add DsProgressComponent and DsSpinnerComponent with templates, styles, tests, and stories ([6caa1eb](https://github.com/black-isle-beef/novan-design-system/commit/6caa1ebf263c8d736c9d85f931aeb54529e8982d))
* **release:** add skill for automated design system release process ([0c19194](https://github.com/black-isle-beef/novan-design-system/commit/0c19194c498197090cccac2638a887a3bf77170a))
* **styles:** add missing global styles for app layout and theme toggle ([8dc2d9f](https://github.com/black-isle-beef/novan-design-system/commit/8dc2d9fa21a7959036417c70d743d96dccea0834))
* **tabs:** add DsTabsComponent and DsTabComponent with templates, styles, and tests ([b493d43](https://github.com/black-isle-beef/novan-design-system/commit/b493d431eac7f3d27ace2410b49f27c6788efa7e))
* **toast:** add DsToastComponent and DsToastContainerComponent with service and styles ([f51bb92](https://github.com/black-isle-beef/novan-design-system/commit/f51bb921130c19163c836d1c46d2a7776aec4c76))
* **tokens,modal:** add elevation/motion tokens and a DsModalComponent ([23aca1d](https://github.com/black-isle-beef/novan-design-system/commit/23aca1df4dab08db2c3e0b0b5b33c49d124c3011))
* **tooltip:** add DsTooltipComponent with template, styles, and tests ([50ddc40](https://github.com/black-isle-beef/novan-design-system/commit/50ddc40c2a04d0acb22253d1556889f91adaabc4))

### Bug Fixes

* **badge:** correct casing for currentColor in hover and focus-visible styles ([df57230](https://github.com/black-isle-beef/novan-design-system/commit/df572309a3de246ed90783da239c86c8e11b9427))
* **modal, offcanvas:** update ESLint comments for backdrop click handling ([a9898b2](https://github.com/black-isle-beef/novan-design-system/commit/a9898b204c5ea264625a2ada18143b2af248cb2c))
* update package-lock and package.json for patch-package integration; add test setup for Vitest ([da490a9](https://github.com/black-isle-beef/novan-design-system/commit/da490a9e5e693e7dc5525f202a07e4c5f57c9dca))

## 1.0.0 (2026-09-13)

### Features

* **a11y:** enable accessibility checks for all stories in Storybook ([70c7d62](https://github.com/black-isle-beef/novan-design-system/commit/70c7d6214a437bf135498dca0f53e720a9c3f223))
* **a11y:** enable automated accessibility checks in Storybook ([cc6d0f7](https://github.com/black-isle-beef/novan-design-system/commit/cc6d0f745992e446155182aac286ad1d0a0b88da))
* add Bootstrap Icons support and update sidebar component for improved accessibility ([20c6128](https://github.com/black-isle-beef/novan-design-system/commit/20c6128eeb85aa38633f17492df239da9bd5bf78))
* add brand color palette component with role assignment functionality and live demo ([1ed964b](https://github.com/black-isle-beef/novan-design-system/commit/1ed964b40234beb2f760e25fbc349bd5a52df7d0))
* add design tokens foundation component with styling, testing, and documentation ([f2df83d](https://github.com/black-isle-beef/novan-design-system/commit/f2df83df154982ecc1825913847dc5c7520979cb))
* add DsBreadcrumbComponent with accessibility features and styles ([0bc435d](https://github.com/black-isle-beef/novan-design-system/commit/0bc435d4b0696ec2fe2745d5b56d69939cc2db1a))
* add GettingStarted.md and update story order in Storybook configuration ([c420e6f](https://github.com/black-isle-beef/novan-design-system/commit/c420e6f544bdee674e5e1c99b163a5e24c74b941))
* add Introduction.md and enhance component stories with accessibility descriptions ([f008fb6](https://github.com/black-isle-beef/novan-design-system/commit/f008fb6d80d6253fce0d9c33219bd73fed9ead3e))
* add landing page template with navigation and footer components ([b44aff9](https://github.com/black-isle-beef/novan-design-system/commit/b44aff94660253229e122c8cd0a97f300235b53e))
* add main entry point for Angular application ([52ef8bb](https://github.com/black-isle-beef/novan-design-system/commit/52ef8bb281cf31ba2af37ada1e2e696a164ee097))
* add skill for automatically adding Storybook subtitles and descriptions to component stories ([a89bedc](https://github.com/black-isle-beef/novan-design-system/commit/a89bedcb8dc83e74b7f844111fdcc7af181be501))
* add skills for Angular accessibility audit and SCSS compliance remediation ([9edf6f8](https://github.com/black-isle-beef/novan-design-system/commit/9edf6f885aa9b0df404d457b50c503fd1a0ebea1))
* add skills for Angular accessibility audit and SCSS compliance remediation ([672cfda](https://github.com/black-isle-beef/novan-design-system/commit/672cfda743fb6421ecddeb5ba450fe8e598ea64a))
* add theme toggle functionality and update app structure ([187c4c1](https://github.com/black-isle-beef/novan-design-system/commit/187c4c1448adfc8e04f74cc47e74e4d89d7d2039))
* **button, hero:** add hero button variants and update styles for CTAs ([096298f](https://github.com/black-isle-beef/novan-design-system/commit/096298f2de05dd98730a7b3f633dbc9e0ca0a41e))
* **button:** implement button component with variants, sizes, accessibility, and styles ([fbb494a](https://github.com/black-isle-beef/novan-design-system/commit/fbb494a7c2c4510c82c87521dd4823f1b4c6ffe5))
* **ci-cd:** add conditional reporting for unavailable Chromatic token and update publish step ([d2ea9b5](https://github.com/black-isle-beef/novan-design-system/commit/d2ea9b5cf6c2ed3071355cde87c470f67ae103fa))
* **forms:** add input group, radio buttons, range slider, and text input components ([cd2d43e](https://github.com/black-isle-beef/novan-design-system/commit/cd2d43e39dfc3e8f638d57052abefe7b779337d0))
* **image-banner:** add DsImageBannerComponent with split and image layouts, including styles and tests ([642b1a7](https://github.com/black-isle-beef/novan-design-system/commit/642b1a74d45bf6d4ec1377bf18bffbd6e7e72898))
* implement typography foundation component with Montserrat font family, weight grid, and interactive playground ([43d7597](https://github.com/black-isle-beef/novan-design-system/commit/43d759734574d3a9137e17761b02c032f0fdb313))
* initialize Angular application with design system tokens ([0d928e3](https://github.com/black-isle-beef/novan-design-system/commit/0d928e30f46f45d2f66dd1abb38a83e7adbd425d))
* **layout:** add layout foundation component with spatial scale, breakpoints, and navigation patterns ([7064211](https://github.com/black-isle-beef/novan-design-system/commit/7064211a763da1878fd20f9f47e8c4c736e1f471))
* migrate design tokens and layout styles to new foundation components ([8b7d1fc](https://github.com/black-isle-beef/novan-design-system/commit/8b7d1fc125bc50192999cef5b617d4b5e8d2b905))
* refactor component structure and styles for consistency ([37f8989](https://github.com/black-isle-beef/novan-design-system/commit/37f898918cab95e01bad5cd29386e3b25a689efc))
* set rootDir to 'src' in TypeScript configuration files ([c4faf92](https://github.com/black-isle-beef/novan-design-system/commit/c4faf9210ce82bd8b2b688b66cb37016570755d6))
* **styles:** consolidate Storybook styles and update component imports ([ac8089e](https://github.com/black-isle-beef/novan-design-system/commit/ac8089e4611cb3209ce76073b601a71d8b43d8cc))
* **styles:** remove unused SCSS files and integrate brand foundation styles ([60a2836](https://github.com/black-isle-beef/novan-design-system/commit/60a2836c9082c433afbd7a0f6a15c6b84a93fadd))
* **typography:** add hyperlink section and update link styles ([e347a9d](https://github.com/black-isle-beef/novan-design-system/commit/e347a9d8dccdc0287d3192931f3b294c9a14de9f))
* update branding and improve accessibility in components; adjust Playwright config and remove unused styles ([85ed15b](https://github.com/black-isle-beef/novan-design-system/commit/85ed15b41b845efcacc4ed9a027cf746f5d84d63))
* update component titles for better organization and clarity ([04aca91](https://github.com/black-isle-beef/novan-design-system/commit/04aca918510d3b8d8a7079d642411e86e6b553f1))
* update font to Montserrat Alternates and remove unused logo images ([9f7d751](https://github.com/black-isle-beef/novan-design-system/commit/9f7d751516dfb2f328356a0c380884ba2b5088c0))
* update SKILL.md to reference new audit script location and add audit.ps1 for compliance checks ([79e74dc](https://github.com/black-isle-beef/novan-design-system/commit/79e74dc580cfd52c3171b867f056073feb715971))

### Bug Fixes

* add missing conventional-changelog-conventionalcommits dependency ([2fc415f](https://github.com/black-isle-beef/novan-design-system/commit/2fc415f32f142b0d9f4c39d907ff2e51194c9825))
* add NODE_AUTH_TOKEN to semantic-release environment variables ([5991142](https://github.com/black-isle-beef/novan-design-system/commit/59911426ac73da9102c2438a1bd8aea9be42d310))
* downgrade conventional-changelog-conventionalcommits to v8 ([7ec8714](https://github.com/black-isle-beef/novan-design-system/commit/7ec8714e3e6e251a3ec42f0d63fa852b547538d9))
* **input-group:** update structure and accessibility for multiple grouped inputs and addons ([4771803](https://github.com/black-isle-beef/novan-design-system/commit/47718035e52c441ea6928bce81d87f5a8f64c6ab))
* replace http-server with sirv-cli for serving Storybook ([d7b6a45](https://github.com/black-isle-beef/novan-design-system/commit/d7b6a45b1805397e9df815a31b79c8779fc874be))
* **storybook:** disable a11y tests and update stylesheet imports ([bb94bcb](https://github.com/black-isle-beef/novan-design-system/commit/bb94bcb43451acef01548503d46d0ac37f540742))
* update color hex values for consistency across components ([6d391e7](https://github.com/black-isle-beef/novan-design-system/commit/6d391e70bd6ec4a77b6ca4e35ae4b5e063ab7ddc))
* update package name and references to @black-isle-beef/novan-design-system ([cce0c84](https://github.com/black-isle-beef/novan-design-system/commit/cce0c849aa55f0e0f83298fa2683c4f800099a5f))
* update Storybook theme colors for buttons and alerts to improve accessibility ([fcbd6f8](https://github.com/black-isle-beef/novan-design-system/commit/fcbd6f809017ef7796d1d99affdb0c4198b64493))
* use signals in zoneless test host components and correct hero heading tag ([0dd2ed5](https://github.com/black-isle-beef/novan-design-system/commit/0dd2ed552b7e0def6421d4ae5301b283fd58c0bf))
