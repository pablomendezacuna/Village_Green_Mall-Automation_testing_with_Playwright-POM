import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Carga .env para Mac/Windows. En GH Actions usa los Secrets.
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],

  use: {
    // Credenciales inyectadas desde Secrets o .env
    httpCredentials: {
      username: process.env.MALL_HTTP_USER || '',
      password: process.env.MALL_HTTP_PASSWORD || '',
    },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    trace: 'on', // Permite ver el paso a paso detallado en el reporte HTML
    video: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});