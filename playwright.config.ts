import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['list'], ['github'], ['html', { open: 'never' }]]
    : 'list',
  use: {
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
  },
});
