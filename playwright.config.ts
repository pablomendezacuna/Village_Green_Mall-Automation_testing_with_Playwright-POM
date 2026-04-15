import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Carga .env para Mac/Windows local
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 180000, // Aumentado para dar tiempo al scroll humano
  fullyParallel: false,
  reporter: [['html', { open: 'never' }]],
  use: {
    httpCredentials: {
      username: process.env.MALL_HTTP_USER || '',
      password: process.env.MALL_HTTP_PASSWORD || '',
    },
    screenshot: { mode: 'on', fullPage: true },
    trace: 'on',
    video: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});