import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the design system's automated accessibility (a11y)
 * suite. Tests run against a built Storybook instance so every story acts as
 * an isolated, real-DOM fixture for `@axe-core/playwright` to scan.
 */
export default defineConfig({
  testDir: 'projects/design-system/e2e/a11y',
  // `@axe-core/playwright` shares a single CDP session/injected axe script
  // per browser instance; running many pages in parallel against it
  // intermittently throws "Axe is already running" under load. Serializing
  // workers trades a little speed for a deterministic a11y gate.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:9323',
    trace: 'on-first-retry',
    // Components fade/slide in via CSS transitions gated on
    // `prefers-reduced-motion`. Without this, axe can scan mid-transition
    // and report false-positive contrast failures against interpolated
    // (partially transparent) colors.
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], reducedMotion: 'reduce' } },
  ],
  webServer: {
    command: 'npx sirv-cli storybook-static --port 9323 --quiet',
    url: 'http://localhost:9323',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
