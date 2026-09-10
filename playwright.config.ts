import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the design system's automated accessibility (a11y)
 * suite. Tests run against a built Storybook instance so every story acts as
 * an isolated, real-DOM fixture for `@axe-core/playwright` to scan.
 */
export default defineConfig({
  testDir: 'projects/design-system/e2e/a11y',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:9323',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx sirv-cli storybook-static --port 9323 --quiet',
    url: 'http://localhost:9323',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
