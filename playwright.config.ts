import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, 
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, 
  reporter: [['html', { open: 'never' }]],

  use: {
    httpCredentials: {
      username: process.env.MALL_HTTP_USER || '',
      password: process.env.MALL_HTTP_PASSWORD || '',
    },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'off',
    viewport: { width: 1280, height: 800 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});